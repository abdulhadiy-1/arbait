import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { LoginAuthDto } from './dto/update-auth.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { MailService } from 'src/mailer/mailer.service';
import { totp } from 'otplib';
import * as bcrypt from 'bcrypt';


totp.options = { digits: 5, step: 300 };

@Injectable()
export class AuthService {
  constructor(
    private client: PrismaService,
    private emailService: MailService,
  ) {}
  async create(createAuthDto: CreateAuthDto) {
    let user = await this.client.user.findMany({
      where: {
        OR: [{ email: createAuthDto.email }, { phone: createAuthDto.phone }],
      },
    });
    if (user.length > 0)
      throw new BadRequestException(
        'user with this email or phone alredy exists',
      );
    let district = await this.client.district.findUnique({
      where: { id: createAuthDto.districtId },
    });
    if (!district)
      throw new BadRequestException('district with this Id not found');
    let region = await this.client.region.findUnique({
      where: { id: createAuthDto.regionId },
    });
    if (!region) throw new BadRequestException('region with this Id not found');
    let otp = totp.generate(createAuthDto.email)
    await this.emailService.sendMail(createAuthDto.email, "one time password", `your one time password: ${otp}`)
    let hash = bcrypt.hashSync(createAuthDto.password, 10);
    let newUser = await this.client.user.create({data: {...createAuthDto, role: }})
    return;
  }
}