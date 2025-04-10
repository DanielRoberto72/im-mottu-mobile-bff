import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { CatsService } from './cats.service';

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Get('breeds')
  @HttpCode(HttpStatus.OK)
  async getBreeds() {
    return this.catsService.getBreeds();
  }
}
