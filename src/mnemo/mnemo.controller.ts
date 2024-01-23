import { Controller, Get } from '@nestjs/common';
import { MnemoService } from './mnemo.service';

@Controller('mnemo')
export class MnemoController {
  constructor(private readonly mnemoService: MnemoService) {}
  @Get()
  createMnemo(): string {
    return this.mnemoService.createMnemo();
  }
}
