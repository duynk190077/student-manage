import { Controller } from '@nestjs/common';

import { BaseController } from 'src/base/base.controller';
import { Student } from './student.model';
import { StudentsService } from './students.service';

@Controller('students')
export class StudentsController extends BaseController<Student> {
  constructor(private readonly studentService: StudentsService) {
    super(studentService);
  }
}
