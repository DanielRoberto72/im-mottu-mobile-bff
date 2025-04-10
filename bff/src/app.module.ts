import { Module } from '@nestjs/common';
import { CatsModule } from './modules/cats/cats.module';
import { RickandmortyModule } from './modules/rickandmorty/rickandmorty.module';
import { PairsModule } from './modules/pairs/pairs.module';

@Module({
  imports: [CatsModule, RickandmortyModule, PairsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
