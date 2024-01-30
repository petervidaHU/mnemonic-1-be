import { Controller, Get, Param } from '@nestjs/common';
import { MnemoService } from './mnemo.service';

@Controller('mnemo')
export class MnemoController {
  constructor(private readonly mnemoService: MnemoService) {}

  @Get(':id')
  getOneMnemo(@Param('id') id: string): string {
    return this.mnemoService.getOneMnemo(id);
  }

  @Get('create/:id')
  createOneMnemo(@Param('id') id: string): string {
    return this.mnemoService.createMnemo(id);
  }
}
