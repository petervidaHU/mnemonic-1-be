import { IsString, IsArray, IsOptional, IsObject } from 'class-validator';

class characterItems {
  @IsString()
  char: string;

  @IsOptional()
  @IsString()
  predestined?: string;
}

class MnemoOptions {
  @IsString()
  style: string;
}

export class CreateMnemoDto {
  @IsArray()
  characters: characterItems[];

  @IsString()
  description: string;

  @IsObject()
  globalOptions: MnemoOptions;
}
