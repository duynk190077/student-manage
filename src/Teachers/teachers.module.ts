import { forwardRef, Module } from '@nestjs/common';
import { TeachersService } from './teachers.service';
import { TeachersController } from './teachers.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TeacherSchema } from './teacher.model';
import { UsersModule } from 'src/Users/users.module';
import { StudentMarksModule } from 'src/Student_marks/student_marks.module';
import { TeachingModule } from 'src/Teachings/teaching.module';
import { StudentsModule } from 'src/Students/students.module';
import { ClassroomsModule } from 'src/Classrooms/classrooms.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Teacher', schema: TeacherSchema }]),
    forwardRef(() => UsersModule),
    forwardRef(() => StudentMarksModule),
    forwardRef(() => ClassroomsModule),
    TeachingModule,
    forwardRef(() => StudentsModule),
  ],
  providers: [TeachersService],
  controllers: [TeachersController],
  exports: [TeachersService],
})
export class TeachersModule {}
