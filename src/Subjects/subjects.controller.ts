import { Controller, Body, UseGuards } from '@nestjs/common';
import { Subject } from 'src/Subjects/subject.model';
import { BaseController } from 'src/base/base.controller';
import { SubjectsService } from './subjects.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { hasRole } from 'src/auth/decorators/role.decorator';

@Controller('subjects')
@UseGuards(JwtAuthGuard)
@hasRole('Admin')
export class SubjectsController extends BaseController<Subject> {
  constructor(private subjectService: SubjectsService) {
    super(subjectService);
  }
}
