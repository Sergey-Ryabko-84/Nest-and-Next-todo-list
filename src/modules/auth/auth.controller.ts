import { Body, Controller, ParseIntPipe, Post, Res, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Response } from "express";
import { CurrentUser } from "src/utils";
import { AuthService } from "./auth.service";
import { RegisterDto } from "./dto";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("register")
  register(@Body() dto: RegisterDto, @Res({ passthrough: true }) res: Response) {
    return this.authService.register(dto, res);
  }

  @UseGuards(AuthGuard("local"))
  @Post("login")
  login(
    @CurrentUser("id", ParseIntPipe) userId: number,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.generateTokens(userId, res);
  }

  @UseGuards(AuthGuard("jwt-refresh"))
  @Post("refresh")
  refresh(
    @CurrentUser("id", ParseIntPipe) userId: number,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.generateTokens(userId, res);
  }

  @Post("logout")
  logout(@Res({ passthrough: true }) res: Response) {
    res.cookie("refreshToken", "");
  }
}
