import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { UsersModule } from "../users";
import { GoogleStrategy, JwtRefreshStrategy, LocalStrategy } from "./strategies";

@Module({
  imports: [UsersModule, JwtModule.register({})],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtRefreshStrategy, GoogleStrategy],
})
export class AuthModule {}
