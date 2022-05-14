import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { StudentsService } from './students.service';
import { StudentsController } from './students.controller';
import { StudentSchema } from './student.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Student', schema: StudentSchema }]),
  ],
  providers: [StudentsService],
  controllers: [StudentsController],
})
export class StudentModule {}
