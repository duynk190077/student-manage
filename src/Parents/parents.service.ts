import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { BaseService } from 'src/base/base.service';
import { Parent, ParentDocument } from './parent.model';

@Injectable()
export class ParentsService extends BaseService<Parent> {
  constructor(
    @InjectModel('Parent') private parentModel: Model<ParentDocument>,
  ) {
    super(parentModel);
  }
}
