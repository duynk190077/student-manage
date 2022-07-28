import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseService } from 'src/base/base.service';
import { StudentsService } from 'src/Students/students.service';
import { StudentMark } from 'src/Student_marks/student_mark.model';
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
      .sort({ createdAt: -1 });
    return await this.getSemesterRespone(semester);
  }

  async semesterAnalytics(semester: string): Promise<any> {
    const currentSemester = await this.getSemesterCurrent();
    const studentAnalytics = await this.studentService.countDocumentAnalytic();
    const totalTeacher = await this.teacherService.countDocumentAnalytic();
    if (currentSemester.status === 'Kết thúc') {
      const semesterResult = await this.semesterResult(semester);
      return {
        ...studentAnalytics,
        totalTeacher,
        ...semesterResult,
      };
    }
    return {
      ...studentAnalytics,
      totalTeacher,
    };
  }

  async semesterStart(): Promise<any> {
    try {
      const currentSemester = await this.getSemesterCurrent();
      if (currentSemester.status === 'Đang diễn ra') return false;
      const newSemester = await this.getNewSemester(currentSemester.name);
      const result = await this.create({
        name: newSemester,
        status: 'Đang diễn ra',
      });
      if (result === false) return false;
      const resutl1 = await this.studentMarkService.createDefaultMarkForAll(
        newSemester,
      );
      if (resutl1 === false) return false;
      return result;
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  async semesterResult(semester: string): Promise<any> {
    await this.semesterModel.findOneAndUpdate(
      { name: semester },
      { status: 'Kết thúc' },
    );
    const students = await this.studentService.findAll();
    let excellentStudent: number = 0;
    let goodStudent: number = 0;
    for (let i = 0; i < students.length; i++) {
      const studentMarks = await this.studentMarkService.findAllByStudentId(
        semester,
        students[i].id,
      );
      if (this.checkExcellentStudent(studentMarks)) excellentStudent += 1;
      else goodStudent += 1;
    }
    return {
      excellentStudent,
      goodStudent,
    };
  }

  private getNewSemester(currentSemester: string): string {
    let yearSemester = +currentSemester.substr(0, 4);
    let semesterSemester = currentSemester.substr(4, 1);
    console.log(yearSemester, semesterSemester);
    if (semesterSemester === '2') {
      yearSemester += 1;
      semesterSemester = '1';
    } else semesterSemester = '2';
    return yearSemester.toString() + semesterSemester;
  }

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

  private checkExcellentStudent(studentMarks: StudentMark[]): boolean {
    if (studentMarks.length === 0) return false;
    let total: number = 0;
    for (let i = 0; i < studentMarks.length; i++) {
      if (studentMarks[i].total < 6.5) return false;
      total += studentMarks[i].total;
    }
    if (total / studentMarks.length < 8) return false;
    return true;
  }
}
