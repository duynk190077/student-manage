import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { StudentsService } from './students.service';
import { StudentsController } from './students.controller';
import { StudentSchema } from './student.model';
import { ClassroomsModule } from 'src/Classrooms/classrooms.module';
import { ParentsModule } from 'src/Parents/parents.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Student', schema: StudentSchema }]),
    ClassroomsModule,
    ParentsModule,
  ],
  providers: [StudentsService],
  controllers: [StudentsController],
})
export class StudentModule {}
