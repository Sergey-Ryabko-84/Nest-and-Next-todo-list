import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { PrismaModule } from "prisma/prisma.module";
import { AuthModule, TasksModule, UsersModule } from "./modules";
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    TasksModule,
    UsersModule,
    AuthModule,
  ],
})
export class AppModule {}
