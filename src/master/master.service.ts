import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateMasterDto } from './dto/create-master.dto';
import { UpdateMasterDto } from './dto/update-master.dto';
import { PrismaService } from 'src/prisma/prisma.service';
@Injectable()
export class MasterService {
  constructor(private client: PrismaService) {}

  private async checkLevelExists(levelId: string) {
    const level = await this.client.level.findFirst({ where: { id: levelId } });
    if (!level) throw new BadRequestException('level with this id not exists');
  }

  private async validateProductIds(productIds: string[]) {
    const existingProducts = await this.client.product.findMany({
      where: { id: { in: productIds } },
      select: { id: true },
    });

    const existingIds = new Set(existingProducts.map((p) => p.id));
    const invalidIds = productIds.filter((id) => !existingIds.has(id));

    if (invalidIds.length > 0) {
      throw new BadRequestException(
        `Invalid product IDs: ${invalidIds.join(', ')}`,
      );
    }

    return productIds.map((id) => ({ id }));
  }

  async create(createMasterDto: CreateMasterDto) {
    const { products: productIds, ...rest } = createMasterDto;

    const exists = await this.client.master.findFirst({
      where: { phone: createMasterDto.phone },
    });
    if (exists)
      throw new BadRequestException('master with this phone already exists');

    await this.checkLevelExists(rest.levelId);

    const data: any = { ...rest };

    if (productIds?.length) {
      data.products = { connect: await this.validateProductIds(productIds) };
    }

    return await this.client.master.create({ data, include: { Level: true } });
  }

async findAll(
  page: number,
  limit: number,
  filter: string,
  phone: string,
  isActive: boolean | undefined,
  year_from: number,
  year_to: number,
  minworkinghour_from: number,
  minworkinghour_to: number,
  pricehourly_from: number,
  pricehourly_to: number,
  pricedaily_from: number,
  pricedaily_to: number,
  experience_from: number,
  experience_to: number,
  star_from: number,
  star_to: number,
) {
  const take = limit || 10;
  const skip = page ? (page - 1) * take : 0;

  const where: any = {};

  if (filter) {
    where.fullname = { contains: filter, mode: 'insensitive' }
  }

  if (phone) where.phone = { contains: phone };
  if (typeof isActive === 'boolean') where.isActive = isActive;

  if (year_from || year_to) {
    where.year = {
      ...(year_from && { gte: year_from }),
      ...(year_to && { lte: year_to }),
    };
  }

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

  if (experience_from || experience_to) {
    where.experience = {
      ...(experience_from && { gte: experience_from }),
      ...(experience_to && { lte: experience_to }),
    };
  }

  if (star_from || star_to) {
    where.star = {
      ...(star_from && { gte: star_from }),
      ...(star_to && { lte: star_to }),
    };
  }

  const result = await this.client.master.findMany({
    skip,
    take,
    where,
    include: {
      Level: true,
    },
  });

  return result;
}


  async findOne(id: string) {
    const one = await this.client.master.findUnique({
      where: { id },
      include: { Level: true },
    });
    if (!one) throw new BadRequestException('master not found');
    return one;
  }

  async update(id: string, updateMasterDto: UpdateMasterDto) {
    const { products: productIds, ...rest } = updateMasterDto;

    const master = await this.client.master.findUnique({ where: { id } });
    if (!master) throw new BadRequestException('master not found');

    if (rest.levelId) {
      await this.checkLevelExists(rest.levelId);
    }

    const data: any = { ...rest };

    if (productIds?.length) {
      data.products = { set: await this.validateProductIds(productIds) };
    }

    return await this.client.master.update({
      where: { id },
      data,
      include: { Level: true },
    });
  }

  async remove(id: string) {
    const master = await this.client.master.findUnique({
      where: { id },
      include: { Level: true },
    });
    if (!master) throw new BadRequestException('master not found');
    return await this.client.master.delete({ where: { id } });
  }
}
