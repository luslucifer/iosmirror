export type NFSearchResponse = {
  head: string;
  type: number;
  searchResult: NFSearchResult[];
};

export type NFSearchResult = {
  id: string;
  t: string;
};

export type StreamResponse = {
  id: string;
  title: string;
  image: string;
  sources: NFSource[];
  tracks: NFTrack[];
};

export type NFSource = {
  file: string;
  label: string;
  type: string;
  default?: string;
};

export type NFSeason = {
  s: string;
  id: string;
};

export type NFEpisodeResponse = {
  episodes: NFEpisode[];
};

export type NFEpisode = {
  id: string;
  s: string; // S6 - Season
  ep: string;
};

export type NFTrack = {
  kind: string;
  file: string;
  label: string;
  language: string;
};

export type NFMovieDetail = {
  id: string;
  year: string;
  runtime: string; // 6 Seasons
  season: NFSeason[];
  episodes: NFEpisode[];
  matchedSeason: NFSeason;
};
