import { Body, Controller, Get, ParseIntPipe, Patch, Post, UseGuards } from "@nestjs/common";
import { User } from "@prisma/client";
import { JwtAccessGuard } from "src/modules/auth/guards";
import { CurrentUser } from "src/utils";
import { UsersService } from "./users.service";
import { CreateUserDto, UpdateUserDto } from "./dto";

@UseGuards(JwtAccessGuard)
@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  createOne(@Body() dto: CreateUserDto): Promise<User> {
    return this.usersService.createOne(dto);
  }

  @Patch()
  updateOne(
    @CurrentUser("id", ParseIntPipe) id: number,
    @Body() dto: UpdateUserDto
  ): Promise<User> {
    return this.usersService.updateOne(id, dto);
  }

  @Get()
  getOne(@CurrentUser("id", ParseIntPipe) id: number): Promise<User> {
    return this.usersService.getOne({ id });
  }
}
