import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { LoginAuthDto } from './dto/update-auth.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { MailService } from 'src/mailer/mailer.service';
import { totp } from 'otplib';
import * as bcrypt from 'bcrypt';
import { CreateCompanyDto } from './dto/create-auth.dto2';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
totp.options = { digits: 5, step: 300 };
@Injectable()
export class AuthService {
  constructor(
    private client: PrismaService,
    private emailService: MailService,
    private jwt: JwtService,
  ) {}
  private async checkUserUniqueness(email: string, phone: string) {
    const user = await this.client.user.findMany({
      where: {
        OR: [{ email }, { phone }],
      },
    });
    if (user.length > 0) {
      throw new BadRequestException(
        'user with this email or phone already exists',
      );
    }
  }
  async create(createAuthDto: CreateAuthDto) {
    await this.checkUserUniqueness(createAuthDto.email, createAuthDto.phone);
    let district = await this.client.district.findUnique({
      where: { id: createAuthDto.districtId },
    });
    if (!district)
      throw new BadRequestException('district with this Id not found');
    let region = await this.client.region.findUnique({
      where: { id: createAuthDto.regionId },
    });
    if (!region) throw new BadRequestException('region with this Id not found');
    await this.sendOtp(createAuthDto.email);

    let hash = bcrypt.hashSync(createAuthDto.password, 10);
    let newUser = await this.client.user.create({
      data: {
        ...createAuthDto,
        password: hash,
        role: 'USER_FIZ',
        status: 'PANDING',
      },
    });
    return newUser;
  }
  async createCompany(data: CreateCompanyDto) {
    await this.checkUserUniqueness(data.email, data.phone);
    let region = await this.client.region.findUnique({
      where: { id: data.regionId },
    });
    if (!region) throw new BadRequestException('region with this Id not found');
    await this.sendOtp(data.email);
    let hash = bcrypt.hashSync(data.password, 10);
    let newUser = await this.client.user.create({
      data: {
        ...data,
        password: hash,
        role: 'USER_YUR',
        directorName: data.name,
        status: 'PANDING',
      },
    });
    return newUser;
  }
  async sendOtp(email: string) {
    let otp = totp.generate(email);
    try {
      await this.emailService.sendMail(
        email,
        'one time password',
        `your one time password: ${otp}`,
      );
      return { success: true };
    } catch (err) {
      throw new BadRequestException('Failed to send OTP email');
    }
  }
  async verify(email: string, otp: string) {
    let user = await this.client.user.findUnique({ where: { email } });
    if (!user) throw new BadRequestException('user not found');
    let match = totp.verify({ token: otp, secret: email });
    if (!match) throw new BadRequestException('wrong otp');
    await this.client.user.update({
      where: { email },
      data: { status: 'ACTIVE' },
    });
    return { success: true };
  }

  async refresh(token: string) {
    const payload = await this.jwt.verifyAsync(token, { secret: 'refresh' });
    let user = await this.client.user.findUnique({ where: { id: payload.id } });
    if (!user) throw new BadRequestException('user not found, or wrong token');
    let accessToken = this.jwt.sign({ id: user.id, role: user.role });
    return accessToken;
  }

  async login(email: string, password: string, req: Request) {
    let user = await this.client.user.findUnique({ where: { email } });
    if (!user) throw new BadRequestException('user not found');
    let match = bcrypt.compareSync(password, user.password);
    if (!match) throw new BadRequestException('wrong password');
    if (user.status !== 'ACTIVE') {
      throw new BadRequestException('account is not verified');
    }
    let ip = req.ip || '::1';
    let session = await this.client.session.findFirst({
      where: { userId: user.id, ip },
    });
    if (!session) {
      await this.client.session.create({
        data: {
          userId: user.id,
          ip,
          data: req.headers['user-agent'] || 'Unknown',
        },
      });
    }
    let refreshToken = this.jwt.sign(
      { id: user.id },
      { secret: 'refresh', expiresIn: '7d' },
    );
    let accessToken = this.jwt.sign({ id: user.id, role: user.role });
    return { accessToken, refreshToken };
  }
}
