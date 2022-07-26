import { Module } from '@nestjs/common';
import { SemestersService } from './semesters.service';
import { SemestersController } from './semesters.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { SemesterSchema } from './semester.model';
import { StudentsModule } from 'src/Students/students.module';
import { TeachersModule } from 'src/Teachers/teachers.module';
import { StudentMarksModule } from 'src/Student_marks/student_marks.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Semester', schema: SemesterSchema }]),
    StudentsModule,
    TeachersModule,
    StudentMarksModule,
  ],
  providers: [SemestersService],
  controllers: [SemestersController],
  exports: [SemestersService],
})
export class SemestersModule {}
