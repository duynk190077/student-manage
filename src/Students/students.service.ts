import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { BaseService } from 'src/base/base.service';
import { ClassroomsService } from 'src/Classrooms/classrooms.service';
import { ParentsService } from 'src/Parents/parents.service';
import { resourceLimits } from 'worker_threads';
import { Student, StudentDocument } from './student.model';

@Injectable()
export class StudentsService extends BaseService<Student> {
  constructor(
    @InjectModel('Student') private studentModel: Model<StudentDocument>,
    private classroomService: ClassroomsService,
    private parentService: ParentsService,
  ) {
    super(studentModel);
  }

  async findOneStudent(userId: string): Promise<Student> {
    return this.studentRes(await this.studentModel.findOne({ user: userId }));
  }

  async findAllStudent(): Promise<any[]> {
    const students = await this.findAll();
    return Promise.all(students.map(async (p) => await this.studentRes(p)));
  }

  private async studentRes(student: Student): Promise<any> {
    const { _id, ...result } = JSON.parse(JSON.stringify(student));
    const parents = await Promise.all(
      result.parents.map(async (p) => await this.parentService.findOne(p)),
    );
    const classroom = await this.classroomService.findOneClassroom(
      result.class,
    );
    return {
      id: _id,
      ...result,
      parents: parents,
      class: classroom,
    };
  }
}
