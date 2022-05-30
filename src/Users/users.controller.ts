import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { hasRole } from 'src/auth/decorators/role.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles-guard';
import { BaseController } from 'src/base/base.controller';

import { User } from './user.model';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController extends BaseController<User> {
  constructor(private readonly userService: UsersService) {
    super(userService);
  }

  @Post('login')
  async login(
    @Body('username') username: string,
    @Body('password') password: string,
    @Body('role') role: string,
  ): Promise<Object> {
    return await this.userService.login(username, password, role);
  }

  @Put(':id/changePassword')
  async changePassword(
    @Param('id') id: string,
    @Body('oldPassword') oldPassword: string,
    @Body('newPassword') newPassword: string,
  ): Promise<Object> {
    return await this.userService.changePassword(id, oldPassword, newPassword);
  }

  @Post('logout')
  async logout(@Body('id') id: string,): Promise<Object> {
    return await this.userService.logout(id);
  }
}
