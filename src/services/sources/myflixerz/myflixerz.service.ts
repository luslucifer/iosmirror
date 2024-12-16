import { Injectable, Logger } from '@nestjs/common';
import { SourceRequest } from '../dto/source.request.dto';
import { SourceResponse } from '../dto/source.response.dto';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { USER_AGENT_NAME, USER_AGENT_VALUE } from '@constants/index';
import { CheerioAPI, load } from 'cheerio';
import { compareMedia, compareTitle } from '@helpers/compare';
import { CommonMedia } from '@constants/media';
import { MovieTypeEnum } from '../enums/movie.type.enum';
import { SearchItem, servers, SourceEmbed, SourceLink } from './types';
import { NotFoundError } from '@common/errors';
import { MegaCloud } from '@common/providers/megacloud.provider';

@Injectable()
export class MyflixerzSourceService {
  private readonly BASE_URL: string = 'https://myflixerz.to';
  private readonly log = new Logger(MyflixerzSourceService.name);

  async getSource(request: SourceRequest): Promise<SourceResponse> {
    try {
      const id: string = await this._getId(request);
      const sourceLinks: SourceLink[] =
        request.type === MovieTypeEnum.MOVIE
          ? await this._getMovieSources(id)
          : await this._getShowSources(request, id);

      const upCloudServer: SourceLink = sourceLinks.find((sourceLink: SourceLink) => {
        return sourceLink.embed.includes(servers.UpCloud);
      });

      if (!upCloudServer?.episodeId) {
        throw new NotFoundError('upcloud server not found');
      }

      const { episodeId } = upCloudServer;
      const url: string = await this._getSourceDetails(episodeId);
      const sourceResponse: SourceResponse = await MegaCloud.stream(url);

      return sourceResponse;
    } catch (error) {
      this.log.error(`source failed : myflixerz | ${error.message}`);
    }

    return null;
  }

  private async _getId(request: SourceRequest): Promise<string> {
    const title = request.title;
    const year = request.year;
    const seasonNumber = request.season;

    const media: CommonMedia = {
      title: title,
      tmdbId: request.tmdbId,
      releaseYear: isNaN(Number(year)) ? 0 : Number(year),
    };

    const options: AxiosRequestConfig = this._getAxiosOptions();
    const query: string = media.title.replaceAll(/[^a-z0-9A-Z]/g, '-');
    const searchUrl: string = `${this.BASE_URL}/search/${query}`;
    const searchResponse: AxiosResponse<string> = await axios.get(searchUrl, options);

    if (searchResponse.status !== 200) {
      throw new NotFoundError('season not found');
    }

    const doc: CheerioAPI = load(searchResponse.data);
    const items: SearchItem[] = doc('.film_list-wrap > div.flw-item')
      .toArray()
      .map(element => {
        const query = doc(element);
        const id = query.find('div.film-poster > a').attr('href')?.slice(1);
        const title = query.find('div.film-detail > h2 > a').attr('title');
        const year = query.find('div.film-detail > div.fd-infor > span:nth-child(1)').text();
        const season = year.includes('SS') ? year.split('SS')[1] : '1';

        if (!id || !title || !year) return null;
        return {
          id,
          title,
          year: parseInt(year, 10),
          season: parseInt(season, 10),
        };
      });

    const matchingItem: SearchItem = items.find((item: SearchItem) => {
      if (!item) return false;
      if (request.type === MovieTypeEnum.MOVIE) {
        return compareMedia(media, item.title, item.year);
      }

      return compareTitle(media.title, item.title) && Number(seasonNumber) <= item.season;
    });

    if (!matchingItem) {
      throw new NotFoundError(
        `movie not found ${query} ${request.type} ${media.releaseYear} ${seasonNumber}`,
      );
    }
    return matchingItem.id;
  }

  private async _getMovieSources(id: string): Promise<SourceLink[]> {
    const episodeParts: string[] = id.split('-');
    const episodeId: string = episodeParts[episodeParts.length - 1];

    const options: AxiosRequestConfig = this._getAxiosOptions();
    const episodeUrl: string = `${this.BASE_URL}/ajax/episode/list/${episodeId}`;
    const episodeResponse: AxiosResponse<string> = await axios.get(episodeUrl, options);

    if (episodeResponse.status !== 200) {
      throw new NotFoundError('movie episode not found');
    }

    const doc: CheerioAPI = load(episodeResponse.data);
    const sourceLinks: SourceLink[] = doc('.nav-item > a')
      .toArray()
      .map(element => {
        const query = doc(element);
        const embedTitle = query.attr('title');
        const linkId = query.attr('data-linkid');
        if (!embedTitle || !linkId) throw new Error('invalid sources');
        return {
          embed: embedTitle,
          episodeId: linkId,
        };
      });

    return sourceLinks;
  }

  private async _getShowSources(request: SourceRequest, id: string): Promise<SourceLink[]> {
    const episodeParts: string[] = id.split('-');
    const episodeId: string = episodeParts[episodeParts.length - 1];

    const options: AxiosRequestConfig = this._getAxiosOptions();
    const seasonListUrl: string = `${this.BASE_URL}/ajax/season/list/${episodeId}`;
    const seasonListResponse: AxiosResponse<string> = await axios.get(seasonListUrl, options);

    if (seasonListResponse.status !== 200) {
      throw new NotFoundError('season list not found');
    }

    const seasonsDoc: CheerioAPI = load(seasonListResponse.data);
    const season: string = seasonsDoc('.dropdown-item')
      .toArray()
      .find(element => seasonsDoc(element).text() === `Season ${request.season}`)?.attribs[
      'data-id'
    ];

    if (!season) throw new NotFoundError('season not found');
    const seasonUrl: string = `${this.BASE_URL}/ajax/season/episodes/${season}`;
    const seasonData: AxiosResponse<string> = await axios.get(seasonUrl, options);
    if (seasonListResponse.status !== 200) {
      throw new NotFoundError('season data not found');
    }
    const seasonDoc: CheerioAPI = load(seasonData.data);
    const episode = seasonDoc('.nav-item > a')
      .toArray()
      .map(element => {
        return {
          id: seasonDoc(element).attr('data-id'),
          title: seasonDoc(element).attr('title'),
        };
      })
      .find(e => e.title?.startsWith(`Eps ${request.episode}`))?.id;

    if (!episode) throw new NotFoundError('episode not found');
    const serverUrl: string = `${this.BASE_URL}/ajax/episode/servers/${episode}`;
    const serverData: AxiosResponse<string> = await axios.get(serverUrl, options);

    if (seasonListResponse.status !== 200) {
      throw new NotFoundError('server data not found');
    }
    const serverDoc = load(serverData.data);
    const sourceLinks: SourceLink[] = serverDoc('.nav-item > a')
      .toArray()
      .map(element => {
        const query = serverDoc(element);
        const embedTitle = query.attr('title');
        const linkId = query.attr('data-id');
        if (!embedTitle || !linkId) throw new Error('invalid sources');
        return {
          embed: embedTitle,
          episodeId: linkId,
        };
      });

    return sourceLinks;
  }

  private async _getSourceDetails(sourceId: string): Promise<string> {
    const options: AxiosRequestConfig = this._getAxiosOptions();
    const sourceUrl: string = `${this.BASE_URL}/ajax/episode/sources/${sourceId}`;
    const sourceResponse: AxiosResponse<SourceEmbed> = await axios.get(sourceUrl, options);
    if (sourceResponse.status !== 200) {
      return null;
    }
    return sourceResponse.data.link;
  }

  private _getAxiosOptions(): AxiosRequestConfig {
    return {
      headers: {
        origin: this.BASE_URL,
        referer: this.BASE_URL,
        [USER_AGENT_NAME]: USER_AGENT_VALUE,
      },
    } as AxiosRequestConfig;
  }
}
