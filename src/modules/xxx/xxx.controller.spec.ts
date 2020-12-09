import { Test, TestingModule } from '@nestjs/testing';
import { XxxController } from './xxx.controller';

describe('XxxController', () => {
  let controller: XxxController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [XxxController],
    }).compile();

    controller = module.get<XxxController>(XxxController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
