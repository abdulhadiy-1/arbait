import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductService {
  constructor(private client: PrismaService) {}
  async create(createProductDto: CreateProductDto) {
    const { tools: toolIds, ...rest } = createProductDto;
    const data: any = {
      ...rest,
    };

    if (toolIds?.length) {
      const existingTools = await this.client.tool.findMany({
        where: {
          id: { in: toolIds },
        },
        select: { id: true },
      });
    
      const existingToolIds = new Set(existingTools.map((tool) => tool.id));
    
      const invalidToolIds = toolIds.filter((id) => !existingToolIds.has(id));
    
      if (invalidToolIds.length > 0) {
        throw new BadRequestException(
          `Invalid tool IDs: ${invalidToolIds.join(', ')}`,
        );
      }
    
      data.tools = {
        connect: toolIds.map((id) => ({ id })),
      };
    }
    
    const product = await this.client.product.create({
      data,
      include: {
        tools: true,
      },
    });
    
    return product;
  }
  async findAll(
    page: number,
    limit: number,
    filter: string,
    isActive: boolean | undefined,
    minworkinghour_from: number,
    minworkinghour_to: number,
    pricehourly_from: number,
    pricehourly_to: number,
    pricedaily_from: number,
    pricedaily_to: number,
  ) {
    const take = limit || 10;
    const skip = page ? (page - 1) * take : 0;
    const where: any = {};
    if (filter) {
      where.name = { contains: filter, mode: 'insensitive' };
    }
    if (typeof isActive === 'boolean') where.isActive = isActive;
    if (minworkinghour_from || minworkinghour_to) {
      where.minWorkingHours = {
        ...(minworkinghour_from && { gte: minworkinghour_from }),
        ...(minworkinghour_to && { lte: minworkinghour_to }),
      };
    }

    if (pricehourly_from || pricehourly_to) {
      where.price_hourly = {
        ...(pricehourly_from && { gte: pricehourly_from }),
        ...(pricehourly_to && { lte: pricehourly_to }),
      };
    }

    if (pricedaily_from || pricedaily_to) {
      where.price_daily = {
        ...(pricedaily_from && { gte: pricedaily_from }),
        ...(pricedaily_to && { lte: pricedaily_to }),
      };
    }
    return this.client.product.findMany({
      skip,
      take,
      where,
      include: { tools: true },
    });
  }

  async findOne(id: string) {
    return this.client.product.findUnique({
      where: { id },
      include: { tools: true },
    });
  }
  async update(id: string, updateProductDto: UpdateProductDto) {
    return this.client.product.update({
      where: { id },
      data: {
        ...updateProductDto,
        tools: {
          set: [],
          connect: updateProductDto.tools?.map((id) => ({ id })),
        },
      },
      include: { tools: true },
    });
  }
  async remove(id: string) {
    return this.client.product.delete({
      where: { id },
    });
  }
}
