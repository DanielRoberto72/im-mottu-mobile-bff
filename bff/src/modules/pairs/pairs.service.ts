import { RickAndMortyClient } from '@mottu/bff/external/rick-and-morty-api/rick-and-morty-api.client';
import { CatsApiClient } from '@mottu/bff/external/the-cat-api/the-cat-api.client';
import { getRandomCharacter } from '@mottu/bff/utils/getRandomCharacter';
import { getRandomPage } from '@mottu/bff/utils/getRandomPage';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { RandomResponseDto } from './dto/ResponseDto';

@Injectable()
export class PairsService {
  constructor(
    private readonly catApi: CatsApiClient,
    private readonly rickAndMortyApi: RickAndMortyClient,
  ) {}
  async getPairs(): Promise<RandomResponseDto> {
    try {
      const cat = await this.catApi.getCats();
      const randomPage = getRandomPage();
      const characters = await this.rickAndMortyApi.getCharacters(randomPage);
      const randomCharacter = getRandomCharacter(characters.results);

      return {
        character: {
          name: (randomCharacter as any).name,
          image: (randomCharacter as any).image,
          species: (randomCharacter as any).species,
        },
        cat: {
          id: cat[0].id,
          image: cat[0].url,
        },
      };
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
