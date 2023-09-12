import { IsBoolean, IsOptional, IsString } from "class-validator";

export class UpdateTodoDto {
    @IsOptional()
    @IsString()
    title: string;

    @IsOptional()
    @IsBoolean()
    completed: boolean;
}
