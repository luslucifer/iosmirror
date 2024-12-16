import { SourcererOutput, makeSourcerer } from '@providers/base';
import { MovieScrapeContext, ScrapeContext, ShowScrapeContext } from '@utils/context';
import { flags } from '@utils/targets';
import { getCurrentTimestamp, iosMirrorBase, iosMirrorUserAgent } from './common';
import { getIosMirrorId } from './search';
import { NFEpisode, NFEpisodeResponse, NFMovieDetail, NFTrack, StreamResponse } from './types';
import { FetcherOptions } from '@fetchers/types';
import { USER_AGENT_NAME } from '@constants/index';
import { NotFoundError } from '@common/errors';
import { Stream, ThumbnailTrack } from '@providers/streams';
import { Caption } from '@providers/captions';

async function scrapeMovie(ctx: MovieScrapeContext): Promise<SourcererOutput> {
  try {
    // search movies
    const detail: NFMovieDetail = await getIosMirrorId(ctx, ctx.media);
    const response: StreamResponse = await getMirrorStream(ctx, detail.id);
    if (!response?.sources?.length) {
      throw new NotFoundError(`source not found ${ctx.media.tmdbId} ${detail.id}`);
    }

    response.id = detail.id;
    return buildSourceResponse(ctx.media.tmdbId, response);
  } catch (error) {
    console.log(`source failed : netmirror | ${error.message}`);
  }

  return null;
}

async function scrapeShow(ctx: ShowScrapeContext): Promise<SourcererOutput> {
  try {
    // search movies
    const detail: NFMovieDetail = await getIosMirrorId(ctx, ctx.media);
    const episode: NFEpisode = await getEpisode(ctx, detail);
    const response: StreamResponse = await getMirrorStream(ctx, episode.id);

    response.id = episode.id;
    return buildSourceResponse(ctx.media.tmdbId, response);
  } catch (error) {
    // log.error(`source failed : netmirror | ${error.message}`);
  }

  return null;
}

export const getMirrorStream = async (ctx: ScrapeContext, id: string): Promise<StreamResponse> => {
  const options = getCommonOptions();
  const timestamp: number = getCurrentTimestamp();
  const playlistUrl: string = `/playlist.php?id=${id}&tm=${timestamp}`;
  const response = await ctx.fetcher<StreamResponse[]>(playlistUrl, options);
  return response?.[0];
};

export const iosMirrorScraper = makeSourcerer({
  id: 'iosmirror',
  name: 'iosmirror',
  rank: 2,
  flags: [flags.CORS_ALLOWED],
  scrapeMovie: scrapeMovie,
  scrapeShow: scrapeShow,
});

async function getEpisode(ctx: ShowScrapeContext, detail: NFMovieDetail): Promise<NFEpisode> {
  const episode: number = ctx.media.episode.number;
  const season: string = `S${ctx.media.season.number}`;
  const seasonId: string = detail.matchedSeason.id;

  // TH tìm được episode ở api hiện tại -> k cần gọi để check thêm
  const matchedEpisode: NFEpisode = detail.episodes.find((item: NFEpisode) => {
    return item.s === season && item.ep === episode?.toString();
  });
  if (matchedEpisode?.id) {
    return matchedEpisode;
  }

  const options = getCommonOptions();
  const page = parseInt((episode / 10).toString()) + 1;
  const episodeResponse: NFEpisodeResponse = await ctx.fetcher<NFEpisodeResponse>(
    `/episodes.php?s=${seasonId}&series=${detail.id}&page=${page}`,
    options,
  );

  if (!episodeResponse?.episodes?.length) {
    throw new NotFoundError(`Episode not found`);
  }

  const { episodes } = episodeResponse;
  const foundEpisode: NFEpisode | undefined = episodes.find((item: NFEpisode) => {
    return item.s === season && item.ep === episode?.toString();
  });

  if (!foundEpisode?.id) {
    throw new NotFoundError(`Episode not found ${season} ${episode}`);
  }

  return foundEpisode;
}

const buildSourceResponse = (id: string, response: StreamResponse) => {
  const { tracks } = response;
  const thumbnail: string =
    tracks?.find((track: NFTrack) => {
      const { kind, file } = track;
      return kind === 'thumbnails' && file.endsWith('.vtt');
    })?.file || '';

  const thumbnailTrack: ThumbnailTrack | undefined = thumbnail
    ? { type: 'vtt', url: thumbnail }
    : undefined;

  const captions: Caption[] = tracks
    ?.filter((track: NFTrack) => {
      const { kind, file } = track;
      if (kind !== 'captions') return false;
      return file.endsWith('.srt') || file.endsWith('.vtt');
    })
    ?.map((track: NFTrack) => {
      const file: string = track.file.startsWith('//') ? 'https:' + track.file : track.file;
      return {
        id: file,
        url: file,
        language: track.language,
        hasCorsRestrictions: false,
        type: track.file.endsWith('.vtt') ? 'vtt' : 'srt',
      };
    });

  return {
    embeds: [],
    stream: [
      {
        id: id,
        captions,
        type: 'hls',
        thumbnailTrack,
        flags: [flags.CORS_ALLOWED],
        playlist: `https://pcmirror.cc/hls/${response.id}.m3u8`,
      } as Stream,
    ],
  };
};

const getCommonOptions = (): FetcherOptions => {
  return {
    baseUrl: iosMirrorBase,
    headers: {
      [USER_AGENT_NAME]: iosMirrorUserAgent,
    },
  } as FetcherOptions;
};
