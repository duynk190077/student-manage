import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { AuthService } from 'src/auth/auth.service';
import { BaseService } from 'src/base/base.service';
import { UsersLoginService } from 'src/Users_login/users_login.service';
import { User, UserDocument } from './user.model';

@Injectable()
export class UsersService extends BaseService<User> {
  constructor(
    @InjectModel('User') private userModel: Model<UserDocument>,
    private authService: AuthService,
    private userLoginService: UsersLoginService
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
    const result = await this.userLoginService.create({userId: user.id});
    if (result === true)
    return {
      id: user.id,
      access_token: await this.authService.generatorJWT(
        await this.userRespone(user),
      ),
    };
    else return { error: 'Cannot login' }
  }

  async logout(id: string): Promise<Object> {
    const user = await this.findOne(id);
    if (!user) return { error: 'User is not exist'}
    const userLogin = await this.userLoginService.findOneByUserId(id);
    if (!userLogin) return { error: 'User is not login' }
    const result = await this.userLoginService.delete(userLogin.id);
    if (result === true)
      return {status: 'Logout successfully'};
    else return { status: 'Cannot logout'}; 
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
  ): Promise<boolean> {
    try {
      const user = await this.findOne(id);
      if (!(await this.authService.comparePassword(oldPassword, user.password)))
        return false;
      newPassword = await this.authService.hashPassword(newPassword);
      await this.userModel.findByIdAndUpdate(
        id,
        { password: newPassword },
        { new: true },
      );
      return true;
    } catch (err) {
      return false;
    }
  }

  private async userRespone(user: User): Promise<any> {
    return {
      id: user.id,
      username: user.username,
    };
  }
}
