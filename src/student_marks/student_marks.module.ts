import { Module } from '@nestjs/common';
import { StudentMarksService } from './student_marks.service';
import { StudentMarksController } from './student_marks.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { StudentMarkSchema } from './student_mark.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Student_mark', schema: StudentMarkSchema },
    ]),
  ],
  providers: [StudentMarksService],
  controllers: [StudentMarksController],
  exports: [StudentMarksService],
})
export class StudentMarksModule {}
