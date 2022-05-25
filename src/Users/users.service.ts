import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { AuthService } from 'src/auth/auth.service';
import { BaseService } from 'src/base/base.service';
import { User, UserDocument } from './user.model';

@Injectable()
export class UsersService extends BaseService<User> {
  constructor(
    @InjectModel('User') private userModel: Model<UserDocument>,
    private authService: AuthService,
  ) {
    super(userModel);
  }

  async login(
    username: string,
    password: string,
    role: string,
  ): Promise<Object> {
    const user = await this.validateUser(username, password);
    if (!user || role !== user.roles)
      return { error: 'User or password is incorrect' };
    return {
      id: user.id,
      access_token: await this.authService.generatorJWT(
        await this.userRespone(user),
      ),
    };
  }

  async validateUser(username: string, password: string): Promise<User> {
    const user = await this.userModel.findOne({ username: username });
    if (!user) return;
    if (await this.authService.comparePassword(password, user.password))
      return user;
    else return;
  }

  async changePassword(
    id: string,
    oldPassword: string,
    newPassword: string,
  ): Promise<Object> {
    const user = await this.findOne(id);
    if (!(await this.authService.comparePassword(oldPassword, user.password)))
      return { error: 'OldPassword is incorrect' };
    newPassword = await this.authService.hashPassword(newPassword);
    const result = await this.userModel.findByIdAndUpdate(
      id,
      { password: newPassword },
      { new: true },
    );
    return this.userRespone(result);
  }

  private async userRespone(user: User): Promise<any> {
    return {
      id: user.id,
      username: user.username,
    };
  }
}
