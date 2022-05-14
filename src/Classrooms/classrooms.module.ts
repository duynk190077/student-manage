import { Module } from '@nestjs/common';

import { ClassroomsService } from './classrooms.service';
import { ClassroomsController } from './classrooms.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ClassroomSchema } from './classroom.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Classroom', schema: ClassroomSchema }]),
  ],
  providers: [ClassroomsService],
  controllers: [ClassroomsController],
})
export class ClassroomsModule {}
