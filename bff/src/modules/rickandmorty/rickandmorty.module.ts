import { Module } from '@nestjs/common';
import { RickandmortyService } from './rickandmorty.service';
import { RickandmortyController } from './rickandmorty.controller';

@Module({
  controllers: [RickandmortyController],
  providers: [RickandmortyService],
})
export class RickandmortyModule {}
