import mongoose, { Document } from 'mongoose';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Teacher } from 'src/Teachers/teacher.model';
import { Subject } from 'src/Subjects/subject.model';

export type TeachingDocument = Teaching & Document;

@Schema({ timestamps: true })
export class Teaching {
  id?: string;

  @Prop({ type: String, required: true })
  semester: string;

  @Prop({ type: String, required: true })
  class: string;

  @Prop({ type: String, required: true })
  subject: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
  teacher: Teacher;
}

export const TeachingSchema = SchemaFactory.createForClass(Teaching);
