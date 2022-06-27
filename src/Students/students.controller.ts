import { Controller, Delete, Get, Param, Post, Req, Res, StreamableFile, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { BaseController } from 'src/base/base.controller';
import { Student } from './student.model';
import { StudentsService } from './students.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { storage } from 'src/shared/storage';
const fs = require('fs');
import { join } from 'path';

@Controller('students')
export class StudentsController extends BaseController<Student> {
  constructor(private readonly studentService: StudentsService) {
    super(studentService);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Student> {
    return await this.studentService.findOneById(id);
  }

  @Get()
  async findAll(): Promise<Student[]> {
    return await this.studentService.findAllStudent();
  }

  @Get('avatar/:imagename')
  async getAvatar(@Param('imagename') imagename: string, @Res() res) {
    return res.sendFile(join(process.cwd(), 'uploads/avatars/' + imagename));
  }

  @UseGuards(JwtAuthGuard)  
  @Post('upload')
  @UseInterceptors(FileInterceptor('file', storage))
  async uploadImg(@UploadedFile() file, @Req() request): Promise<Object> {
    return await this.studentService.updateImg(request.user.id, file.filename)
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/avatar/:imagename')
  async deleteAvatar(@Param('imagename') imagename: string): Promise<any> {
    await fs.unlink(`uploads/avatars/${imagename}`, (err) => {
      if (err) return err;
      return true; 
    })
  }
}
