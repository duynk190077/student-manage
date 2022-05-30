import { Document } from "mongoose";
import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";

export type TimeTableDocument = TimeTable & Document;
@Schema({ timestamps: true })
export class TimeTable {
    id?: string;

    @Prop({ type: String, required: true})
    semester: string;

    @Prop({ type: Number, required: true})
    week: string;

    @Prop({ type: [{ type: String }] }) 
    monday: string[];

    @Prop({ type: [{ type: String }] }) 
    tusday: string[];

    @Prop({ type: [{ type: String }] }) 
    wednesday: string[];

    @Prop({ type: [{ type: String }] }) 
    thursday: string[];

    @Prop({ type: [{ type: String }] }) 
    friday: string[];

    @Prop({ type: [{ type: String }] }) 
    saturday: string[];

}

export const TimeTableSchema = SchemaFactory.createForClass(TimeTable);