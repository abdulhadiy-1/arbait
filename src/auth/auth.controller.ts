import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { LoginAuthDto } from './dto/update-auth.dto';
import { CreateCompanyDto } from './dto/create-auth.dto2';
import { ApiBody } from '@nestjs/swagger';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  create(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.create(createAuthDto);
  }

  @Post('register/company')
  createCompany(@Body() createCompanyDto: CreateCompanyDto) {
    return this.authService.createCompany(createCompanyDto);
  }

  @Post('send/otp')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        email: {
          type: 'string',
        },
      },
    },
  })
  sendOtp(@Body() data: { email: string }) {
    return this.authService.sendOtp(data.email);
  }

  @Post('verify')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        email: {
          type: 'string',
        },
        otp: {
          type: 'string',
        },
      },
    },
  })
  verify(@Body() data: { email: string; otp: string }) {
    return this.authService.verify(data.email, data.otp);
  }

  @Post('refresh/token')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        token: {
          type: 'string',
        },
      },
    },
  })
  refresh(@Body() data: { token: string }) {
    return this.authService.refresh(data.token);
  }

  @Post('login')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        email: {
          type: 'string',
        },
        password: {
          type: 'string',
        },
      },
    },
  })
  login(@Body() data: { email: string; password: string }, @Req() req: Request) {
    return this.authService.login(data.email, data.password, req);
  }
}
