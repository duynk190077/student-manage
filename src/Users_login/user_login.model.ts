import mongoose, { Document } from "mongoose";
import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";

import { User } from 'src/Users/user.model';

export type UserLoginDocument = UserLogin & Document;

@Schema({ timestamps: true })
export class UserLogin {
    id?: string;

    @Prop({ type: String, unique: true })
    userId: string;
}

export const UserLoginSchema = SchemaFactory.createForClass(UserLogin);