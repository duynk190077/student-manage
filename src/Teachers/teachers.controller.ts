import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { BaseController } from 'src/base/base.controller';
import { storage } from 'src/shared/storage';

import { Teacher } from './teacher.model';
import { TeachersService } from './teachers.service';
const fs = require('fs');
import { join } from 'path';

@Controller('teachers')

export class TeachersController extends BaseController<Teacher> {
  constructor(private readonly teacherService: TeachersService) {
    super(teacherService);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findManyBySubject(
    @Query('_v') v: string,
    @Query('subject') subject: string,
  ): Promise<any> {
    if (v === 'filter')
      return await this.teacherService.findManyBySubject(subject);
    return await this.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() teacher: Teacher): Promise<any> {
    return await this.teacherService.createTeacher(teacher);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(id: string): Promise<Teacher> {
    return await this.teacherService.findOne(id);
  }

  @Get('avatar/:imagename')
  async getAvatar(@Param('imagename') imagename: string, @Res() res) {
    return res.sendFile(join(process.cwd(), 'uploads/avatars/' + imagename));
  }

  @UseGuards(JwtAuthGuard)
  @Get('/student-mark/:id')
  async findStudentMarks(
    @Param('id') id: string,
    @Query('semester') semester: string,
  ) {
    return await this.teacherService.findMarks(semester, id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('upload')
  @UseInterceptors(FileInterceptor('file', storage))
  async uploadImg(@UploadedFile() file, @Req() request): Promise<Object> {
    return await this.teacherService.updateImg(request.user.id, file.filename);
  }

  @Delete('/avatar/:imagename')
  async deleteAvatar(@Param('imagename') imagename: string): Promise<any> {
    await fs.unlink(`uploads/avatars/${imagename}`, (err) => {
      if (err) return err;
      return true;
    });
  }
}
