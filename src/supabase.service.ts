import { Injectable } from '@nestjs/common';
import { createClient } from '@supabase/supabase-js';

@Injectable()
export class SupabaseService {
  private supabaseClient: any;

  constructor() {
    if (!process.env.SUPABASE_URL || !process.env.SUPABASE_API) {
      throw new Error('Missing Supabase environment variables');
    }
    this.supabaseClient = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_API,
    );
  }

  get client() {
    return this.supabaseClient;
  }
}
