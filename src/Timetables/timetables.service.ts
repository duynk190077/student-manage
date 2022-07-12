import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseService } from 'src/base/base.service';
import { Classroom } from 'src/Classrooms/classroom.model';
import { TeachersService } from 'src/Teachers/teachers.service';
import { TeachingService } from 'src/Teachings/teaching.service';
import { TimeTable, TimeTableDocument } from './Timetable.model';

@Injectable()
export class TimetablesService extends BaseService<TimeTable> {
  constructor(
    @InjectModel('TimeTable') private timeTableModel: Model<TimeTableDocument>,
    private teachingService: TeachingService,
    private teacherService: TeachersService,
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
      class: { $regex: classGroup, $options: 'i' },
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

  async filterBySemesterAndClass(
    semester: string,
    week: string,
    className: string,
  ): Promise<TimeTable> {
    const timetable = await this.timeTableModel.findOne({
      semester: semester,
      week: week,
      class: className,
    });
    const { _id, ...result } = JSON.parse(JSON.stringify(timetable));
    return {
      id: _id,
      ...result,
    };
  }

  async findBySemesterAndWeek(
    semester: string,
    week: string,
    classrooms: string[],
    type: string,
  ): Promise<TimeTable[]> {
    return await this.timeTableModel.find({
      semester: semester,
      week: week,
      type: type,
      class: { $in: classrooms },
    });
  }

  async findForTeacher(
    semester: string,
    week: string,
    teacherId: string,
    type: string,
  ): Promise<any> {
    const teachings = await this.teachingService.teachingofTeacher(teacherId);
    const classrooms = teachings.map((p) => p.class);
    const timetables = await this.findBySemesterAndWeek(
      semester,
      week,
      classrooms,
      type,
    );
    const teacher = await this.teacherService.findOne(teacherId);
    interface resultFormat {
      semester: string;
      week: string;
      monday: string[];
      tusday: string[];
      wednesday: string[];
      thursday: string[];
      friday: string[];
      saturday: string[];
    }
    let result: resultFormat = {
      semester: semester,
      week: week,
      monday: ['', '', '', '', ''],
      tusday: ['', '', '', '', ''],
      wednesday: ['', '', '', '', ''],
      thursday: ['', '', '', '', ''],
      friday: ['', '', '', '', ''],
      saturday: ['', '', '', '', ''],
    };
    timetables.map((p) => {
      let index;
      index = p.monday.findIndex((subject) => subject === teacher.subject);
      if (index !== -1) result.monday[index] = p.class;
      index = p.tusday.findIndex((subject) => subject === teacher.subject);
      if (index !== -1) result.tusday[index] = p.class;
      index = p.thursday.findIndex((subject) => subject === teacher.subject);
      if (index !== -1) result.thursday[index] = p.class;
      index = p.wednesday.findIndex((subject) => subject === teacher.subject);
      if (index !== -1) result.wednesday[index] = p.class;
      index = p.friday.findIndex((subject) => subject === teacher.subject);
      if (index !== -1) result.friday[index] = p.class;
      index = p.saturday.findIndex((subject) => subject === teacher.subject);
      if (index !== -1) result.saturday[index] = p.class;
    });
    console.log(result);
    return result;
  }
}
