import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { BaseController } from 'src/base/base.controller';

import { Teacher } from './teacher.model';
import { TeachersService } from './teachers.service';

@Controller('teachers')
export class TeachersController extends BaseController<Teacher> {
  constructor(private readonly teacherService: TeachersService) {
    super(teacherService);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findManyBySubject (@Query('subject') subject: string): Promise<any> {
    return await this.teacherService.findManyBySubject(subject);
  }

  @Post()
  async create(@Body() teacher: Teacher): Promise<any> {
    return await this.teacherService.createTeacher(teacher);
  }

  @Get(':id')
  async findOne(id: string): Promise<Teacher> {
    return await this.teacherService.findOne(id);
  }
}
