import { forwardRef, Module } from '@nestjs/common';

import { ClassroomsService } from './classrooms.service';
import { ClassroomsController } from './classrooms.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ClassroomSchema } from './classroom.model';
import { TeachersModule } from 'src/Teachers/teachers.module';
import { StudentsModule } from 'src/Students/students.module';

@Module({
  imports: [
    forwardRef(() => StudentsModule),
    MongooseModule.forFeature([{ name: 'Classroom', schema: ClassroomSchema }]),
    TeachersModule,
  ],
  providers: [ClassroomsService],
  controllers: [ClassroomsController],
  exports: [ClassroomsService],
})
export class ClassroomsModule {}
