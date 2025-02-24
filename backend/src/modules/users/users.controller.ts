import { Body, Controller, Patch, Post } from "@nestjs/common";
import { UsersService } from "./users.service";
import {
  ChangeNameDto,
  LoginDto,
  TgCheckDto,
  TgGenerateTokenDto,
} from "src/dtos/user.dto";

@Controller("/users")
export class UsersController {
  public constructor(private readonly usersService: UsersService) {}

  @Post("/registration")
  public register(@Body() loginDto: LoginDto) {
    return this.usersService.register(loginDto.email, loginDto.password);
  }

  @Post("/login")
  public logIn(@Body() loginDto: LoginDto) {
    return this.usersService.login(loginDto.email, loginDto.password);
  }

  @Patch("/changeName")
  public changeName(@Body() changeNameDto: ChangeNameDto) {
    return this.usersService.changeName(
      changeNameDto.id,
      changeNameDto.userName,
    );
  }

  @Post("/generate-token")
  public generateToken(@Body() tgGenerateTokenDto: TgGenerateTokenDto) {
    return this.usersService.generateTgToken(tgGenerateTokenDto.userId);
  }

  @Post("/tg-check")
  public tgCheck(@Body() tgCheckDto: TgCheckDto) {
    return this.usersService.tgCheck(tgCheckDto.email);
  }
}
