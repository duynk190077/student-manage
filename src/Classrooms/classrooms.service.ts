import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { BaseService } from 'src/base/base.service';
import { Classroom, ClassroomDocument } from './classroom.model';

@Injectable()
export class ClassroomsService extends BaseService<Classroom> {
  constructor(
    @InjectModel('Classroom') private classroomModel: Model<ClassroomDocument>,
  ) {
    super(classroomModel);
  }
}
