import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MnemoController } from './mnemo/mnemo.controller';
import { MnemoService } from './mnemo/mnemo.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [AppController, MnemoController],
  providers: [AppService, MnemoService],
})
export class AppModule {}