import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseService } from 'src/base/base.service';
import { Semester, SemesterDocument } from './semester.model';

@Injectable()
export class SemestersService extends BaseService<Semester> {
  constructor(
    @InjectModel('Semester') private semesterModel: Model<SemesterDocument>,
  ) {
    super(semesterModel);
  }

  async getSemesterCurrent(): Promise<any> {
    const semester = await this.semesterModel
      .findOne({})
      .sort({ createdAt: 1 });
    return await this.getSemesterRespone(semester);
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
}
