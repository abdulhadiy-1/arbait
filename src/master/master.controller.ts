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
import { MasterService } from './master.service';
import { CreateMasterDto } from './dto/create-master.dto';
import { UpdateMasterDto } from './dto/update-master.dto';
import { ApiQuery } from '@nestjs/swagger';
import { RoleD } from 'src/auth/decorators/roles.decorstor';
import { AuthGuard } from 'src/auth-middleware/auth-middleware.guard';
import { RoleGuard } from 'src/role/role.guard';
import { Role } from '@prisma/client';

@Controller('master')
export class MasterController {
  constructor(private readonly masterService: MasterService) {}
  @RoleD(Role.ADMIN)
  @UseGuards(RoleGuard)
  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createMasterDto: CreateMasterDto) {
    return this.masterService.create(createMasterDto);
  }

  @ApiQuery({ name: 'page', required: false, type: String })
  @ApiQuery({ name: 'limit', required: false, type: String })
  @ApiQuery({ name: 'filter', required: false, type: String })
  @ApiQuery({ name: 'phone', required: false, type: String })
  @ApiQuery({ name: 'isActive', required: false, type: Boolean })
  @ApiQuery({ name: 'year_from', required: false, type: String })
  @ApiQuery({ name: 'year_to', required: false, type: String })
  @ApiQuery({ name: 'minworkinghour_from', required: false, type: String })
  @ApiQuery({ name: 'minworkinghour_to', required: false, type: String })
  @ApiQuery({ name: 'pricehourly_from', required: false, type: String })
  @ApiQuery({ name: 'pricehourly_to', required: false, type: String })
  @ApiQuery({ name: 'pricedaily_from', required: false, type: String })
  @ApiQuery({ name: 'pricedaily_to', required: false, type: String })
  @ApiQuery({ name: 'experience_from', required: false, type: String })
  @ApiQuery({ name: 'experience_to', required: false, type: String })
  @ApiQuery({ name: 'star_from', required: false, type: String })
  @ApiQuery({ name: 'star_to', required: false, type: String })
  @Get()
  findAll(
    @Query('page') page: string,
    @Query('limit') limit: string,
    @Query('filter') filter: string,
    @Query('phone') phone: string,
    @Query('isActive') isActiveRaw: string,
    @Query('year_from') year_from: string,
    @Query('year_to') year_to: string,
    @Query('minworkinghour_from') minworkinghour_from: string,
    @Query('minworkinghour_to') minworkinghour_to: string,
    @Query('pricehourly_from') pricehourly_from: string,
    @Query('pricehourly_to') pricehourly_to: string,
    @Query('pricedaily_from') pricedaily_from: string,
    @Query('pricedaily_to') pricedaily_to: string,
    @Query('experience_from') experience_from: string,
    @Query('experience_to') experience_to: string,
    @Query('star_from') star_from: string,
    @Query('star_to') star_to: string,
  ) {
    const isActive =
      isActiveRaw === 'true'
        ? true
        : isActiveRaw === 'false'
          ? false
          : undefined;
    return this.masterService.findAll(
      +page,
      +limit,
      filter,
      phone,
      isActive,
      +year_from,
      +year_to,
      +minworkinghour_from,
      +minworkinghour_to,
      +pricehourly_from,
      +pricehourly_to,
      +pricedaily_from,
      +pricedaily_to,
      +experience_from,
      +experience_to,
      +star_from,
      +star_to,
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.masterService.findOne(id);
  }

  @RoleD(Role.ADMIN, Role.SUPER_ADMIN)
  @UseGuards(RoleGuard)
  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMasterDto: UpdateMasterDto) {
    return this.masterService.update(id, updateMasterDto);
  }
  @RoleD(Role.ADMIN)
  @UseGuards(RoleGuard)
  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.masterService.remove(id);
  }
}
