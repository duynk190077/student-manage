import { Controller, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

import { BaseController } from 'src/base/base.controller';
import { Parent } from './parent.model';
import { ParentsService } from './parents.service';

@Controller('parents')
@UseGuards(JwtAuthGuard)
export class ParentsController extends BaseController<Parent> {
  constructor(private readonly parentService: ParentsService) {
    super(parentService);
  }
}
