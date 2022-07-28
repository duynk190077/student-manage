import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { BaseController } from 'src/base/base.controller';

import { User } from './user.model';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController extends BaseController<User> {
  constructor(private readonly userService: UsersService) {
    super(userService);
  }

  @UseGuards(JwtAuthGuard)
  @Get('user-info')
  async getUserInfo(@Req() request: Request): Promise<Object> {
    return await this.userService.getUserInfo(request.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(id: string): Promise<User> {
    return await this.userService.findOne(id);
  }

  @Post('login')
  async login(
    @Body('username') username: string,
    @Body('password') password: string,
    @Body('role') role: string,
  ): Promise<Object> {
    return await this.userService.login(username, password, role);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id/changePassword')
  async changePassword(
    @Param('id') id: string,
    @Body('oldPassword') oldPassword: string,
    @Body('newPassword') newPassword: string,
  ): Promise<Object> {
    return await this.userService.changePassword(id, oldPassword, newPassword);
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logout(@Body('id') id: string): Promise<Object> {
    return await this.userService.logout(id);
  }
}
