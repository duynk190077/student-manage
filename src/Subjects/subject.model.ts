import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type SubjectDocument = Subject & Document;
@Schema({ timestamps: true })
export class Subject {
  id?: string;

  @Prop({ type: String, required: true, unique: true })
  name: string;
}

export const SubjectSchema = SchemaFactory.createForClass(Subject);
