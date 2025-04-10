import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { InMemoryCacheService } from 'src/shared/cache/in-memory-cache.service';

@Injectable()
export class RickAndMortyClient {
  private readonly baseUrl = 'https://rickandmortyapi.com/api';

  constructor(
    private readonly http: HttpService,
    private readonly cacheService: InMemoryCacheService,
  ) {}

  async getCharacters(page: number): Promise<any> {
    const cacheKey = `characters_page_${page}`;
    const cached = this.cacheService.get<any>(cacheKey);
    if (cached) return cached;

    try {
      const { data } = await firstValueFrom(
        this.http.get(`${this.baseUrl}/character/?page=${page}`),
      );
      this.cacheService.set(cacheKey, data);
      return data;
    } catch (error) {
      throw new InternalServerErrorException('Erro ao buscar personagens');
    }
  }

  async getCharactersByName(name: string): Promise<any> {
    const cacheKey = `characters_name_${name.toLowerCase()}`;
    const cached = this.cacheService.get<any>(cacheKey);
    if (cached) return cached;

    try {
      const { data } = await firstValueFrom(
        this.http.get(`${this.baseUrl}/character/?name=${name}`),
      );
      this.cacheService.set(cacheKey, data);
      return data;
    } catch (error) {
      throw new InternalServerErrorException(
        'Erro ao buscar personagem por nome',
      );
    }
  }
}
