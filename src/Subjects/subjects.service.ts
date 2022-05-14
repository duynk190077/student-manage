import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { BaseService } from 'src/base/base.service';
import { Subject, SubjectDocument } from './subject.model';

@Injectable()
export class SubjectsService extends BaseService<Subject> {
  constructor(
    @InjectModel('Subject') private subjectModel: Model<SubjectDocument>,
  ) {
    super(subjectModel);
  }
}
