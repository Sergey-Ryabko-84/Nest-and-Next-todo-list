import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from "@nestjs/common";
import { Task } from "@prisma/client";
import { TasksService } from "./tasks.service";
import { CreateTaskDto, UpdateTaskDto } from "./dto";

@Controller("tasks")
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  createOne(@Body() dto: CreateTaskDto): Promise<Task> {
    return this.tasksService.createOne(dto);
  }

  @Patch(":id")
  updateOne(@Param("id", ParseIntPipe) id: number, @Body() dto: UpdateTaskDto): Promise<Task> {
    return this.tasksService.updateOne(id, dto);
  }

  @Delete(":id")
  delete(@Param("id", ParseIntPipe) id: number): Promise<Task> {
    return this.tasksService.deleteOne(id);
  }

  @Get(":id")
  getOne(@Param("id", ParseIntPipe) id: number): Promise<Task> {
    return this.tasksService.getOne(id);
  }

  @Get()
  getAll(): Promise<Task[]> {
    return this.tasksService.getAll();
  }
}
