import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from "@nestjs/common";
import { Task } from "@prisma/client";
import { JwtAccessGuard } from "src/modules/auth/guards";
import { CurrentUser } from "src/utils";
import { TasksService } from "./tasks.service";
import { CreateTaskDto, UpdateTaskDto } from "./dto";

@UseGuards(JwtAccessGuard)
@Controller("tasks")
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  createOne(
    @Body() dto: CreateTaskDto,
    @CurrentUser("id", ParseIntPipe) userId: number
  ): Promise<Task> {
    return this.tasksService.createOne(dto, userId);
  }

  @Patch(":id")
  updateOne(
    @Param("id", ParseIntPipe) id: number,
    @CurrentUser("id", ParseIntPipe) userId: number,
    @Body() dto: UpdateTaskDto
  ): Promise<Task> {
    return this.tasksService.updateOne(id, userId, dto);
  }

  @Delete(":id")
  delete(
    @Param("id", ParseIntPipe) id: number,
    @CurrentUser("id", ParseIntPipe) userId: number
  ): Promise<Task> {
    return this.tasksService.deleteOne(id, userId);
  }

  @Get(":id")
  getOne(
    @Param("id", ParseIntPipe) id: number,
    @CurrentUser("id", ParseIntPipe) userId: number
  ): Promise<Task> {
    return this.tasksService.getOne(id, userId);
  }

  @Get()
  getAll(@CurrentUser("id", ParseIntPipe) userId: number): Promise<Task[]> {
    return this.tasksService.getAll(userId);
  }
}
