import { Module } from '@nestjs/common';
import { PairsService } from './pairs.service';
import { PairsController } from './pairs.controller';
import { HttpModule } from '@nestjs/axios';
import { CatsApiClient } from '@mottu/bff/external/the-cat-api/the-cat-api.client';
import { RickAndMortyClient } from '@mottu/bff/external/rick-and-morty-api/rick-and-morty-api.client';

@Module({
  controllers: [PairsController],
  providers: [PairsService, CatsApiClient, RickAndMortyClient],
  imports: [HttpModule],
})
export class PairsModule {}
