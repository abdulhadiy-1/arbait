import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiQuery } from '@nestjs/swagger';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @ApiQuery({ name: 'page', required: false, type: String })
  @ApiQuery({ name: 'limit', required: false, type: String })
  @ApiQuery({ name: 'filter', required: false, type: String })
  @ApiQuery({ name: 'isActive', required: false, type: Boolean })
  @ApiQuery({ name: 'minworkinghour_from', required: false, type: String })
  @ApiQuery({ name: 'minworkinghour_to', required: false, type: String })
  @ApiQuery({ name: 'pricehourly_from', required: false, type: String })
  @ApiQuery({ name: 'pricehourly_to', required: false, type: String })
  @ApiQuery({ name: 'pricedaily_from', required: false, type: String })
  @ApiQuery({ name: 'pricedaily_to', required: false, type: String })
  @Get()
  findAll(
    @Query('page') page: string,
    @Query('limit') limit: string,
    @Query('filter') filter: string,
    @Query('isActive') isActiveRaw: string,
    @Query('minworkinghour_from') minworkinghour_from: string,
    @Query('minworkinghour_to') minworkinghour_to: string,
    @Query('pricehourly_from') pricehourly_from: string,
    @Query('pricehourly_to') pricehourly_to: string,
    @Query('pricedaily_from') pricedaily_from: string,
    @Query('pricedaily_to') pricedaily_to: string,
  ) {
    const isActive =
      isActiveRaw === 'true'
        ? true
        : isActiveRaw === 'false'
          ? false
          : undefined;

    return this.productService.findAll(
      +page,
      +limit,
      filter,
      isActive,
      +minworkinghour_from,
      +minworkinghour_to,
      +pricehourly_from,
      +pricehourly_to,
      +pricedaily_from,
      +pricedaily_to,
    );
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(id);
  }
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(id, updateProductDto);
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(id);
  }
}
