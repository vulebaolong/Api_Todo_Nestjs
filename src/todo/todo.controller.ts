import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { TodoService } from "./todo.service";
import { CreateTodoDto } from "./dto/create-todo.dto";
import { UpdateTodoDto } from "./dto/update-todo.dto";

@Controller("todo")
export class TodoController {
    constructor(private todoService: TodoService) {}
    @Get()
    getAllTodo() {
        return this.todoService.getAllTodo();
    }

    @Post()
    createTodo(
        @Body()
        todo: CreateTodoDto
    ) {
        return this.todoService.createTodo(todo);
    }

    @Put(":id")
    updateTodo(
        @Param("id")
        id: string,

        @Body()
        todo: UpdateTodoDto
    ) {
        return this.todoService.updateTodo(id, todo);
    }

    @Delete(":id")
    deleteTodo(
        @Param("id")
        id: string,
    ) {
        return this.todoService.deleteTodo(id);
    }
}
