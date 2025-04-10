import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class CatsApiClient {
  private readonly baseUrl = 'https://api.thecatapi.com/v1';
  constructor(private readonly http: HttpService) {}

  async getCats(): Promise<any[]> {
    const { data } = await firstValueFrom(
      this.http.get(`${this.baseUrl}/images/search`),
    );
    return data;
  }
}
