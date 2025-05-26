import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsNumber,
  IsPhoneNumber,
  IsString,
  IsUUID,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class CreateMasterDto {
  @ApiProperty()
  @IsString()
  @MinLength(1)
  @MaxLength(50)
  fullname: string;

  @ApiProperty()
  @IsPhoneNumber()
  phone: string;

  @ApiProperty()
  @IsBoolean()
  isActive: boolean;

  @ApiProperty()
  @IsNumber()
  @Min(1700)
  @Max(new Date().getFullYear())
  year: number;

  @ApiProperty()
  @IsNumber()
  @Min(0)
  minWorkingHours: number;

  @ApiProperty()
  @IsNumber()
  @Min(0)
  price_hourly: number;

  @ApiProperty()
  @IsNumber()
  @Min(0)
  price_daily: number;

  @ApiProperty()
  @IsNumber()
  @Min(0)
  experience: number;

  @ApiProperty()
  @IsString()
  image: string;

  @ApiProperty()
  @IsString()
  passportImage: string;

  @ApiProperty()
  @IsNumber()
  @Min(0)
  @Max(5)
  star: number;

  @ApiProperty()
  @IsString()
  @MinLength(10)
  @MaxLength(500)
  about: string;

  @ApiProperty()
  @IsUUID()
  levelId: string;

  @ApiProperty()
  @IsArray()
  @IsUUID('4', { each: true })
  products: string[];
}
