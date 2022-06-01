import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseService } from 'src/base/base.service';
import { Teacher, TeacherDocument } from './teacher.model';

@Injectable()
export class TeachersService extends BaseService<Teacher> {
  constructor(
    @InjectModel('Teacher') private teacherModel: Model<TeacherDocument>,
  ) {
    super(teacherModel);
  }

  async findOneByUserId(userId: string): Promise<Teacher> {
    return this.teacherRespone(await this.teacherModel.findOne({ user: userId}));
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
