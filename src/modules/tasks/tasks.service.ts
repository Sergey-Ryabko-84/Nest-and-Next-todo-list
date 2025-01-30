import { Injectable, NotFoundException } from "@nestjs/common";
import { Task } from "@prisma/client";
import { PrismaService } from "prisma/prisma.service";
import { CreateTaskDto, UpdateTaskDto } from "./dto";

@Injectable()
export class TasksService {
  constructor(private readonly prismaService: PrismaService) {}

  createOne(dto: CreateTaskDto, userId: number): Promise<Task> {
    return this.prismaService.task.create({ data: { ...dto, userId } });
  }

  async updateOne(id: number, userId: number, dto: UpdateTaskDto): Promise<Task> {
    await this.getOneOrThrow(id, userId);
    return this.prismaService.task.update({ where: { id }, data: dto });
  }

  async deleteOne(id: number, userId: number): Promise<Task> {
    await this.getOneOrThrow(id, userId);
    return this.prismaService.task.delete({ where: { id } });
  }

  async getOne(id: number, userId: number): Promise<Task> {
    const task = await this.getOneOrThrow(id, userId);
    return task;
  }

  getAll(userId: number): Promise<Task[]> {
    return this.prismaService.task.findMany({ where: { userId } });
  }

  private async getOneOrThrow(id: number, userId?: number): Promise<Task> {
    const task = await this.prismaService.task.findUnique({ where: { id, userId } });
    if (!task) throw new NotFoundException("task is not found");

    return task;
  }
}
