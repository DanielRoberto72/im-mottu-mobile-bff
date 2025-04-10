import { Module } from '@nestjs/common';
import { CatsService } from './cats.service';
import { CatsController } from './cats.controller';
import { CatsApiClient } from '@mottu/bff/external/the-cat-api/the-cat-api.client';
import { HttpModule } from '@nestjs/axios';
import { InMemoryCacheService } from '@mottu/bff/shared/cache/in-memory-cache.service';

@Module({
  controllers: [CatsController],
  providers: [CatsService, CatsApiClient, InMemoryCacheService],
  imports: [HttpModule],
})
export class CatsModule {}
