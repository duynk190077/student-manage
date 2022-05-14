import { Controller } from '@nestjs/common';

import { BaseController } from 'src/base/base.controller';
import { Classroom } from './classroom.model';
import { ClassroomsService } from './classrooms.service';

@Controller('classrooms')
export class ClassroomsController extends BaseController<Classroom> {
  constructor(private classroomService: ClassroomsService) {
    super(classroomService);
  }
}
