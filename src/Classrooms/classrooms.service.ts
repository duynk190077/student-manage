import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { BaseService } from 'src/base/base.service';
import { TeachersService } from 'src/Teachers/teachers.service';
import { Classroom, ClassroomDocument } from './classroom.model';

@Injectable()
export class ClassroomsService extends BaseService<Classroom> {
  constructor(
    @InjectModel('Classroom') private classroomModel: Model<ClassroomDocument>,
    private teacherService: TeachersService,
  ) {
    super(classroomModel);
  }

  async findOneClassroom(id: string): Promise<Classroom> {
    return this.classroomRes(await this.findOne(id));
  }

  async findAllClassroom(): Promise<any[]> {
    const classrooms = await this.findAll();

    return Promise.all(
      classrooms.map(async (p) => {
        p = await this.classroomRes(p);
        return p;
      }),
    );
  }

  private async classroomRes(classroom: Classroom): Promise<any> {
    const { _id, ...result } = JSON.parse(JSON.stringify(classroom));
    const teacher = await this.teacherService.findOne(result.teacher);
    return {
      id: _id,
      name: result.name,
      teacher: {
        id: teacher.id,
        name: `${teacher.firstName} ${teacher.lastName}`,
      },
    };
  }
}
