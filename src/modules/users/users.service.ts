import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { hash } from "argon2";
import { User } from "@prisma/client";
import { PrismaService } from "prisma/prisma.service";
import { CreateUserDto, GetUserDto, UpdateUserDto } from "./dto";

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}
  async createOne({ email, hashedPassword }: CreateUserDto) {
    const userByEmail = await this.prismaService.user.findUnique({ where: { email } });

    if (userByEmail) {
      throw new ConflictException("User with this email is already existing");
    }

    return this.prismaService.user.create({ data: { email, hashedPassword } });
  }

  getOne({ id, email }: GetUserDto) {
    if (!id && !email) throw new BadRequestException();

    return this.prismaService.user.findFirst({ where: { id, email } });
  }

  async updateOne(id: number, dto: UpdateUserDto) {
    const user = await this.getOneOrThrow(id);
    const { email, password } = dto;

    if (email) {
      const userByEmail = await this.getOne({ email });
      if (userByEmail) throw new ConflictException("User with this email is already existing");
    }

    let hashedPassword = user.hashedPassword;
    if (password) hashedPassword = await hash(password);

    return this.prismaService.user.update({ where: { id }, data: { ...dto, hashedPassword } });
  }

  private async getOneOrThrow(id: number): Promise<User> {
    const user = await this.getOne({ id });
    if (!user) throw new NotFoundException("could not find any user");

    return user;
  }
}
