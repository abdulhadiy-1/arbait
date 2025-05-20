import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateDistrictDto } from './dto/create-district.dto';
import { UpdateDistrictDto } from './dto/update-district.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DistrictService {
  constructor(private client: PrismaService) {}
  async create(data: CreateDistrictDto) {
    let district = await this.client.district.create({ data });
    return district;
  }

  async findAll() {
    let districts = await this.client.district.findMany();
    return districts;
  }

  async findOne(id: string) {
    let district = await this.client.district.findUnique({ where: { id } });
    if (!district) throw new BadRequestException('district not found');
    return district;
  }

  async update(id: string, data: UpdateDistrictDto) {
    let district = await this.client.district.findUnique({ where: { id } });
    if (!district) throw new BadRequestException('district not found');
    let updated = await this.client.district.update({
      where: { id },
      data,
    });
    return updated;
  }

  async remove(id: string) {
    let district = await this.client.district.findUnique({ where: { id } });
    if (!district) throw new BadRequestException('district not found');
    let deleted = await this.client.district.delete({
      where: { id },
    });
    return deleted;
  }
}
