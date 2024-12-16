export type SearchItem = {
  id: string;
  title: string;
  year?: number;
  season?: number;
};

export type SourceLink = {
  embed: string;
  episodeId: string;
};

export type SourceEmbed = {
  type: string;
  link: string;
};

export type SourceData = {
  url: string;
  title: string;
};

export const servers = {
  UpCloud: 'UpCloud',
  MEGA_CLOUD: 'MegaCloud',
} as const;

export type Servers = (typeof servers)[keyof typeof servers];
