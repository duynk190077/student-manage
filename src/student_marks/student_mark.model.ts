import mongoose, { Document } from 'mongoose';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Student } from 'src/Students/student.model';

export type StudentMarkDocument = StudentMark & Document;

@Schema({ timestamps: true })
export class StudentMark {
  id?: string;

  @Prop({ type: String, required: true })
  semester: string;

  @Prop({ type: String, required: true })
  subject: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Student' })
  student: string;

  @Prop({ type: [{ type: Number }], required: true })
  factor1: number[];

  @Prop({ type: [{ type: Number }], required: true })
  factor2: number[];

  @Prop({ type: [{ type: Number }], required: true })
  factor3: number[];

  @Prop({ type: Number, required: true })
  total: number;
}

export const StudentMarkSchema = SchemaFactory.createForClass(StudentMark);
