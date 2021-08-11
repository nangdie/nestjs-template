import { Test, TestingModule } from '@nestjs/testing';
import { GlobalService } from './global.service';

describe('GlobalService', () => {
  let service: GlobalService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GlobalService],
    }).compile();

    service = module.get<GlobalService>(GlobalService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
