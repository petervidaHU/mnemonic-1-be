import { IsString, IsArray, IsOptional, IsIn } from 'class-validator';

class LongTextItem {
  @IsString()
  word: string;

  @IsIn(['keep', 'related'])
  options: 'keep' | 'related';

  @IsOptional()
  @IsString()
  predestined?: string;
}

export class CreateMnemoDto {
  @IsArray()
  longText: LongTextItem[];

  @IsString()
  description: string;

  @IsString()
  options: {
    style: string;
  };
}
