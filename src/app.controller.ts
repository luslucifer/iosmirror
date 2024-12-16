import { Controller, Get, Inject, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { MyflixerzSourceService } from '@services/sources/myflixerz/myflixerz.service';
import { SourceRequest } from '@services/sources/dto/source.request.dto';
import { SourceResponse } from '@services/sources/dto/source.response.dto';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { IosMirrorCcService } from '@services/sources/iosmirror/iosmirror.service';


@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
    private readonly myflixerzSourceService: MyflixerzSourceService,
    private readonly iosMirrorService: IosMirrorCcService,
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache
  ) { }

  @Get()
  getHello() {
    return this.appService.getHello();
  }

  @Get('/api/myflixerz')
  async getMyflixerz(@Query() sourceRequest: SourceRequest) {
    console.log(`request: ${JSON.stringify(sourceRequest)}`);
    const key = `myflixerz:${sourceRequest.tmdbId}:${sourceRequest.season}:${sourceRequest.episode}`;
    let sourceResponse: SourceResponse = await this.cacheManager.get(key);
    if (sourceResponse) {
      return sourceResponse;
    }
    sourceResponse = await this.myflixerzSourceService.getSource(sourceRequest);
    if (sourceResponse?.source) {
      await this.cacheManager.set(key, sourceResponse, 10800000); //3h
    }
    return sourceResponse;
  }

  @Get('/api/iosmirror')
  async getIosMirror(@Query() sourceRequest: SourceRequest) { 
    console.log(`request: ${JSON.stringify(sourceRequest)}`);
    const key = `iosmirror:${sourceRequest.tmdbId}:${sourceRequest.season}:${sourceRequest.episode}`;
    let sourceResponse: SourceResponse = await this.cacheManager.get(key);
    if (sourceResponse) {
      return sourceResponse;
    }
    sourceResponse = await this.iosMirrorService.getSource(sourceRequest);
    if (sourceResponse?.source) {
      await this.cacheManager.set(key, sourceResponse, 10800000); //3h
    }
    return sourceResponse;
  }
}
