import { BadRequestException, Injectable, Ip } from '@nestjs/common';
import { CreateRegionDto } from './dto/create-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RegionService {
  constructor(private client: PrismaService) {}
  async create(createRegionDto: CreateRegionDto) {
    let region = await this.client.region.create({ data: createRegionDto });
    return region;
  }

  async findAll(page: number, limit: number, filter: string) {
    let take = limit || 10;
    let skip = page ? (page - 1) * limit : 0;
    let where: any = {};
    if (filter) {
      where.name = {
        startsWith: filter,
      };
    }
    let regions = await this.client.region.findMany({ where, take, skip });
    return regions;
  }

  async findOne(id: string) {
    let region = await this.client.region.findUnique({ where: { id } });
    if (!region) throw new BadRequestException('region not found');
    return region;
  }

  async update(id: string, updateRegionDto: UpdateRegionDto) {
    let region = await this.client.region.findUnique({ where: { id } });
    if (!region) throw new BadRequestException('region not found');
    let updated = await this.client.region.update({
      where: { id },
      data: updateRegionDto,
    });
    return updated;
  }

  async remove(id: string) {
    let region = await this.client.region.findUnique({ where: { id } });
    if (!region) throw new BadRequestException('region not found');
    let deleted = await this.client.region.delete({
      where: { id },
    });
    return deleted;
  }
}
