import { Injectable, NotFoundException } from "@nestjs/common";
import { Task } from "@prisma/client";
import { PrismaService } from "prisma/prisma.service";
import { CreateTaskDto, UpdateTaskDto } from "./dto";

@Injectable()
export class TasksService {
  constructor(private readonly prismaService: PrismaService) {}

  createOne(dto: CreateTaskDto): Promise<Task> {
    return this.prismaService.task.create({ data: dto });
  }

  async updateOne(id: number, dto: UpdateTaskDto): Promise<Task> {
    await this.getOneOrThrow(id);
    return this.prismaService.task.update({ where: { id }, data: dto });
  }

  async deleteOne(id: number): Promise<Task> {
    await this.getOneOrThrow(id);
    return this.prismaService.task.delete({ where: { id } });
  }

  async getOne(id: number): Promise<Task> {
    await this.getOneOrThrow(id);
    return this.prismaService.task.findUnique({ where: { id } });
  }

  getAll(): Promise<Task[]> {
    return this.prismaService.task.findMany();
  }

  private async getOneOrThrow(id: number): Promise<Task> {
    const task = await this.prismaService.task.findUnique({ where: { id } });
    if (!task) throw new NotFoundException("task is not found");

    return task;
  }
}
