import { BadRequestException, ConflictException, Injectable } from "@nestjs/common";
import { PrismaService } from "prisma/prisma.service";
import { CreateUserDto, GetUserDto } from "./dto";

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
}
