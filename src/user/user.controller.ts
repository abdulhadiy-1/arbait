import { Controller, Get, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { Request } from 'express';
import { AuthGuard } from 'src/auth-middleware/auth-middleware.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get('sessions')
  session(@Req() req: Request) {
    return this.userService.session(req);
  }

  @UseGuards(AuthGuard)
  @Get('me')
  me(@Req() req: Request) {
    return this.userService.me(req);
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
  @UseGuards(AuthGuard)
  deleteSession(@Param('id') id: string, @Req() req: Request) {
    return this.userService.deleteSession(req, id);
  }
}
