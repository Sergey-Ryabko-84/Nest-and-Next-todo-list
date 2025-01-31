import {
  Body,
  Controller,
  FileTypeValidator,
  Get,
  MaxFileSizeValidator,
  ParseFilePipe,
  ParseIntPipe,
  Patch,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { User } from "@prisma/client";
import { JwtAccessGuard } from "src/modules/auth/guards";
import { CurrentUser } from "src/utils";
import { UsersService } from "./users.service";
import { CreateUserDto, UpdateUserDto } from "./dto";
import { FileInterceptor } from "@nestjs/platform-express";

@UseGuards(JwtAccessGuard)
@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  createOne(@Body() dto: CreateUserDto): Promise<User> {
    return this.usersService.createOne(dto);
  }

  @Patch()
  @UseInterceptors(FileInterceptor("avatar"))
  updateOne(
    @CurrentUser("id", ParseIntPipe) id: number,
    @Body() dto: UpdateUserDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1048576 }),
          new FileTypeValidator({ fileType: "image/" }),
        ],
        fileIsRequired: false,
      })
    )
    file: Express.Multer.File
  ): Promise<User> {
    return this.usersService.updateOne(id, dto, file);
  }

  @Get()
  getOne(@CurrentUser("id", ParseIntPipe) id: number): Promise<User> {
    return this.usersService.getOne({ id });
  }
}
