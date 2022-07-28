import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { SubjectsService } from './subjects.service';
import { SubjectsController } from './subjects.controller';
import { SubjectSchema } from './subject.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Subject', schema: SubjectSchema }]),
  ],
  providers: [SubjectsService],
  controllers: [SubjectsController],
  exports: [SubjectsService],
})
export class SubjectsModule {}
