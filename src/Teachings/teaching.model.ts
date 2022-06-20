import mongoose, { Document } from 'mongoose';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Classroom } from 'src/Classrooms/classroom.model';
import { Teacher } from 'src/Teachers/teacher.model';
import { Subject } from 'src/Subjects/subject.model';

export type TeachingDocument = Teaching & Document;

@Schema({ timestamps: true })
export class Teaching {
  id?: string;

  @Prop({ type: String, required: true })
  semester: string;

  @Prop({ type: String, required: true })
  class: Classroom;

  @Prop({ type: String, required: true })
  subject: Subject;

  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
  teacher: Teacher;
}

export const TeachingSchema = SchemaFactory.createForClass(Teaching);
