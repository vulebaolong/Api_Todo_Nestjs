import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { User } from "src/auth/schema/user.schema";

@Schema({
    timestamps: true,
    collection: "todo",
})
export class Todo {
    @Prop()
    title: string;

    @Prop({ default: false })
    completed: boolean;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "User" })
    user_Id: User;
}

export const TodoSchema = SchemaFactory.createForClass(Todo);
