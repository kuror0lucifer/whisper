import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsArray,
  IsOptional,
} from "class-validator";

export class LoginDto {
  @IsString()
  @IsNotEmpty()
  public email: string;

  @IsString()
  @IsNotEmpty()
  public password: string;
}

export class ResetPasswordDto {
  @IsString()
  @IsNotEmpty()
  public oldPassword: string;

  @IsString()
  @IsNotEmpty()
  public newPassword: string;
}

export class ChangeNameDto {
  @IsNumber()
  @IsNotEmpty()
  public id: number;

  @IsString()
  @IsNotEmpty()
  public userName: string;
}

export class ChangeDescriptionDto {
  @IsString()
  @IsNotEmpty()
  public description: string;

  @IsNumber()
  @IsNotEmpty()
  public userId: number;
}

export class TgGenerateTokenDto {
  @IsNumber()
  @IsNotEmpty()
  public userId: number;
}

export class TgCheckDto {
  @IsString()
  @IsNotEmpty()
  public email: string;
}

export class UserInfoDto {
  @IsArray()
  @IsNotEmpty()
  @IsOptional()
  @IsNumber({}, { each: true })
  public id: number[] | number;
}
