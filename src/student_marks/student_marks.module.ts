import { forwardRef, Module } from '@nestjs/common';
import { StudentMarksService } from './student_marks.service';
import { StudentMarksController } from './student_marks.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { StudentMarkSchema } from './student_mark.model';
import { StudentsModule } from 'src/Students/students.module';
import { SubjectsModule } from 'src/Subjects/subjects.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Student_mark', schema: StudentMarkSchema },
    ]),
    forwardRef(() => StudentsModule),
    SubjectsModule,
  ],
  providers: [StudentMarksService],
  controllers: [StudentMarksController],
  exports: [StudentMarksService],
})
export class StudentMarksModule {}
