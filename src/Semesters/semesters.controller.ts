import { Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { hasRole } from 'src/auth/decorators/role.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { BaseController } from 'src/base/base.controller';
import { Semester } from './semester.model';
import { SemestersService } from './semesters.service';

@Controller('semesters')
@UseGuards(JwtAuthGuard)
export class SemestersController extends BaseController<Semester> {
  constructor(private readonly semesterService: SemestersService) {
    super(semesterService);
  }

  @Get('/get-current')
  async findSemesterCurrent(): Promise<any> {
    return await this.semesterService.getSemesterCurrent();
  }

  @Get('/get-result/:semester')
  async findSemesterResult(@Param('semester') semester: string): Promise<any> {
    return await this.semesterService.semesterResult(semester);
  }

  @Post('/start')
  @hasRole('Admin')
  async startNewSemester(): Promise<any> {
    return await this.semesterService.semesterStart();
  }

  @Get('/analytics/:semester')
  @hasRole('Admin')
  async GetSemesterAnalytics(
    @Param('semester') semester: string,
  ): Promise<any> {
    return await this.semesterService.semesterAnalytics(semester);
  }
}
