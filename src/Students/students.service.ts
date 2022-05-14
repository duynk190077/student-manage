import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { BaseService } from 'src/base/base.service';
import { Student, StudentDocument } from './student.model';

@Injectable()
export class StudentsService extends BaseService<Student> {
  constructor(
    @InjectModel('Student') private studentModel: Model<StudentDocument>,
  ) {
    super(studentModel);
  }
}
