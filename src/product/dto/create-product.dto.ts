import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class CreateProductDto {
  @ApiProperty()
  @IsString()
  @MinLength(1)
  @MaxLength(30)
  name_en: string;
  @ApiProperty()
  @IsString()
  @IsOptional()
  name_uz?: string;
  @ApiProperty()
  @IsString()
  @IsOptional()
  name_ru?: string;

  @ApiProperty()
  @IsBoolean()
  isActive: boolean;

  @ApiProperty()
  @IsString()
  image: string;

  @ApiProperty()
  @IsNumber()
  @Min(0)
  minWorkingHours: number;

  @ApiProperty()
  @Min(0)
  price_hourly: number;

  @ApiProperty()
  @Min(0)
  price_daily: number;

  @ApiProperty()
  @IsArray()
  @IsOptional()
  @IsUUID('4', { each: true })
  tools?: string[];
}
