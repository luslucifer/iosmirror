import { makeFetcher } from '@fetchers/common';
import { Injectable } from '@nestjs/common';
import { makeStandardFetcher } from '@fetchers/standardFetch';
import { makeSimpleProxyFetcher } from '@fetchers/simpleProxy';
// dto
import { SourceRequest } from '../dto/source.request.dto';
import { SourceResponse } from '../dto/source.response.dto';
// helpers
import { ScrapeContext } from '@utils/context';
import { MovieMedia, ShowMedia } from '@utils/media';
// providers
import { Sourcerer, SourcererOutput } from '@providers/base';
import { iosMirrorScraper } from '@providers/sources/netmirror';

import { Caption } from '@providers/captions';
import { HlsBasedStream } from '@providers/streams';
import { MovieTypeEnum } from '../enums/movie.type.enum';

@Injectable()
export class IosMirrorCcService {
  private readonly contextBase: ScrapeContext;
  private readonly iosMirrorScraper: Sourcerer;

  constructor() {
    this.iosMirrorScraper = iosMirrorScraper;
    this.contextBase = {
      fetcher: makeFetcher(makeStandardFetcher(fetch)),
      proxiedFetcher: makeFetcher(
        makeSimpleProxyFetcher(process.env.MOVIE_WEB_PROXY_URL ?? '', fetch),
      ),
      progress() { },
    };
  }

  async getSource(request: SourceRequest): Promise<SourceResponse> {
    let scrapeResponse: SourcererOutput;
    const { title, year, season } = request;
    if (request.type === MovieTypeEnum.MOVIE) {
      const media: MovieMedia = {
        type: 'movie',
        title: title,
        tmdbId: request.tmdbId,
        releaseYear: isNaN(Number(year)) ? 0 : Number(year),
      };
      scrapeResponse = await this.iosMirrorScraper.scrapeMovie({
        ...this.contextBase,
        media: media,
      });
    }
    if (request.type === MovieTypeEnum.TV) {
      const media: ShowMedia = {
        type: 'show',
        title: title,
        tmdbId: request.tmdbId,
        episode: {
          tmdbId: '0',
          number: request.episode,
        },
        season: {
          tmdbId: '0',
          number: request.season,
        },
        releaseYear: isNaN(Number(year)) ? 0 : Number(year),
        seasonNumber: isNaN(Number(season)) ? 0 : Number(season),
      };
      scrapeResponse = await this.iosMirrorScraper.scrapeShow({
        ...this.contextBase,
        media: media,
      });
    }

    if (!scrapeResponse?.stream?.length) {
      return null;
    }
    const stream = scrapeResponse.stream[0] as HlsBasedStream;
    const response = new SourceResponse();
    response.source = stream.playlist;
    response.subtitles = stream.captions?.map((caption: Caption) => {
      return {
        kind: 'captions',
        file: caption.url,
        label: caption.language,
      };
    });
    response.thumbnails = stream.thumbnailTrack?.url;

    this.handleProxy(response.source)
    return response;
  }

  private handleProxy(source: string): string {
    return source;
  }
}

