import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { PairsService } from './pairs.service';

@Controller('pairs')
export class PairsController {
  constructor(private readonly pairsService: PairsService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getPairs() {
    return this.pairsService.getPairs();
  }
}
