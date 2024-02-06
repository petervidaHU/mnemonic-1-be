import { Controller, Get, Param } from '@nestjs/common';
import { MnemoService } from './mnemo.service';
import { MnemoApiResponse } from 'src/types/mnemoTypes';

@Controller('mnemo')
export class MnemoController {
  constructor(private readonly mnemoService: MnemoService) {}

  @Get(':id')
  getOneMnemo(@Param('id') id: string): string {
    return this.mnemoService.getOneMnemo(id);
  }

  @Get('create/:id')
  async createOneMnemo(@Param('id') id: string): Promise<MnemoApiResponse> {
    return await this.mnemoService.createMnemo(id);
  }
}
