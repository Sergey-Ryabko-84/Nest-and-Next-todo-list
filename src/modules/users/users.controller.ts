import { Body, Controller, Post } from "@nestjs/common";
import { User } from "@prisma/client";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  createOne(@Body() dto: CreateUserDto): Promise<User> {
    return this.usersService.createOne(dto);
  }
}
