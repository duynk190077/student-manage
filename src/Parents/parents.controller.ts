import { Controller } from '@nestjs/common';

import { BaseController } from 'src/base/base.controller';
import { Parent } from './parent.model';
import { ParentsService } from './parents.service';

@Controller('parents')
export class ParentsController extends BaseController<Parent> {
  constructor(private readonly parentService: ParentsService) {
    super(parentService);
  }
}
