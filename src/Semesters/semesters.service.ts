import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseService } from 'src/base/base.service';
import { StudentsService } from 'src/Students/students.service';
import { StudentMarksService } from 'src/Student_marks/student_marks.service';
import { TeachersService } from 'src/Teachers/teachers.service';
import { Semester, SemesterDocument } from './semester.model';

@Injectable()
export class SemestersService extends BaseService<Semester> {
  constructor(
    @InjectModel('Semester') private semesterModel: Model<SemesterDocument>,
    private studentService: StudentsService,
    private teacherService: TeachersService,
    private studentMarkService: StudentMarksService,
  ) {
    super(semesterModel);
  }

  async getSemesterCurrent(): Promise<any> {
    const semester = await this.semesterModel
      .findOne({})
      .sort({ createdAt: 1 });
    return await this.getSemesterRespone(semester);
  }

  async semesterAnalytics(semester: string): Promise<any> {
    const studentAnalytics = await this.studentService.countDocumentAnalytic();
    const totalTeacher = await this.teacherService.countDocumentAnalytic();
    return {
      ...studentAnalytics,
      totalTeacher,
    };
  }

  async semesterResult(semester: string): Promise<any> {}

  private async getSemesterRespone(semester: Semester): Promise<any> {
    const startedDate = this.getFirstDayofWeek(semester.createdAt);
    const nowDate = this.getFirstDayofWeek(new Date());
    const different = nowDate.getTime() - startedDate.getTime();
    const week = 1 + Math.ceil(different / (1000 * 3600 * 24 * 7));
    const { _id, createdAt, updatedAt, ...result } = JSON.parse(
      JSON.stringify(semester),
    );
    return {
      id: _id,
      ...result,
      week: week,
    };
  }

  private getFirstDayofWeek(date: Date): Date {
    const dayBefore = [6, 0, 1, 2, 3, 4, 5];
    const dayDate = date.getDay();
    return new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate() - dayBefore[dayDate],
    );
  }
}
