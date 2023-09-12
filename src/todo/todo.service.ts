import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Todo } from "./schema/todo.schema";
import { Model } from "mongoose";
import { CreateTodoDto } from "./dto/create-todo.dto";
import { UpdateTodoDto } from "./dto/update-todo.dto";
import { Type, User } from "../auth/schema/user.schema";

@Injectable()
export class TodoService {
    constructor(
        @InjectModel(Todo.name)
        private todoModel: Model<Todo>
    ) {}

    async getAllTodo(): Promise<Todo[]> {
        return await this.todoModel.find();
    }

    async getAllTodoOfUser(user: User) {
        return await this.todoModel.find({ user_Id: user._id });
    }

    async getOneTodo(id: string, user: User): Promise<Todo[]> {
        if (user.type !== Type.ADMIN) throw new UnauthorizedException("You are not admin");

        return await this.todoModel.findById(id);
    }

    async createTodo(todo: CreateTodoDto, user: User): Promise<Todo> {
        const data = Object.assign(todo, { user_Id: user._id });
        return await this.todoModel.create(data);
    }

    async updateTodo(id: string, todo: UpdateTodoDto, user: User): Promise<Todo> {
        if (user.type !== Type.ADMIN) throw new UnauthorizedException("You are not admin");

        return await this.todoModel.findOneAndUpdate({ _id: id }, todo, { new: true });
    }

    async deleteTodo(id: string, user: User): Promise<Todo> {
        if (user.type !== Type.ADMIN) throw new UnauthorizedException("You are not admin");

        return await this.todoModel.findByIdAndDelete(id);
    }

    async deleteTodoOfUser(id: string, user: User): Promise<Todo> {
        const todoDelete = await this.todoModel.findOneAndDelete({ user_Id: user._id, _id: id });

        if (!todoDelete) {
            throw new NotFoundException("Not Found Todo Should Delete");
        }

        return todoDelete;
    }

    async updateTodoOfUser(id: string, todo: UpdateTodoDto, user: User): Promise<Todo> {
        const todoUpdate = await this.todoModel.findOneAndUpdate({ user_Id: user._id, _id: id }, todo, { new: true });

        if (!todoUpdate) {
            throw new NotFoundException("Not Found Todo Should Update");
        }

        return todoUpdate;
    }
}
