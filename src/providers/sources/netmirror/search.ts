import { ScrapeContext } from '@utils/context';
import { MovieMedia, ShowMedia } from '@utils/media';
import { getCurrentTimestamp, iosMirrorBase, iosMirrorUserAgent } from './common';
import { NFMovieDetail, NFSearchResponse, NFSearchResult, NFSeason } from './types';
import { compareMedia, compareTitle } from '@helpers/compare';
import { USER_AGENT_NAME } from '@constants/index';
import { FetcherOptions } from '@fetchers/types';
import { NotFoundError } from '@common/errors';

export async function getIosMirrorId(
  ctx: ScrapeContext,
  media: MovieMedia | ShowMedia,
): Promise<NFMovieDetail> {
  const options: FetcherOptions = {
    baseUrl: iosMirrorBase,
    headers: {
      [USER_AGENT_NAME]: iosMirrorUserAgent,
    },
  };
  const timestamp: number = getCurrentTimestamp();
  const titleEncoded: string = encodeURI(media.title);
  const searchResponse: NFSearchResponse = await ctx.fetcher<NFSearchResponse>(
    `/search.php?s=${titleEncoded}&t=${timestamp}`,
    options,
  );

  if (!searchResponse?.searchResult?.length) {
    throw new NotFoundError(`Search failed for ${media.title} | api failed`);
  }
  const { searchResult } = searchResponse;
  const matchingItems: NFSearchResult[] = searchResult.filter((item: NFSearchResult) =>
    compareTitle(media.title, item.t),
  );

  if (!matchingItems.length) {
    throw new NotFoundError(`Search failed for ${media.title} | not matched`);
  }

  let result: NFMovieDetail;
  for (let i = 0; i < matchingItems.length; i++) {
    if (i > 2) break; // only 3 items
    try {
      const currentItem = matchingItems[i];
      const { t: title, id } = currentItem;
      const movieDetail: NFMovieDetail = await getDetailMovie(ctx, id);
      const year: number = isNaN(Number(movieDetail.year)) ? 0 : Number(movieDetail.year);
      if (media.type === 'movie' && compareMedia(media, title, year)) {
        result = { ...movieDetail, id };
        break;
      }
      if (media.type !== 'show') {
        continue;
      }
      const matchedSeason = movieDetail.season?.find((item: NFSeason) => {
        return Number(item.s) === media.seasonNumber;
      });
      if (compareMedia(media, title, year) && matchedSeason?.id) {
        const season: NFSeason = movieDetail.season.find((item: NFSeason) => {
          return item.s === media.season.number?.toString();
        });
        result = { ...movieDetail, matchedSeason: season, id };
        break;
      }
    } catch (error) {
      // ignore
    }
  }
  if (!result?.id) {
    throw new NotFoundError(`Search failed for ${media.title} | not matched by detail`);
  }
  return result;
}

async function getDetailMovie(ctx: ScrapeContext, id: string): Promise<NFMovieDetail> {
  const options: FetcherOptions = {
    baseUrl: iosMirrorBase,
    headers: {
      [USER_AGENT_NAME]: iosMirrorUserAgent,
    },
  };
  const timestamp: number = getCurrentTimestamp();
  return ctx.fetcher<NFMovieDetail>(`/post.php?id=${id}&t=${timestamp}`, options);
}
