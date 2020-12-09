import { Test, TestingModule } from '@nestjs/testing';
import { XxxService } from './xxx.service';

describe('XxxService', () => {
  let service: XxxService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [XxxService],
    }).compile();

    service = module.get<XxxService>(XxxService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
