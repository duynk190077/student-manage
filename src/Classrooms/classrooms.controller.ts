import { Controller, Get, Param } from '@nestjs/common';

import { BaseController } from 'src/base/base.controller';
import { Classroom } from './classroom.model';
import { ClassroomsService } from './classrooms.service';

@Controller('classrooms')
export class ClassroomsController extends BaseController<Classroom> {
  constructor(private classroomService: ClassroomsService) {
    super(classroomService);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Classroom> {
    return await this.classroomService.findOneClassroom(id);
  }

  @Get()
  async findAll(): Promise<Classroom[]> {
    return await this.classroomService.findAllClassroom();
  }
}
