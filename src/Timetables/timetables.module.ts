import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { TimetablesService } from './timetables.service';
import { TimetablesController } from './timetables.controller';
import { TimeTableSchema } from './Timetable.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'TimeTable', schema: TimeTableSchema}]),
  ],
  providers: [TimetablesService],
  controllers: [TimetablesController]
})
export class TimetablesModule {}
