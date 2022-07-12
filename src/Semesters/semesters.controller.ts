import { Controller, Get } from '@nestjs/common';
import { BaseController } from 'src/base/base.controller';
import { Semester } from './semester.model';
import { SemestersService } from './semesters.service';

@Controller('semesters')
export class SemestersController extends BaseController<Semester> {
  constructor(private readonly semesterService: SemestersService) {
    super(semesterService);
  }

  @Get('/get-current')
  async findSemesterCurrent(): Promise<any> {
    return await this.semesterService.getSemesterCurrent();
  }
}
