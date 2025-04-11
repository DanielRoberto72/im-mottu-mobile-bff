import { RickAndMortyClient } from '../../external/rick-and-morty-api/rick-and-morty-api.client';
import { CatsApiClient } from '../../external/the-cat-api/the-cat-api.client';
import { getRandomCharacter } from '../../utils/getRandomCharacter';
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
import { SaveFavoritePairsDto } from './dto/SaveFavoritePairsDto';
import { favoritesCache } from '@mottu/bff/shared/cache/favorites-cache.service';
import { SaveFavoritePairResponse } from './interface/SaveFavoritePair';

@Injectable()
export class PairsService {
  constructor(
    private readonly catApi: CatsApiClient,
    private readonly rickAndMortyApi: RickAndMortyClient,
  ) {}
  async getPairs(page: number): Promise<RandomResponseDto> {
    try {
      const cat = await this.catApi.getCats(page);
      const characters = await this.rickAndMortyApi.getCharacters(page);
      const randomCharacterForSpecificPage =
        getRandomCharacter<RickAndMortyCharacter>(characters.results);

      return {
        character: {
          name: randomCharacterForSpecificPage.name,
          image: randomCharacterForSpecificPage.image,
          species: randomCharacterForSpecificPage.species,
        },
        cat: {
          id: cat[0].id,
          image: cat[0].url,
        },
      };
    } catch (error) {
      throw new InternalServerErrorException({
        erro: 5001,
        mensagem: 'Erro interno do Servidor',
      });
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
        throw new NotFoundException({
          erro: 4001,
          mensagem: `Não encontramos a raça "${catBreed}"`,
        });
      }

      const response: RickAndMortyApiResponse =
        await this.rickAndMortyApi.getCharactersByName(characterName);

      if (!response.results || response.results.length === 0) {
        throw new NotFoundException({
          erro: 4002,
          mensagem: `Não encontramos nenhum personagem com o nome ${characterName} ou semelhante`,
        });
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
      const response: any = error.getResponse?.();

      if (error instanceof NotFoundException) {
        throw new NotFoundException({
          erro: response?.erro ?? 4040,
          mensagem: response?.mensagem,
        });
      }

      throw new InternalServerErrorException({
        erro: 5000,
        mensagem: 'Erro interno do Servidor',
      });
    }
  }

  async savePairs(
    dto: SaveFavoritePairsDto,
  ): Promise<SaveFavoritePairResponse> {
    try {
      favoritesCache.push(dto);
      return {
        sucesso: 2000,
        mensagem: 'Par favorito salvo com sucesso',
      };
    } catch (error) {
      throw new InternalServerErrorException({
        erro: 5000,
        mensagem: 'Erro interno do Servidor ao salvar par favorito',
      });
    }
  }

  async getFavoritePairs() {
    try {
      const favorites = favoritesCache;
      return {
        favoritos: favorites,
      };
    } catch (error) {
      throw new InternalServerErrorException({
        erro: 5000,
        mensagem: 'Erro interno do Servidor ao retornar pares favoritos',
      });
    }
  }
}
