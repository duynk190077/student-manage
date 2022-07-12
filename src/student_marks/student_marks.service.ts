import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseService } from 'src/base/base.service';
import { StudentMark, StudentMarkDocument } from './student_mark.model';

@Injectable()
export class StudentMarksService extends BaseService<StudentMark> {
  constructor(
    @InjectModel('Student_mark')
    private studentMarkModel: Model<StudentMarkDocument>,
  ) {
    super(studentMarkModel);
  }

  async findByStudentId(
    semester: string,
    studentId: string,
    subject: string,
  ): Promise<StudentMark> {
    return await this.studentMarkModel.findOne({
      semester: semester,
      student: studentId,
      subject: subject,
    });
  }

  async findAllByStudentId(
    semester: string,
    studentId: string,
  ): Promise<StudentMark[]> {
    return await this.studentMarkModel.find({
      semester: semester,
      student: studentId,
    });
  }

  async updateMany(studentMarks: StudentMark[]): Promise<boolean> {
    try {
      studentMarks.map(async (studentMark) => {
        await this.updateOne(studentMark.id, studentMark);
      });
      return true;
    } catch (err) {
      return false;
    }
  }
}
