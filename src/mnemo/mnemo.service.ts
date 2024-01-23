import { Injectable } from '@nestjs/common';
import { CreateMnemoDto } from 'src/dto/create-mnemo';

@Injectable()
export class MnemoService {
  createMnemo(data: CreateMnemoDto): any {
    console.log('data:', data);
    return data;
  }

  getOneMnemo(id: string): string {
    return `Mnemo Service ${id}`;
  }
}
