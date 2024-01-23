import { IsString, IsArray, IsOptional, IsIn, IsObject } from 'class-validator';

class LongTextItem {
  @IsString()
  word: string;

  @IsIn(['keep', 'related', 'freeText'])
  options: 'keep' | 'related' | 'freeText';

  @IsOptional()
  @IsString()
  predestined?: string;
}

class mnemoOptions {
  @IsString()
  style: string;
}

export class CreateMnemoDto {
  @IsArray()
  longText: LongTextItem[];

  @IsString()
  description: string;

  @IsObject()
  globalOptions: mnemoOptions;
}
