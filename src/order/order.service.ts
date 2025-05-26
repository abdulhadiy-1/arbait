import { BadRequestException, Injectable } from '@nestjs/common';

import { CreateOrderDto } from './dto/create-order.dto';

import { UpdateOrderDto } from './dto/update-order.dto';

import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) {}

  async create(createOrderDto: CreateOrderDto) {
    const { masters, tools, ...rest } = createOrderDto;

    const data: any = { ...rest };

    if (masters?.length) {
      const existingMasters = await this.prisma.master.findMany({
        where: { id: { in: masters } },

        select: { id: true },
      });

      const existingMasterIds = new Set(existingMasters.map((m) => m.id));

      const invalidMasters = masters.filter((id) => !existingMasterIds.has(id));

      if (invalidMasters.length > 0) {
        throw new BadRequestException(
          `Invalid master IDs: ${invalidMasters.join(', ')}`,
        );
      }

      data.masters = { connect: masters.map((id) => ({ id })) };
    }

    if (tools?.length) {
      const existingTools = await this.prisma.tool.findMany({
        where: { id: { in: tools } },

        select: { id: true },
      });

      const existingToolIds = new Set(existingTools.map((t) => t.id));

      const invalidTools = tools.filter((id) => !existingToolIds.has(id));

      if (invalidTools.length > 0) {
        throw new BadRequestException(
          `Invalid tool IDs: ${invalidTools.join(', ')}`,
        );
      }

      data.tools = { connect: tools.map((id) => ({ id })) };
    }

    const createdOrder = await this.prisma.order.create({
      data: { ...data, status: 'PENDING' },
    });

    return createdOrder;
  }

  async findAll() {
    return this.prisma.order.findMany({
      include: {
        masters: true,

        tools: true,
      },
    });
  }

  async findOne(id: string) {
    const order = await this.prisma.order.findUnique({
      where: { id },

      include: {
        masters: true,

        tools: true,
      },
    });

    if (!order) throw new BadRequestException('Order not found');

    return order;
  }

  async update(id: string, updateOrderDto: UpdateOrderDto) {
    const { masters, tools, ...rest } = updateOrderDto;

    const order = await this.prisma.order.findUnique({ where: { id } });
    if (!order) throw new BadRequestException('Order not found');

    const data: any = { ...rest };

    if (masters) {
      if (masters.length) {
        const existingMasters = await this.prisma.master.findMany({
          where: { id: { in: masters } },
          select: { id: true },
        });

        const existingMasterIds = new Set(existingMasters.map((m) => m.id));
        const invalidMasters = masters.filter(
          (id) => !existingMasterIds.has(id),
        );

        if (invalidMasters.length > 0) {
          throw new BadRequestException(
            `Invalid master IDs: ${invalidMasters.join(', ')}`,
          );
        }

        data.masters = { set: masters.map((id) => ({ id })) };
      } else {
        data.masters = { set: [] };
      }
    }

    if (tools) {
      if (tools.length) {
        const existingTools = await this.prisma.tool.findMany({
          where: { id: { in: tools } },
          select: { id: true },
        });

        const existingToolIds = new Set(existingTools.map((t) => t.id));
        const invalidTools = tools.filter((id) => !existingToolIds.has(id));

        if (invalidTools.length > 0) {
          throw new BadRequestException(
            `Invalid tool IDs: ${invalidTools.join(', ')}`,
          );
        }

        data.tools = { set: tools.map((id) => ({ id })) };
      } else {
        data.tools = { set: [] };
      }
    }

    const updatedOrder = await this.prisma.order.update({
      where: { id },
      data,
      include: {
        masters: true,
        tools: true,
      },
    });

    return updatedOrder;
  }
  async remove(id: string) {
    await this.prisma.order.delete({ where: { id } });

    return { message: 'Order deleted' };
  }
}
