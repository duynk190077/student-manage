import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { StudentsService } from './students.service';
import { StudentsController } from './students.controller';
import { StudentSchema } from './student.model';
import { ClassroomsModule } from 'src/Classrooms/classrooms.module';
import { ParentsModule } from 'src/Parents/parents.module';
import { UsersModule } from 'src/Users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Student', schema: StudentSchema }]),
    ClassroomsModule,
    ParentsModule,
    forwardRef(() => UsersModule),
  ],
  providers: [StudentsService],
  controllers: [StudentsController],
  exports: [StudentsService],
})
export class StudentsModule {}
