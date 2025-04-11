import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { CatsService } from './cats.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@Controller('cats')
@ApiTags('Cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Get('breeds')
  @ApiOperation({
    summary: 'Buscar as raças de gato',
  })
  @HttpCode(HttpStatus.OK)
  async getBreeds() {
    return this.catsService.getBreeds();
  }
}
