import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateCapacityDto {
  @ApiProperty()
  @IsString()
  name: string;
}
