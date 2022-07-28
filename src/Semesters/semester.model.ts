import { Document } from 'mongoose';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

export type SemesterDocument = Semester & Document;

@Schema({ timestamps: true })
export class Semester {
  id?: string;

  @Prop({ type: String, required: true, unique: true })
  name: string;

  @Prop({ enum: ['Đang diễn ra', 'Kết thúc'], default: 'Đang diễn ra' })
  status: string;

  createdAt?: Date;

  updatedAt?: Date;
}

export const SemesterSchema = SchemaFactory.createForClass(Semester);
