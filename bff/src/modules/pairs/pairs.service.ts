import { RickAndMortyClient } from '@mottu/bff/external/rick-and-morty-api/rick-and-morty-api.client';
import { CatsApiClient } from '@mottu/bff/external/the-cat-api/the-cat-api.client';
import { getRandomCharacter } from '@mottu/bff/utils/getRandomCharacter';
import { getRandomPage } from '@mottu/bff/utils/getRandomPage';
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { RandomResponseDto } from './dto/ResponseDto';
import {
  RickAndMortyCharacter,
  RickAndMortyApiResponse,
} from './interface/RickAndMortyCharacter';

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
      const randomCharacter = getRandomCharacter<RickAndMortyCharacter>(
        characters.results,
      );

      return {
        character: {
          name: randomCharacter.name,
          image: randomCharacter.image,
          species: randomCharacter.species,
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

  async getPairsWithFilters(
    characterName: string,
    catBreed: string,
  ): Promise<RandomResponseDto> {
    try {
      const breeds = await this.catApi.getBreeds();

      const searchedBreed = breeds.find(
        (breed) => breed.name.toLowerCase() === catBreed.toLowerCase(),
      );

      if (!searchedBreed) {
        throw new NotFoundException(`Não encontramos a raça "${catBreed}"`);
      }

      const response: RickAndMortyApiResponse =
        await this.rickAndMortyApi.getCharactersByName(characterName);

      if (!response.results || response.results.length === 0) {
        throw new NotFoundException(
          `Não encontramos nenhum personagem com o "${characterName} ou semelhante`,
        );
      }

      const character = response.results.map(
        (character: RickAndMortyCharacter) => ({
          name: character.name,
          image: character.image,
          species: character.species,
        }),
      );

      return {
        character,
        cat: searchedBreed,
      };
    } catch (error) {
      console.log(error);
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }

      throw new InternalServerErrorException('Internal Server Error');
    }
  }
}
