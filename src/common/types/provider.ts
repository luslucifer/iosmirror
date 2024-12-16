import { SourceResponse } from '@services/sources/dto/source.response.dto';

export type Provider = {
  ALT_HOSTS: Array<string>;
  SCRAPE_CONFIG?: ScrapeConfig;
  stream(url: string, args?: Record<string, string>): Promise<SourceResponse>;
};

export type Stream = {
  stream: string;
  subtitles?: Array<Subtitle>;
};

export type Subtitle = {
  file: string;
  label: string;
};

export type ScrapeConfig = {
  ID: string;
  // input of encrypt function
  ENTRY: RegExp;
  // output of encrypt function
  OUT: RegExp;
  USER_AGENT: string;
  INJECT_URLS: Array<string>;
  INIT_URL: string;
  BTN_ID: string;
  MAX_TIMEOUT?: number;
  EXPECTED_KEYS?: number;
};

