import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MnemoController } from './mnemo/mnemo.controller';
import { MnemoService } from './mnemo/mnemo.service';
import { ConfigModule } from '@nestjs/config';
import { SupabaseModule } from './supabase.module';

@Module({
  imports: [ConfigModule.forRoot(), SupabaseModule],
  controllers: [AppController, MnemoController],
  providers: [AppService, MnemoService],
})
export class AppModule {}
