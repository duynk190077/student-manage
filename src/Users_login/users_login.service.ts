import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseService } from 'src/base/base.service';

import { UserLogin, UserLoginDocument } from './user_login.model';

@Injectable()
export class UsersLoginService extends BaseService<UserLogin> {
  constructor(
    @InjectModel('UserLogin') private userLoginModule: Model<UserLoginDocument>,
  ) {
    super(userLoginModule);
  }

  async findOneByUserId(userId: string): Promise<UserLogin> {
    return await this.userLoginModule.findOne({ userId: userId });
  }

  async deleteOneByUserId(userId: string): Promise<boolean> {
    try {
      await this.userLoginModule.deleteOne({ userId: userId });
      return true;
    } catch (err) {
      return false;
    }
  }
}
