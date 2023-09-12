import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from "@nestjs/common";
import { TodoService } from "./todo.service";
import { CreateTodoDto } from "./dto/create-todo.dto";
import { UpdateTodoDto } from "./dto/update-todo.dto";
import { AuthGuard } from "@nestjs/passport";

@Controller("todo")
export class TodoController {
    constructor(private todoService: TodoService) {}

    @Get()
    getAllTodo() {
        return this.todoService.getAllTodo();
    }
    
    // ADMIN =========================================
    @Get(":id")
    @UseGuards(AuthGuard("jwt"))
    getOneTodo(
        @Param("id")
        id: string,

        @Req()
        req
    ) {
        return this.todoService.getOneTodo(id, req.user);
    }

    @Post()
    @UseGuards(AuthGuard("jwt"))
    createTodo(
        @Body()
        todo: CreateTodoDto,

        @Req()
        req
    ) {
        return this.todoService.createTodo(todo, req.user);
    }

    @Put(":id")
    @UseGuards(AuthGuard("jwt"))
    updateTodo(
        @Param("id")
        id: string,

        @Body()
        todo: UpdateTodoDto,

        @Req()
        req
    ) {
        return this.todoService.updateTodo(id, todo, req.user);
    }
    

    @Delete(":id")
    @UseGuards(AuthGuard("jwt"))
    deleteTodo(
        @Param("id")
        id: string,

        @Req()
        req
    ) {
        return this.todoService.deleteTodo(id, req.user);
    }

    // USER =========================================
    @Get("user")
    @UseGuards(AuthGuard("jwt"))
    getAllTodoOfUser(
        @Req()
        req
    ) {
        return this.todoService.getAllTodoOfUser(req.user);
    }

    @Delete("user/:id")
    @UseGuards(AuthGuard("jwt"))
    deleteTodoOfUser(
        @Param("id")
        id: string,

        @Req()
        req
    ) {
        return this.todoService.deleteTodoOfUser(id, req.user);
    }

    @Put("user/:id")
    @UseGuards(AuthGuard("jwt"))
    updateTodoOfUser(
        @Param("id")
        id: string,

        @Body()
        todo: UpdateTodoDto,

        @Req()
        req
    ) {
        return this.todoService.updateTodoOfUser(id, todo, req.user);
    }
}
