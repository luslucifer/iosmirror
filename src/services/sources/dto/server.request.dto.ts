import { MovieTypeEnum } from '../enums/movie.type.enum';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { ServerEnum } from '../enums/server.enum';

export class ServerRequest {
  @IsOptional()
  ip?: string;

  @IsOptional()
  id?: string;

  @IsOptional()
  imdbId?: string;

  @IsOptional()
  tmdbId?: string;

  @IsString()
  vrf: string;

  @IsOptional()
  season?: number;

  @IsOptional()
  v?: string;

  @IsOptional()
  episode?: number;

  @IsOptional()
  isMobile?: boolean;

  @IsEnum(ServerEnum)
  @IsOptional()
  server?: ServerEnum;

  @IsEnum(MovieTypeEnum)
  type: MovieTypeEnum = MovieTypeEnum.MOVIE;
}
