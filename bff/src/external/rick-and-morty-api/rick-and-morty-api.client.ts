import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class RickAndMortyClient {
  private readonly baseUrl = 'https://rickandmortyapi.com/api';

  constructor(private readonly http: HttpService) {}

  async getCharacters(page: number): Promise<any> {
    const { data } = await firstValueFrom(
      this.http.get(`${this.baseUrl}/character/?page=${page}`),
    );
    return data;
  }
}
