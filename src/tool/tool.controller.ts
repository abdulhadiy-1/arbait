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
import { ToolService } from './tool.service';
import { CreateToolDto } from './dto/create-tool.dto';
import { UpdateToolDto } from './dto/update-tool.dto';
import { ApiQuery } from '@nestjs/swagger';
import { RoleD } from 'src/auth/decorators/roles.decorstor';
import { AuthGuard } from 'src/auth-middleware/auth-middleware.guard';
import { RoleGuard } from 'src/role/role.guard';
import { Role } from '@prisma/client';

@Controller('tool')
export class ToolController {
  constructor(private readonly toolService: ToolService) {}
  @RoleD(Role.ADMIN)
  @UseGuards(RoleGuard)
  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createToolDto: CreateToolDto) {
    return this.toolService.create(createToolDto);
  }

  @Get()
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'filter', required: false, type: String })
  @ApiQuery({ name: 'isActive', required: false, type: Boolean })
  @ApiQuery({ name: 'price_from', required: false, type: Number })
  @ApiQuery({ name: 'price_to', required: false, type: Number })
  @ApiQuery({ name: 'quantity_from', required: false, type: Number })
  @ApiQuery({ name: 'quantity_to', required: false, type: Number })
  @ApiQuery({ name: 'code', required: false, type: String })
  findAll(
    @Query('page') page: string,
    @Query('limit') limit: string,
    @Query('filter') filter: string,
    @Query('isActive') isActive: boolean | undefined,
    @Query('price_from') price_from: string,
    @Query('price_to') price_to: string,
    @Query('quantity_from') quantity_from: string,
    @Query('quantity_to') quantity_to: string,
    @Query('code') code: string,
  ) {
    return this.toolService.findAll(
      +page,
      +limit,
      filter,
      isActive,
      +price_from,
      +price_to,
      +quantity_from,
      +quantity_to,
      code,
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.toolService.findOne(id);
  }
  @RoleD(Role.ADMIN, Role.SUPER_ADMIN)
  @UseGuards(RoleGuard)
  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateToolDto: UpdateToolDto) {
    return this.toolService.update(id, updateToolDto);
  }
  @RoleD(Role.ADMIN)
  @UseGuards(RoleGuard)
  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.toolService.remove(id);
  }
}
