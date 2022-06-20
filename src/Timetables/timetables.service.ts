import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseService } from 'src/base/base.service';
import { TimeTable, TimeTableDocument } from './Timetable.model';

@Injectable()
export class TimetablesService extends BaseService<TimeTable> {
  constructor(
    @InjectModel('TimeTable') private timeTableModel: Model<TimeTableDocument>,
  ) {
    super(timeTableModel);
  }

  async filterBySemesterAndWeek(
    semester: string,
    week: string,
    classGroup: string,
  ): Promise<any[]> {
    const timetables = await this.timeTableModel.find({
      semester: semester,
      week: week,
      class: { $regex: classGroup, $options: "i" }
    });
    return Promise.all(
      timetables.map((p) => {
        const { _id, ...result } = JSON.parse(JSON.stringify(p));
        return {
          id: _id,
          ...result,
        };
      }),
    );
  }
}
