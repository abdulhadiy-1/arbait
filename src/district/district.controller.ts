import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { DistrictService } from './district.service';
import { CreateDistrictDto } from './dto/create-district.dto';
import { UpdateDistrictDto } from './dto/update-district.dto';
import { ApiQuery } from '@nestjs/swagger';
import { RoleD } from 'src/auth/decorators/roles.decorstor';
import { AuthGuard } from 'src/auth-middleware/auth-middleware.guard';
import { RoleGuard } from 'src/role/role.guard';
import { Role } from '@prisma/client';

@Controller('district')
export class DistrictController {
  constructor(private readonly districtService: DistrictService) {}
  @RoleD(Role.ADMIN)
  @UseGuards(RoleGuard)
  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createDistrictDto: CreateDistrictDto) {
    return this.districtService.create(createDistrictDto);
  }

  @Get()
  @ApiQuery({
    name: 'page',
    required: false,
    example: 1,
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    example: 10,
  })
  @ApiQuery({
    name: 'filter',
    required: false,
  })
  findAll(
    @Query('page') page: string,
    @Query('limit') limit: string,
    @Query('filter') filter: string,
  ) {
    return this.districtService.findAll(+page, +limit, filter);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.districtService.findOne(id);
  }

  @RoleD(Role.ADMIN, Role.SUPER_ADMIN)
  @UseGuards(RoleGuard)
  @UseGuards(AuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDistrictDto: UpdateDistrictDto,
  ) {
    return this.districtService.update(id, updateDistrictDto);
  }
  @RoleD(Role.ADMIN)
  @UseGuards(RoleGuard)
  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.districtService.remove(id);
  }
}
