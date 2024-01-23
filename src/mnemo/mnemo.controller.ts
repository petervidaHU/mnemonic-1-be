import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { MnemoService } from './mnemo.service';
import { CreateMnemoDto } from '../dto/create-mnemo';

@Controller('mnemo')
export class MnemoController {
  constructor(private readonly mnemoService: MnemoService) {}

  @Get(':id')
  getOneMnemo(@Param('id') id: string): string {
    return this.mnemoService.getOneMnemo(id);
  }

  @Post()
  createMnemo(@Body() body: CreateMnemoDto): string {
    return this.mnemoService.createMnemo(body);
  }
}
