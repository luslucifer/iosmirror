import { MovieTypeEnum } from '@services/sources/enums/movie.type.enum';

export type CommonMedia = {
  title: string;
  tmdbId: string;
  imdbId?: string;
  releaseYear: number;
};

export type ShowMedia = CommonMedia & {
  type: MovieTypeEnum.TV;
  episode: {
    number: number;
    tmdbId: string;
  };
  season: {
    number: number;
    tmdbId: string;
  };
};

export type MovieMedia = CommonMedia & {
  type: MovieTypeEnum.MOVIE;
};
