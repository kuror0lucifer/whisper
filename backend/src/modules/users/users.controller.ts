import {
  Body,
  Controller,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import {
  ChangeNameDto,
  LoginDto,
  TgCheckDto,
  TgGenerateTokenDto,
} from "src/dtos/user.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { multerConfig } from "src/config/multer.config";

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

  @Post("avatar/:userId")
  @UseInterceptors(FileInterceptor("avatar", multerConfig))
  async uploadAvatar(
    @Param("userId") userId: number,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.usersService.changeAvatar(userId, file);
  }
}
