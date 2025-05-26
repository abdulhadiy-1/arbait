import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateToolDto } from './dto/create-tool.dto';
import { UpdateToolDto } from './dto/update-tool.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ToolService {
  constructor(private client: PrismaService) {}
  async create(createToolDto: CreateToolDto) {
    let brand = await this.client.brand.findUnique({
      where: { id: createToolDto.brandId },
    });
    if (!brand) throw new BadRequestException('brand not found');
    let capacity = await this.client.capacity.findUnique({
      where: { id: createToolDto.capacityId },
    });
    if (!capacity) throw new BadRequestException('capacity not found');
    let size = await this.client.size.findUnique({
      where: { id: createToolDto.sizeId },
    });
    if (!size) throw new BadRequestException('size not found');
    const lastTool = await this.client.tool.findFirst({
      orderBy: { code: 'desc' },
      select: { code: true },
    });
    const nextCodeNumber = (lastTool ? +lastTool.code : 0) + 1;
    const nextCode = nextCodeNumber.toString().padStart(5, '0');

    let tool = await this.client.tool.create({
      data: { ...createToolDto, code: nextCode },
    });
    return tool;
  }

  async findAll(
    page: number,
    limit: number,
    filter: string,
    isActive: boolean | undefined,
    price_from: number,
    price_to: number,
    quantity_from: number,
    quantity_to: number,
    code: string,
  ) {
    const take = limit || 10;
    const skip = page ? (page - 1) * take : 0;

    const where: any = {};

    if (filter) {
      where.name = { contains: filter, mode: 'insensitive' };
    }

    if (typeof isActive === 'boolean') {
      where.isActive = isActive;
    }

    if (code) {
      where.code = { contains: code, mode: 'insensitive' };
    }

    if (!isNaN(price_from) || !isNaN(price_to)) {
      where.price = {};
      if (!isNaN(price_from)) where.price.gte = price_from;
      if (!isNaN(price_to)) where.price.lte = price_to;
    }

    if (!isNaN(quantity_from) || !isNaN(quantity_to)) {
      where.quantity = {};
      if (!isNaN(quantity_from)) where.quantity.gte = quantity_from;
      if (!isNaN(quantity_to)) where.quantity.lte = quantity_to;
    }

    const tools = await this.client.tool.findMany({
      where,
      skip,
      take,
      orderBy: { createdAt: 'desc' },
    });

    return tools;
  }

  async findOne(id: string) {
    let one = await this.client.tool.findUnique({ where: { id } });
    if (!one) throw new BadRequestException('tool not found');
    return one;
  }

  async update(id: string, updateToolDto: UpdateToolDto) {
    let one = await this.client.tool.findUnique({ where: { id } });
    if (!one) throw new BadRequestException('tool not found');
    let updated = await this.client.tool.update({
      where: { id },
      data: updateToolDto,
    });
    return updated;
  }
  l;
  p;
  async remove(id: string) {
    let one = await this.client.tool.findUnique({ where: { id } });
    if (!one) throw new BadRequestException('tool not found');
    let deleted = await this.client.tool.delete({
      where: { id },
    });
    return deleted;
  }
}