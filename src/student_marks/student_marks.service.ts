import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseService } from 'src/base/base.service';
import { StudentsService } from 'src/Students/students.service';
import { SubjectsService } from 'src/Subjects/subjects.service';
import { StudentMark, StudentMarkDocument } from './student_mark.model';

@Injectable()
export class StudentMarksService extends BaseService<StudentMark> {
  constructor(
    @InjectModel('Student_mark')
    private studentMarkModel: Model<StudentMarkDocument>,
    @Inject(forwardRef(() => StudentsService))
    private studentService: StudentsService,
    private subjectService: SubjectsService,
  ) {
    super(studentMarkModel);
  }

  async createDefaultMarkForAll(semester: string): Promise<any> {
    try {
      const students = await this.studentService.findAll();
      const subjects = await this.subjectService.findAll();
      console.log(students, subjects);
      return Promise.all(
        students.map(async (student) => {
          return Promise.all(
            subjects.map(async (subject) => {
              const defaultMark: StudentMark = {
                semester: semester,
                student: student.id,
                subject: subject.name,
                factor1: [null, null, null, null, null],
                factor2: [null, null, null, null, null],
                factor3: [null, null, null, null, null],
                total: 0,
              };
              console.log(defaultMark);
              return await this.create(defaultMark);
            }),
          );
        }),
      );
    } catch (err) {
      console.log(err);
    }
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

  async deleteMany(semester: string): Promise<boolean> {
    try {
      console.log(semester);
      await this.studentMarkModel.deleteMany({ semester: semester });
      return true;
    } catch (err) {
      console.log(err);
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
