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
import { LevelService } from './level.service';
import { CreateLevelDto } from './dto/create-level.dto';
import { UpdateLevelDto } from './dto/update-level.dto';
import { ApiQuery } from '@nestjs/swagger';
import { RoleD } from 'src/auth/decorators/roles.decorstor';
import { AuthGuard } from 'src/auth-middleware/auth-middleware.guard';
import { RoleGuard } from 'src/role/role.guard';
import { Role } from '@prisma/client';

@Controller('level')
export class LevelController {
  constructor(private readonly levelService: LevelService) {}
  @RoleD(Role.ADMIN)
  @UseGuards(RoleGuard)
  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createLevelDto: CreateLevelDto) {
    return this.levelService.create(createLevelDto);
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
    return this.levelService.findAll(+page, +limit, filter);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.levelService.findOne(id);
  }
  @RoleD(Role.ADMIN, Role.SUPER_ADMIN)
  @UseGuards(RoleGuard)
  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLevelDto: UpdateLevelDto) {
    return this.levelService.update(id, updateLevelDto);
  }
  @RoleD(Role.ADMIN)
  @UseGuards(RoleGuard)
  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.levelService.remove(id);
  }
}
