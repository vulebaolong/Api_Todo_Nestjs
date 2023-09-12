import { IsNotEmpty, IsString, IsBoolean } from "class-validator";
export class CreateTodoDto {
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    @IsBoolean()
    completed: boolean;
}
