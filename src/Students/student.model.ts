import mongoose, { Document } from 'mongoose';
import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Parent } from 'src/parents/parent.model';
import { Classroom } from 'src/Classrooms/classroom.model';
import { User } from 'src/Users/user.model';

export type StudentDocument = Student & Document;

@Schema({ timestamps: true })
export class Student {
  id?: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', unique: true })
  user: User;

  @Prop({ type: String, required: true })
  firstName: string;

  @Prop({ type: String, required: true })
  lastName: string;

  @Prop({ type: String, enum: ['Name', 'Nữ'], required: true })
  gender: string;

  @Prop({ type: Date, required: true })
  dateofBirth: Date;

  @Prop({ type: String, required: true, unique: true })
  phoneNumber: string;

  @Prop({ type: String, required: true })
  nation: string;

  @Prop({ type: String, required: true, unique: true })
  nationId: string;

  @Prop({ type: String, required: true })
  address: string;

  @Prop({ type: String, required: true })
  permanentResidence: string;

  @Prop({ type: String, required: true })
  religion: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Parent' }] })
  parents: Parent[];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Classroom' })
  class: Classroom;

  @Prop({ type: Number, required: true })
  yearJoin: Number;

  @Prop({ type: String, enum: ['Học', 'Tốt nghiệp'], default: 'Học' })
  status: string;

  @Prop({ type: String })
  image: string;
}

export const StudentSchema = SchemaFactory.createForClass(Student);
