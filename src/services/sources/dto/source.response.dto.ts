import { Caption } from "@common/types/captions";

export class SourceResponse {
  source: string;
  format: string;
  available: boolean;
  thumbnails: string;
  subtitles: Caption[];
}

export class Subtitle {
  file: string;
  label: string;
}
