import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseService } from 'src/base/base.service';
import { TeachersService } from 'src/Teachers/teachers.service';
import { Teaching, TeachingDocument } from './teaching.model';

@Injectable()
export class TeachingService extends BaseService<Teaching> {
  constructor(
    @InjectModel('Teaching') private teachingModel: Model<TeachingDocument>,
    private teacherService: TeachersService,
  ) {
    super(teachingModel);
  }

  async teachingofClass(className: string): Promise<any> {
    const result = await this.teachingModel.find({ class: className });
    return Promise.all(result.map(async (p) => await this.teachingRespone(p)));
  }

  async teachingofTeacher(teacherId: string): Promise<Teaching[]> {
    return await this.teachingModel.find({ teacher: teacherId })
  }

  private async teachingRespone(teaching: Teaching): Promise<any> {
    const { _id, ...result } = JSON.parse(JSON.stringify(teaching));
    const teacher = await this.teacherService.findOne(result.teacher);
    return {
      ...result,
      id: _id,
      teacher: `${teacher.firstName} ${teacher.lastName}`,
    };
  }
}
