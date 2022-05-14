import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ParentsService } from './parents.service';
import { ParentsController } from './parents.controller';
import { ParentSchema } from './parent.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Parent', schema: ParentSchema }]),
  ],
  providers: [ParentsService],
  controllers: [ParentsController],
})
export class ParentsModule {}
