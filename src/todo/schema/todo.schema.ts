import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({
    timestamps: true,
    collection: "todo",
})
export class Todo {
    @Prop()
    title: string;

    @Prop({ default: false })
    completed: boolean;
}

export const TodoSchema = SchemaFactory.createForClass(Todo);
