import { Body, Controller, Get, Param, Put, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { BaseController } from 'src/base/base.controller';
import { StudentMark } from './student_mark.model';
import { StudentMarksService } from './student_marks.service';

@Controller('student-marks')
export class StudentMarksController extends BaseController<StudentMark>{
    constructor (private readonly studentMarkService: StudentMarksService) {
        super(studentMarkService);
    }

    @UseGuards(JwtAuthGuard)
    @Get('/student/:id')
    async findByStudentId(@Param('id') id: string, @Query('semester') semester: string): Promise<StudentMark[]> {
        return await this.studentMarkService.findAllByStudentId(semester, id);
    }

    @UseGuards(JwtAuthGuard)
    @Put('/update-many')
    async updateMany(@Body() studentMarks: StudentMark[]): Promise<boolean> {
        return await this.studentMarkService.updateMany(studentMarks);
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id')
    async updateOne(@Param('id') id: string, @Body() studentMark: StudentMark): Promise<boolean> {
        return await this.studentMarkService.updateOne(id, studentMark);
    }
}
