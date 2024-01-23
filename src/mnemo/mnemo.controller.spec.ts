import { Test, TestingModule } from '@nestjs/testing';
import { MnemoController } from './mnemo.controller';

describe('MnemoController', () => {
  let controller: MnemoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MnemoController],
    }).compile();

    controller = module.get<MnemoController>(MnemoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
