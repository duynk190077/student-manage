import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseService } from 'src/base/base.service';
import { StudentMark, StudentMarkDocument } from './student_mark.model';

@Injectable()
export class StudentMarksService extends BaseService<StudentMark> {
    constructor (@InjectModel('Student_mark') private studentMarkModel: Model<StudentMarkDocument>) {
        super(studentMarkModel);
    }
}
