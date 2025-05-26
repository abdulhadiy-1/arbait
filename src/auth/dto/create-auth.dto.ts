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

export class CreateAuthDto {
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
  districtId: string;
  @ApiProperty()
  @IsUUID()
  regionId: string;
}
