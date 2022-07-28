import { Body, Controller, Get, Param, UseGuards } from '@nestjs/common';
import { hasRole } from 'src/auth/decorators/role.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles-guard';

import { BaseController } from 'src/base/base.controller';
import { Classroom } from './classroom.model';
import { ClassroomsService } from './classrooms.service';

@Controller('classrooms')
@hasRole('Admin')
@UseGuards(JwtAuthGuard)
export class ClassroomsController extends BaseController<Classroom> {
  constructor(private classroomService: ClassroomsService) {
    super(classroomService);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Classroom> {
    return await this.classroomService.getClassInfo(id);
  }

  @Get()
  async findAll(): Promise<Classroom[]> {
    return await this.classroomService.findAllClassroom();
  }
}
