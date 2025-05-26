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
import { SizeService } from './size.service';
import { CreateSizeDto } from './dto/create-size.dto';
import { UpdateSizeDto } from './dto/update-size.dto';
import { ApiQuery } from '@nestjs/swagger';
import { RoleD } from 'src/auth/decorators/roles.decorstor';
import { AuthGuard } from 'src/auth-middleware/auth-middleware.guard';
import { RoleGuard } from 'src/role/role.guard';
import { Role } from '@prisma/client';

@Controller('size')
export class SizeController {
  constructor(private readonly sizeService: SizeService) {}
  @RoleD(Role.ADMIN)
  @UseGuards(RoleGuard)
  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createSizeDto: CreateSizeDto) {
    return this.sizeService.create(createSizeDto);
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
    return this.sizeService.findAll(+page, +limit, filter);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sizeService.findOne(id);
  }

  @RoleD(Role.ADMIN, Role.SUPER_ADMIN)
  @UseGuards(RoleGuard)
  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSizeDto: UpdateSizeDto) {
    return this.sizeService.update(id, updateSizeDto);
  }
  @RoleD(Role.ADMIN)
  @UseGuards(RoleGuard)
  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sizeService.remove(id);
  }
}
