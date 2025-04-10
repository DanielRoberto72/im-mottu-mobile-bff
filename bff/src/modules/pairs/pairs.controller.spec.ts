import { Test, TestingModule } from '@nestjs/testing';
import { PairsController } from './pairs.controller';
import { PairsService } from './pairs.service';

describe('PairsController', () => {
  let controller: PairsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PairsController],
      providers: [PairsService],
    }).compile();

    controller = module.get<PairsController>(PairsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
