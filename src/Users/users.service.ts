import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { AuthService } from 'src/auth/auth.service';
import { BaseService } from 'src/base/base.service';
import { StudentsService } from 'src/Students/students.service';
import { TeachersService } from 'src/Teachers/teachers.service';
import { UsersLoginService } from 'src/Users_login/users_login.service';
import { User, UserDocument } from './user.model';

@Injectable()
export class UsersService extends BaseService<User> {
  constructor(
    @InjectModel('User') private userModel: Model<UserDocument>,
    private authService: AuthService,
    private userLoginService: UsersLoginService,
    private studentService: StudentsService,
    private teacherService: TeachersService,
  ) {
    super(userModel);
  }

  async create(entity: User): Promise<any> {
    try {
      entity = {
        ...entity,
        password: await this.authService.hashPassword(entity.password),
      };
      const newUser = new this.userModel(entity);
      const result = await newUser.save();
      return result.id;
    } catch (error) {
      return false;
    }
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
      userId: user.id,
      accessToken: await this.authService.generatorJWT(
        await this.userRespone(user),
      ),
      userInfo: await this.userInfo(user.id, user.roles),
    };
  }

  async getUserInfo(user: any): Promise<Object> {
    const role = (await this.findOne(user.id)).roles;
    return {
      userId: user.id,
      userInfo: await this.userInfo(user.id, role),
      role: role,
    };
  }

  async logout(id: string): Promise<Object> {
    const user = await this.findOne(id);
    if (!user) return { error: 'User is not exist' };
    else return { status: 'Logout successfully' };
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

  private async userInfo(id: string, role: string): Promise<any> {
    switch (role) {
      case 'Student': {
        return await this.studentService.findOneByUserId(id);
      }
      case 'Teacher': {
        return await this.teacherService.findOneByUserId(id);
      }
      default: {
        return null;
      }
    }
  }
}
