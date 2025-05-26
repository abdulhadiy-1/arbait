import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import {
  IsEmail,
  IsPhoneNumber,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateCompanyDto {
  @ApiProperty()
  @IsString()
  @MaxLength(30)
  @MinLength(1)
  name: string;
  @ApiProperty()
  @IsPhoneNumber()
  phone: string;
  @ApiProperty()
  @IsEmail()
  email: string;
  @ApiProperty()
  @IsString()
  @MaxLength(100)
  @MinLength(5)
  password: string;
  @ApiProperty()
  @IsUUID()
  regionId: string;
  @ApiProperty()
  @IsString()
  @MaxLength(30)
  @MinLength(1)
  inn: string;
  @ApiProperty()
  @IsString()
  @MaxLength(30)
  @MinLength(1)
  mfo: string;
  @ApiProperty()
  @IsString()
  @MaxLength(30)
  @MinLength(1)
  p_c: string;
  @ApiProperty()
  @IsString()
  @MaxLength(30)
  @MinLength(1)
  bank: string;
  @ApiProperty()
  @IsString()
  @MaxLength(30)
  @MinLength(1)
  oked: string;
  @ApiProperty()
  @IsString()
  @MaxLength(100)
  @MinLength(1)
  adres: string;
}
