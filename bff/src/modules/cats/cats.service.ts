import { CatsApiClient } from '../../external/the-cat-api/the-cat-api.client';
import { Injectable, InternalServerErrorException } from '@nestjs/common';

@Injectable()
export class CatsService {
  constructor(private readonly catApi: CatsApiClient) {}
  async getBreeds() {
    try {
      const breeds = await this.catApi.getBreeds();

      return breeds;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
