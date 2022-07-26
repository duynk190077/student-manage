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

  async updateOneMark(id: string, entity: StudentMark): Promise<boolean> {
    try {
      const studentMark = {
        ...entity,
        total: this.calcTotalMark(entity),
      };
      await this.updateOne(studentMark.id, studentMark);
      return true;
    } catch (err) {
      return false;
    }
  }

  async updateMany(studentMarks: StudentMark[]): Promise<boolean> {
    try {
      studentMarks.map(async (studentMark) => {
        studentMark = {
          ...studentMark,
          total: this.calcTotalMark(studentMark),
        };
        await this.updateOne(studentMark.id, studentMark);
      });
      return true;
    } catch (err) {
      return false;
    }
  }

  private calcTotalMark(studentMark: StudentMark): number {
    let total: number = 0;
    let num: number = 0;
    num +=
      studentMark.factor1.length +
      studentMark.factor2.length +
      studentMark.factor3.length;
    for (let i = 0; i < studentMark.factor1.length; i++)
      total += studentMark.factor1[i];
    for (let i = 0; i < studentMark.factor2.length; i++)
      total += studentMark.factor2[i];
    for (let i = 0; i < studentMark.factor3.length; i++)
      total += studentMark.factor3[i];
    if (num > 0) total = total / num;
    return total;
  }
}
