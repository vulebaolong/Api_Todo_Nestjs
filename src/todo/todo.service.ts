import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Todo } from "./schema/todo.schema";
import { Model } from "mongoose";
import { CreateTodoDto } from "./dto/create-todo.dto";
import { UpdateTodoDto } from "./dto/update-todo.dto";

@Injectable()
export class TodoService {
    constructor(
        @InjectModel(Todo.name)
        private todoModel: Model<Todo>
    ) {}

    async getAllTodo(): Promise<Todo[]> {
        return await this.todoModel.find();
    }

    async createTodo(todo: CreateTodoDto): Promise<Todo> {
        return await this.todoModel.create(todo);
    }

    async updateTodo(id: string, todo: UpdateTodoDto): Promise<Todo> {
        return await this.todoModel.findOneAndUpdate({ _id: id }, todo, { new: true });
    }

    async deleteTodo(id: string): Promise<Todo> {
        return await this.todoModel.findByIdAndDelete(id);
    }
}
