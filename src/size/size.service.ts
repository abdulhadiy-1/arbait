import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateSizeDto } from './dto/create-size.dto';
import { UpdateSizeDto } from './dto/update-size.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SizeService {
  constructor(private client: PrismaService) {}
  async create(data: CreateSizeDto) {
    let size = await this.client.size.create({ data: data });
    return size;
  }

  async findAll(page: number, limit: number, filter: string) {
    let take = limit || 10;
    let skip = page ? (page - 1) * take : 0;
    let where: any = {};
    if (filter) {
      where.name = {
        startsWith: filter,
      };
    }
    let sizes = await this.client.size.findMany({where, skip, take});
    return sizes;
  }

  async findOne(id: string) {
    let size = await this.client.size.findUnique({ where: { id } });
    if (!size) throw new BadRequestException('size not found');
    return size;
  }

  async update(id: string, data: UpdateSizeDto) {
    let size = await this.client.size.findUnique({ where: { id } });
    if (!size) throw new BadRequestException('size not found');
    let updated = await this.client.size.update({
      where: { id },
      data: data,
    });
    return updated;
  }

  async remove(id: string) {
    let size = await this.client.size.findUnique({ where: { id } });
    if (!size) throw new BadRequestException('size not found');
    let deleted = await this.client.size.delete({
      where: { id },
    });
    return deleted;
  }
}
