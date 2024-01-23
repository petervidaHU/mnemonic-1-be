import { Injectable } from '@nestjs/common';
import { CreateMnemoDto } from 'src/dto/create-mnemo';
import { invokeLLM } from './services/createLLM';

@Injectable()
export class MnemoService {
  createMnemo(data: CreateMnemoDto): any {
    const resp = invokeLLM(data);

    return resp;
  }

  getOneMnemo(id: string): string {
    return `Mnemo Service ${id}`;
  }
}
