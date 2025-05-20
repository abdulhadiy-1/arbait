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

  async findAll() {
    let sizes = await this.client.size.findMany();
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
