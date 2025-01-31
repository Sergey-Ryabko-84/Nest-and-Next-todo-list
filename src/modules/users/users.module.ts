import { Module } from "@nestjs/common";
import { S3Service } from "src/services";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";

@Module({
  controllers: [UsersController],
  providers: [UsersService, S3Service],
  exports: [UsersService],
})
export class UsersModule {}
