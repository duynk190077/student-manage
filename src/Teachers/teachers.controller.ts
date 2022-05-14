import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { BaseController } from 'src/base/base.controller';

import { Teacher } from './teacher.model';
import { TeachersService } from './teachers.service';

@Controller('teachers')
export class TeachersController extends BaseController<Teacher> {
  constructor(private readonly teacherService: TeachersService) {
    super(teacherService);
  }
}
