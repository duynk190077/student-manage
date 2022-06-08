import { Module } from '@nestjs/common';
import { TeachingService } from './teaching.service';
import { TeachingController } from './teaching.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TeachingSchema } from './teaching.model';
import { TeachersModule } from 'src/Teachers/teachers.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Teaching', schema: TeachingSchema}]),
    TeachersModule
  ],
  providers: [TeachingService],
  controllers: [TeachingController],
  exports: [TeachingService]
})
export class TeachingModule {}
