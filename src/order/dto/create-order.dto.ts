import { Measure, PaymentType } from '@prisma/client';
import {
  IsOptional,
  IsString,
  IsNumber,
  IsEnum,
  IsArray,
  IsBoolean,
  IsJSON,
  IsUUID,
  IsDate,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateOrderDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  levelId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  count?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  quantity?: number;

  @ApiPropertyOptional({ enum: Measure })
  @IsOptional()
  @IsEnum(Measure)
  measure?: Measure;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  tCount?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  total?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  location?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  addres?: string;

  @ApiProperty({ enum: PaymentType })
  @IsEnum(PaymentType)
  paymentType: PaymentType;

  @ApiProperty()
  @IsBoolean()
  withDelivery: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  commentToDelivery?: string;

  @ApiProperty({ type: [String] })
  @IsOptional()
  @IsArray()
  @IsUUID('4', { each: true })
  masters?: string[];

  @ApiProperty({ type: [String] })
  @IsOptional()
  @IsArray()
  @IsUUID('4', { each: true })
  tools?: string[];

  @ApiProperty({ type: String, format: 'date-time' })
  @Type(() => Date)
  @IsDate()
  date: Date;
}
