import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BrandService {
  constructor(private client: PrismaService) {}
  async create(data: CreateBrandDto) {
    let brand = await this.client.brand.create({ data: data });
    return brand;
  }

  async findAll(page: number, limit: number, filter: string) {
    let take = limit || 10
    let skip = page ? ( page - 1 ) * take : 0
    let where: any= {}
    if(filter){
      where.name = {
        startsWith: filter
      }
    }
    let brands = await this.client.brand.findMany({where, take, skip});
    return brands;
  }

  async findOne(id: string) {
    let brand = await this.client.brand.findUnique({ where: { id } });
    if (!brand) throw new BadRequestException('brand not found');
    return brand;
  }

  async update(id: string, data: UpdateBrandDto) {
    let brand = await this.client.brand.findUnique({ where: { id } });
    if (!brand) throw new BadRequestException('brand not found');
    let updated = await this.client.brand.update({
      where: { id },
      data: data,
    });
    return updated;
  }

  async remove(id: string) {
    let brand = await this.client.brand.findUnique({ where: { id } });
    if (!brand) throw new BadRequestException('brand not found');
    let deleted = await this.client.brand.delete({
      where: { id },
    });
    return deleted;
  }
}
