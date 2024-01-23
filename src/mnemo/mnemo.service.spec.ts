import { Test, TestingModule } from '@nestjs/testing';
import { MnemoService } from './mnemo.service';

describe('MnemoService', () => {
  let service: MnemoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MnemoService],
    }).compile();

    service = module.get<MnemoService>(MnemoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
