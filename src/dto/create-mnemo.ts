import { IsString, IsArray, IsOptional, IsObject } from 'class-validator';

class LongTextItem {
  @IsString()
  char: string;

  @IsOptional()
  @IsString()
  predestined?: string;

  @IsOptional()
  @IsString()
  relatedTo?: string;
}

class MnemoOptions {
  @IsString()
  style: string;
}

export class CreateMnemoDto {
  @IsArray()
  longText: LongTextItem[];

  @IsString()
  description: string;

  @IsObject()
  globalOptions: MnemoOptions;
}
