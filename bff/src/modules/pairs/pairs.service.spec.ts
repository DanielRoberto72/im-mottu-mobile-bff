import { Test, TestingModule } from '@nestjs/testing';
import { PairsService } from './pairs.service';
import { CatsApiClient } from '../../external/the-cat-api/the-cat-api.client';
import { RickAndMortyClient } from '../../external/rick-and-morty-api/rick-and-morty-api.client';
import { getRandomCharacter } from '../../utils/getRandomCharacter';
import { getRandomPage } from '../../utils/getRandomPage';

jest.mock('../../utils/getRandomCharacter');
jest.mock('../../utils/getRandomPage');

describe('PairsService', () => {
  let service: PairsService;
  let catApiClient: CatsApiClient;
  let rickAndMortyClient: RickAndMortyClient;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PairsService,
        {
          provide: CatsApiClient,
          useValue: {
            getCats: jest.fn(),
            getBreeds: jest.fn(),
          },
        },
        {
          provide: RickAndMortyClient,
          useValue: {
            getCharacters: jest.fn(),
            getCharactersByName: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<PairsService>(PairsService);
    catApiClient = module.get<CatsApiClient>(CatsApiClient);
    rickAndMortyClient = module.get<RickAndMortyClient>(RickAndMortyClient);
  });

  describe('getPairs', () => {
    it('deve retornar um gato e personagem aleatório', async () => {
      const fakeCat = [{ id: 'cat-id', url: 'cat-url' }];
      const fakeCharacter = {
        name: 'Rick Sanchez',
        image: 'rick-image',
        species: 'Human',
      };
      const fakeCharacterResponse = {
        results: [fakeCharacter],
      };

      (catApiClient.getCats as jest.Mock).mockResolvedValue(fakeCat);
      (getRandomPage as jest.Mock).mockReturnValue(1);
      (rickAndMortyClient.getCharacters as jest.Mock).mockResolvedValue(
        fakeCharacterResponse,
      );
      (getRandomCharacter as jest.Mock).mockReturnValue(fakeCharacter);

      const result = await service.getPairs();

      expect(result).toEqual({
        character: fakeCharacter,
        cat: {
          id: 'cat-id',
          image: 'cat-url',
        },
      });
    });
  });

  describe('getPairsWithFilters', () => {
    it('deve retornar gato por raça e personagem por nome', async () => {
      const catBreed = 'Abyssinian';
      const characterName = 'Rick';

      const breed = {
        name: 'Abyssinian',
        id: 'abys',
        url: 'cat-url',
      };

      const characterResponse = {
        results: [
          {
            name: 'Rick Sanchez',
            image: 'rick-image',
            species: 'Human',
          },
        ],
      };

      (catApiClient.getBreeds as jest.Mock).mockResolvedValue([breed]);
      (rickAndMortyClient.getCharactersByName as jest.Mock).mockResolvedValue(
        characterResponse,
      );

      const result = await service.getPairsWithFilters(characterName, catBreed);

      expect(result).toEqual({
        character: [
          {
            name: 'Rick Sanchez',
            image: 'rick-image',
            species: 'Human',
          },
        ],
        cat: breed,
      });
    });
  });
});
