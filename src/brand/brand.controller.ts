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
import { BrandService } from './brand.service';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { ApiQuery } from '@nestjs/swagger';
import { RoleD } from 'src/auth/decorators/roles.decorstor';
import { Role } from '@prisma/client';
import { RoleGuard } from 'src/role/role.guard';
import { AuthGuard } from 'src/auth-middleware/auth-middleware.guard';

@Controller('brand')
export class BrandController {
  constructor(private readonly brandService: BrandService) {}
  @RoleD(Role.ADMIN)
  @UseGuards(RoleGuard)
  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createBrandDto: CreateBrandDto) {
    return this.brandService.create(createBrandDto);
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
    return this.brandService.findAll(+page, +limit, filter);
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.brandService.findOne(id);
  }
  @RoleD(Role.ADMIN, Role.SUPER_ADMIN)
  @UseGuards(RoleGuard)
  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBrandDto: UpdateBrandDto) {
    return this.brandService.update(id, updateBrandDto);
  }
  @RoleD(Role.ADMIN)
  @UseGuards(RoleGuard)
  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.brandService.remove(id);
  }
}
