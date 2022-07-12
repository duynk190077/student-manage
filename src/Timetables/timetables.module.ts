import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { TimetablesService } from './timetables.service';
import { TimetablesController } from './timetables.controller';
import { TimeTableSchema } from './Timetable.model';
import { TeachingModule } from 'src/Teachings/teaching.module';
import { TeachersModule } from 'src/Teachers/teachers.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'TimeTable', schema: TimeTableSchema }]),
    TeachingModule,
    TeachersModule,
  ],
  providers: [TimetablesService],
  controllers: [TimetablesController],
})
export class TimetablesModule {}
