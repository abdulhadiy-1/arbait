import { BadRequestException, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { PrismaService } from 'src/prisma/prisma.service';
@Injectable()
export class UserService {
  constructor(private client: PrismaService) {}
  async findAll() {
    let users = await this.client.user.findMany();
    return users;
  }

  async findOne(id: string) {
    let user = await this.client.user.findUnique({ where: { id } });
    if (!user) throw new BadRequestException('user not found');
    return user;
  }

  async remove(id: string) {
    let user = await this.client.user.findUnique({ where: { id } });
    if (!user) throw new BadRequestException('user not found');
    let deleted = await this.client.user.delete({ where: { id } });
    return deleted;
  }

  async session(req: Request) {
    let userId = req['user-id'];
    if (!userId) throw new BadRequestException('user not found');
    let sessions = await this.client.session.findMany({ where: { userId } });
    return sessions;
  }

  async me(req: Request) {
    let userId = req['user-id'];
    let ip = req.ip || "::1"
    let session = await this.client.session.findFirst({ where: { userId, ip } });
    if (!session) throw new BadRequestException('session not found');
    let user = await this.client.user.findUnique({where: {id: userId}})
    if (!user) throw new BadRequestException('user not found');
    return user
  }

  async deleteSession(req: Request, id: string) {
    let userId = req['user-id'];
    if (!userId) throw new BadRequestException('user not found');
    let session = await this.client.session.findFirst({
      where: { id, userId },
    });
    if (!session) throw new BadRequestException('session not found');
    let deleted = await this.client.session.delete({ where: { id } });
    return deleted;
  }
}
