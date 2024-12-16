import { MovieTypeEnum } from '../enums/movie.type.enum';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class SourceRequest {
  @IsOptional()
  imdbId?: string;

  @IsString()
  title: string;

  @IsNumber()
  @Type(() => Number)
  year: number;

  @IsString()
  tmdbId: string;

  @IsOptional()
  season?: number;

  @IsOptional()
  episode?: number;

  @IsEnum(MovieTypeEnum)
  type: MovieTypeEnum = MovieTypeEnum.MOVIE;
}
