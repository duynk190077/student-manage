import mongoose, { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from 'src/Users/user.model';

export type TeacherDocument = Teacher & Document;

@Schema({ timestamps: true })
export class Teacher {
  id?: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;

  @Prop({ type: String, required: true })
  firstName: string;

  @Prop({ type: String, required: true })
  lastName: string;

  @Prop({ type: String, required: true, enum: ['Nam', 'Nữ'] })
  gender: string;

  @Prop({ type: String, required: true, unique: true })
  phoneNumber: string;

  @Prop({ type: Date, required: true })
  dateofBirth: Date;

  @Prop({ type: String, required: true })
  email: string;

  @Prop({ type: String, required: true })
  subject: string;

  @Prop({ type: String })
  image: string;
}

export const TeacherSchema = SchemaFactory.createForClass(Teacher);
