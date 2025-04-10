import { HttpService } from '@nestjs/axios';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { InMemoryCacheService } from '../../shared/cache/in-memory-cache.service';

@Injectable()
export class CatsApiClient {
  private readonly baseUrl = 'https://api.thecatapi.com/v1';

  constructor(
    private readonly http: HttpService,
    private readonly cacheService: InMemoryCacheService,
  ) {}

  async getCats(): Promise<any[]> {
    try {
      const { data } = await firstValueFrom(
        this.http.get(`${this.baseUrl}/images/search`),
      );

      return data;
    } catch (error) {
      throw new InternalServerErrorException('Erro ao buscar gatos');
    }
  }

  async getBreeds(): Promise<any[]> {
    const cacheKey = 'breeds';
    const cached = this.cacheService.get<any[]>(cacheKey);
    if (cached) return cached;

    try {
      const { data } = await firstValueFrom(
        this.http.get(`${this.baseUrl}/breeds`),
      );
      this.cacheService.set(cacheKey, data);
      return data;
    } catch (error) {
      throw new InternalServerErrorException('Erro ao buscar raças');
    }
  }
}
