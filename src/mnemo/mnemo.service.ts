import { Injectable } from '@nestjs/common';
import { invokeLLM } from './llm-services/createLLM';
import { SupabaseService } from 'src/supabase.service';
import { MnemoApiResponse } from 'src/types/mnemoTypes';

@Injectable()
export class MnemoService {
  constructor(private readonly supabaseService: SupabaseService) {}

  async createMnemo(data: string): Promise<MnemoApiResponse> {
    // TODO do not have to .split()
    const responses: MnemoApiResponse = await invokeLLM([...data.split('')]);
    const toDB = responses.data.map((response) => ({
      id: response.id,
      created_at: new Date(),
      acronyms: data,
      text: response.text,
      status: null,
      flagged: false,
    }));

    console.log('++toDB++++', toDB);
    console.log('+++++++++++');

    const { error } = await this.supabaseService.client
      .from('mnemonicsTable')
      .insert(toDB);

    if (error) {
      console.error('Error inserting data:', error);
      throw error;
    }

    return responses;
  }

  getOneMnemo(id: string): string {
    return `Mnemo Service ${id}`;
  }
}
