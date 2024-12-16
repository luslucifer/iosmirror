import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CacheModule } from '@nestjs/cache-manager';
import { MyflixerzSourceService } from '@services/sources/myflixerz/myflixerz.service';
import { IosMirrorCcService } from '@services/sources/iosmirror/iosmirror.service';

@Module({
  imports: [CacheModule.register()],
  controllers: [AppController],
  providers: [AppService, MyflixerzSourceService, IosMirrorCcService],
})
export class AppModule { }
