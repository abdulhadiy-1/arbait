import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateDistrictDto {
  @ApiProperty()
  @IsString()
  name: string;
}
