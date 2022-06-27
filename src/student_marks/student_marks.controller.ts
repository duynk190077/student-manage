import { Controller } from '@nestjs/common';
import { BaseController } from 'src/base/base.controller';
import { StudentMark } from './student_mark.model';
import { StudentMarksService } from './student_marks.service';

@Controller('student-marks')
export class StudentMarksController extends BaseController<StudentMark>{
    constructor (private readonly studentMarkService: StudentMarksService) {
        super(studentMarkService);
    }
}
