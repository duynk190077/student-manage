import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseService } from 'src/base/base.service';
import { TimeTable, TimeTableDocument } from './Timetable.model';

@Injectable()
export class TimetablesService extends BaseService<TimeTable> {
    constructor (@InjectModel('TimeTable') private timeTableModel: Model<TimeTableDocument>) {
        super(timeTableModel);
    }
}
