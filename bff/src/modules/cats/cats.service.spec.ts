import { Test, TestingModule } from '@nestjs/testing';
import { CatsService } from './cats.service';
import { CatsApiClient } from '../../external/the-cat-api/the-cat-api.client';

describe('CatsService', () => {
  let service: CatsService;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let catApiClient: CatsApiClient;

  const mockBreeds = [
    { id: 'abys', name: 'Abyssinian' },
    { id: 'aege', name: 'Aegean' },
  ];

  const catsApiClientMock = {
    getBreeds: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CatsService,
        { provide: CatsApiClient, useValue: catsApiClientMock },
      ],
    }).compile();

    service = module.get<CatsService>(CatsService);
    catApiClient = module.get<CatsApiClient>(CatsApiClient);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Deve retornar as raças da the-cat-api', async () => {
    catsApiClientMock.getBreeds.mockResolvedValue(mockBreeds);

    const result = await service.getBreeds();

    expect(result).toEqual(mockBreeds);
    expect(catsApiClientMock.getBreeds).toHaveBeenCalledTimes(1);
  });
});
