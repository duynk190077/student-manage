import { Controller } from '@nestjs/common';
import { BaseController } from 'src/base/base.controller';
import { TimeTable } from './Timetable.model';
import { TimetablesService } from './timetables.service';

@Controller('timetables')
export class TimetablesController extends BaseController<TimeTable> {
    constructor (private timeTableService: TimetablesService) {
        super(timeTableService);
    }
}
