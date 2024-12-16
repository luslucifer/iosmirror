export const captionTypes = {
  srt: 'srt',
  vtt: 'vtt',
};

export type CaptionType = keyof typeof captionTypes;

export type Caption = {
  type?: CaptionType;
  id?: string; // only unique per stream
  opensubtitles?: boolean;
  url?: string;
  hasCorsRestrictions?: boolean;
  language?: string;
  file?: string;
  label?: string;
};

export type CaptionData = {
  LanguageName: string;
  SubDownloadLink: string;
  SubFormat: 'srt' | 'vtt';
};

