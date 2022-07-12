import { Module } from '@nestjs/common';
import { SemestersService } from './semesters.service';
import { SemestersController } from './semesters.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { SemesterSchema } from './semester.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Semester', schema: SemesterSchema }]),
  ],
  providers: [SemestersService],
  controllers: [SemestersController],
  exports: [SemestersService],
})
export class SemestersModule {}
