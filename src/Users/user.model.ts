import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  id?: string;

  @Prop({ type: String, required: true, unique: true })
  username: string;

  @Prop({ type: String, required: true })
  password: string;

  @Prop({ enum: ['Student', 'Admin', 'Teacher'], default: 'Student' })
  roles: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
