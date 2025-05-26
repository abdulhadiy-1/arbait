import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateSizeDto {
  @ApiProperty()
  @IsString()
  name_en: string;
  @ApiProperty()
  @IsString()
  @IsOptional()
  name_uz?: string;
  @ApiProperty()
  @IsString()
  @IsOptional()
  name_ru?: string;
}
