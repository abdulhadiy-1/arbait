import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCapacityDto } from './dto/create-capacity.dto';
import { UpdateCapacityDto } from './dto/update-capacity.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CapacityService {
  constructor(private client: PrismaService) {}
  async create(data: CreateCapacityDto) {
    let capacity = await this.client.capacity.create({ data: data });
    return capacity;
  }

  async findAll() {
    let capacitys = await this.client.capacity.findMany();
    return capacitys;
  }

  async findOne(id: string) {
    let capacity = await this.client.capacity.findUnique({ where: { id } });
    if (!capacity) throw new BadRequestException('capacity not found');
    return capacity;
  }

  async update(id: string, data: UpdateCapacityDto) {
    let capacity = await this.client.capacity.findUnique({ where: { id } });
    if (!capacity) throw new BadRequestException('capacity not found');
    let updated = await this.client.capacity.update({
      where: { id },
      data: data,
    });
    return updated;
  }

  async remove(id: string) {
    let capacity = await this.client.capacity.findUnique({ where: { id } });
    if (!capacity) throw new BadRequestException('capacity not found');
    let deleted = await this.client.capacity.delete({
      where: { id },
    });
    return deleted;
  }
}
