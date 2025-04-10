import { Controller, Get, HttpCode, HttpStatus, Param } from '@nestjs/common';
import { PairsService } from './pairs.service';
import { GetPairsParamsDto } from './dto/SearchPairsDto';

@Controller('pairs')
export class PairsController {
  constructor(private readonly pairsService: PairsService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getPairs() {
    return this.pairsService.getPairs();
  }

  @Get('/search/:characterName/:catBreed')
  @HttpCode(HttpStatus.OK)
  async getPairsWithFilters(@Param() params: GetPairsParamsDto) {
    return this.pairsService.getPairsWithFilters(
      params.characterName,
      params.catBreed,
    );
  }
}
