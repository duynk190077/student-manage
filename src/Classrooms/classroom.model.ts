import mongoose, { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Teacher } from 'src/Teachers/teacher.model';

export type ClassroomDocument = Classroom & Document;

@Schema({ timestamps: true })
export class Classroom {
  id?: string;

  @Prop({ type: String, unique: true, required: true })
  name: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Teacher' })
  teacher: Teacher;
}

export const ClassroomSchema = SchemaFactory.createForClass(Classroom);
