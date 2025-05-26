import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateLevelDto } from './dto/create-level.dto';
import { UpdateLevelDto } from './dto/update-level.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class LevelService {
  constructor(private client: PrismaService) {}
  async create(data: CreateLevelDto) {
    let level = await this.client.level.create({ data: data });
    return level;
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
    let levels = await this.client.level.findMany({where, take, skip});
    return levels;
  }

  async findOne(id: string) {
    let level = await this.client.level.findUnique({ where: { id } });
    if (!level) throw new BadRequestException('level not found');
    return level;
  }

  async update(id: string, data: UpdateLevelDto) {
    let level = await this.client.level.findUnique({ where: { id } });
    if (!level) throw new BadRequestException('level not found');
    let updated = await this.client.level.update({
      where: { id },
      data: data,
    });
    return updated;
  }

  async remove(id: string) {
    let level = await this.client.level.findUnique({ where: { id } });
    if (!level) throw new BadRequestException('level not found');
    let deleted = await this.client.level.delete({
      where: { id },
    });
    return deleted;
  }
}
