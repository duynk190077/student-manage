import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseService } from 'src/base/base.service';
import { User } from 'src/Users/user.model';
import { UsersService } from 'src/Users/users.service';
import { Teacher, TeacherDocument } from './teacher.model';

@Injectable()
export class TeachersService extends BaseService<Teacher> {
  constructor(
    @InjectModel('Teacher') private teacherModel: Model<TeacherDocument>,
    @Inject(forwardRef(() => UsersService)) private userService: UsersService,
  ) {
    super(teacherModel);
  }

  async createTeacher(entity: Teacher): Promise<any> {
    try {
      const newUser: User = {
        username: entity.phoneNumber,
        password: entity.phoneNumber,
        roles: 'Teacher',
      };
      const id = await this.userService.create(newUser);
      const newTeacher = {
        ...entity,
        user: id,
      };
      const result = await this.create(newTeacher);
      return result;
    } catch (err) {
      return false;
    }
  }

  async findOneByUserId(userId: string): Promise<Teacher> {
    return this.teacherRespone(
      await this.teacherModel.findOne({ user: userId }),
    );
  }

  async findManyBySubject(subject: string): Promise<any> {
    const teachers = await this.teacherModel.find({ subject: subject });
    return Promise.all(
      teachers.map((teacher) => {
        const { _id, ...result } = JSON.parse(JSON.stringify(teacher));
        return {
          id: _id,
          ...result,
        };
      }),
    );
  }

  private async teacherRespone(teacher: Teacher): Promise<any> {
    return {
      id: teacher.id,
      firstName: teacher.firstName,
      lastName: teacher.lastName,
      gender: teacher.gender,
      dateofBirth: teacher.dateofBirth,
      phoneNumber: teacher.phoneNumber,
      email: teacher.email,
      subject: teacher.subject,
      image: teacher.image,
    };
  }
}
