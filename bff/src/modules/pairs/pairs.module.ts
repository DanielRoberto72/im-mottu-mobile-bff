import { Module } from '@nestjs/common';
import { PairsService } from './pairs.service';
import { PairsController } from './pairs.controller';
import { HttpModule } from '@nestjs/axios';
import { CatsApiClient } from '@mottu/bff/external/the-cat-api/the-cat-api.client';
import { RickAndMortyClient } from '@mottu/bff/external/rick-and-morty-api/rick-and-morty-api.client';
import { InMemoryCacheService } from '@mottu/bff/shared/cache/in-memory-cache.service';

@Module({
  controllers: [PairsController],
  providers: [
    PairsService,
    CatsApiClient,
    RickAndMortyClient,
    InMemoryCacheService,
  ],
  imports: [HttpModule],
})
export class PairsModule {}
