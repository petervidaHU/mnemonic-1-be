import { Injectable } from '@nestjs/common';
import { invokeLLM } from './services/createLLM';

@Injectable()
export class MnemoService {
  createMnemo(data: string): any {
    const resp = invokeLLM([...data.split('')]);

    return resp;
  }

  getOneMnemo(id: string): string {
    return `Mnemo Service ${id}`;
  }
}
