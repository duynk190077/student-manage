import { Controller, Body } from '@nestjs/common';
import { Subject } from 'src/Subjects/subject.model';
import { BaseController } from 'src/base/base.controller';
import { SubjectsService } from './subjects.service';

@Controller('subjects')
export class SubjectsController extends BaseController<Subject> {
  constructor(private subjectService: SubjectsService) {
    super(subjectService);
  }
}
