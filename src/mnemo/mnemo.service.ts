import { Injectable } from '@nestjs/common';

@Injectable()
export class MnemoService {
  createMnemo(): string {
    return 'Mnemo Service';
  }
}
