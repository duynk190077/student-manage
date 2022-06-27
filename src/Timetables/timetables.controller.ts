import { Body, Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { BaseController } from 'src/base/base.controller';
import { TimeTable } from './Timetable.model';
import { TimetablesService } from './timetables.service';

@Controller('timetables')
export class TimetablesController extends BaseController<TimeTable> {
  constructor(private timeTableService: TimetablesService) {
    super(timeTableService);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findMany(
    @Query('_v') v: string,
    @Query('semester') semester: string,
    @Query('week') week: string,
    @Query('class-group') classGroup: string
  ): Promise<TimeTable[]> {
    if (v !== 'filter') return await this.timeTableService.findAll();
    else return this.timeTableService.filterBySemesterAndWeek(semester, week, classGroup);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/:className')
  async findByClass(
    @Param('className') className: string,
    @Body('semester') semester: string,
    @Body('week') week: string
  ): Promise<TimeTable> {
    return await this.timeTableService.filterBySemesterAndClass(semester, week, className);
  }
}
