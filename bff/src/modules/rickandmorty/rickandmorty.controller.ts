import { Controller } from '@nestjs/common';
import { RickandmortyService } from './rickandmorty.service';

@Controller('rickandmorty')
export class RickandmortyController {
  constructor(private readonly rickandmortyService: RickandmortyService) {}
}
