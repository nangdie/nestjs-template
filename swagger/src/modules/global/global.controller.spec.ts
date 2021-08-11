import { Test, TestingModule } from '@nestjs/testing';
import { GlobalController } from './global.controller';

describe('GlobalController', () => {
  let controller: GlobalController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GlobalController],
    }).compile();

    controller = module.get<GlobalController>(GlobalController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
