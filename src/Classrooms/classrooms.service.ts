import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { BaseService } from 'src/base/base.service';
import { StudentsService } from 'src/Students/students.service';
import { TeachersService } from 'src/Teachers/teachers.service';
import { Classroom, ClassroomDocument } from './classroom.model';

@Injectable()
export class ClassroomsService extends BaseService<Classroom> {
  constructor(
    @Inject(forwardRef(() => StudentsService))
    private studentService: StudentsService,
    @InjectModel('Classroom') private classroomModel: Model<ClassroomDocument>,
    private teacherService: TeachersService,
  ) {
    super(classroomModel);
  }

  async findOneClassroom(id: string): Promise<any> {
    const classroom = await this.classroomRes(await this.findOne(id));
    return classroom;
  }

  async findClassByName(classname: string): Promise<Classroom> {
    return await this.classroomModel.findOne({ name: classname });
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

  async getClassInfo(id: string): Promise<any> {
    const result = await this.classroomRes(await this.findOne(id));
    const studentInClass = await this.studentService.findManyByClass(id);
    return {
      ...result,
      students: studentInClass,
    };
  }

  private async classroomRes(classroom: Classroom): Promise<any> {
    const result = JSON.parse(JSON.stringify(classroom));
    const teacher = await this.teacherService.findOne(result.teacher);
    const totalStudent = await this.studentService.countDocumentByClass(
      result.id,
    );
    return {
      id: result.id,
      name: result.name,
      teacher: `${teacher.firstName} ${teacher.lastName}`,
      totalStudent: totalStudent,
    };
  }
}
