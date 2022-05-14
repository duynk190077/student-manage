import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type ParentDocument = Parent & Document;

@Schema({ timestamps: true })
export class Parent {
  id?: string;

  @Prop({ type: String, required: true })
  fullName: string;

  @Prop({ type: Number, required: true })
  yearofBirth: Number;

  @Prop({ type: String, required: true })
  job: string;

  @Prop({ type: String, required: true })
  phoneNumber: string;
}

export const ParentSchema = SchemaFactory.createForClass(Parent);
