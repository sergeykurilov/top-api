import { Module } from '@nestjs/common';
import { TopPageModule } from 'src/top-page/top-page.module';
import { SitemapController } from './sitemap.controller';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [TopPageModule],
  controllers: [SitemapController],
  providers: [ConfigService],
})
export class SitemapModule {}
