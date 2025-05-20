import {
  Controller,
  Get,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Request } from 'express';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get('sessions')
  session(@Req() req: Request) {
    return this.userService.session(req);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }

    @Delete('session/:id')
  deleteSession(@Param('id') id: string, @Req() req: Request) {
    return this.userService.deleteSession(req, id);
  }
}
