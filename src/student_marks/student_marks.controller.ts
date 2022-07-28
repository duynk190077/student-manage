import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { hasRole } from 'src/auth/decorators/role.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { BaseController } from 'src/base/base.controller';
import { StudentMark } from './student_mark.model';
import { StudentMarksService } from './student_marks.service';

@Controller('student-marks')
@UseGuards(JwtAuthGuard)
export class StudentMarksController extends BaseController<StudentMark> {
  constructor(private readonly studentMarkService: StudentMarksService) {
    super(studentMarkService);
  }

  @Get('/student/:id')
  async findByStudentId(
    @Param('id') id: string,
    @Query('semester') semester: string,
  ): Promise<StudentMark[]> {
    return await this.studentMarkService.findAllByStudentId(semester, id);
  }

  @Put('/update-many')
  @hasRole('Admin', 'Teacher')
  async updateMany(@Body() studentMarks: StudentMark[]): Promise<boolean> {
    return await this.studentMarkService.updateMany(studentMarks);
  }

  @Put(':id')
  @hasRole('Admin', 'Teacher')
  async updateOne(
    @Param('id') id: string,
    @Body() studentMark: StudentMark,
  ): Promise<boolean> {
    return await this.studentMarkService.updateOneMark(id, studentMark);
  }

  @Delete('/delete-many/:semester')
  @hasRole('Admin')
  async deleteMany(@Param('semester') semester: string): Promise<boolean> {
    return await this.studentMarkService.deleteMany(semester);
  }
}
