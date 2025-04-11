import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { PairsService } from './pairs.service';
import { GetPairsParamsDto } from './dto/SearchPairsDto';
import { SaveFavoritePairsDto } from './dto/SaveFavoritePairsDto';
import { CatQueryDto } from './dto/CatQueryDto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@Controller('pairs')
@ApiTags('Pairs')
export class PairsController {
  constructor(private readonly pairsService: PairsService) {}

  @Get('/favorite')
  @ApiOperation({
    summary: 'Buscar os pares favoritos de cat e character salvos',
  })
  @HttpCode(HttpStatus.OK)
  async getFavoritePairs() {
    return this.pairsService.getFavoritePairs();
  }

  @Get('/')
  @ApiOperation({
    summary: 'Buscar pares aleatórios de cat e character',
  })
  @HttpCode(HttpStatus.OK)
  async getPairs(@Query() query: CatQueryDto) {
    return this.pairsService.getPairs(parseInt(query.page));
  }

  @Get('/search/:characterName/:catBreed')
  @ApiOperation({
    summary: 'Buscar pares de cat e character com base nos filtros',
  })
  @HttpCode(HttpStatus.OK)
  async getPairsWithFilters(@Param() params: GetPairsParamsDto) {
    return this.pairsService.getPairsWithFilters(
      params.characterName,
      params.catBreed,
    );
  }

  @Post('/favorite')
  @ApiOperation({
    summary: 'Salvar os pares favoritos de cat e character',
  })
  @HttpCode(HttpStatus.OK)
  async saveFavoritePairs(@Body() dto: SaveFavoritePairsDto) {
    return this.pairsService.savePairs(dto);
  }
}
