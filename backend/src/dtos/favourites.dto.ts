import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CheckGameDto {
  @IsNumber()
  @IsNotEmpty()
  public userId: number;

  @IsString()
  @IsNotEmpty()
  public nsuid: string;
}

export class AddToFavouritesDto {
  @IsNumber()
  @IsNotEmpty()
  public userId: number;

  @IsString()
  @IsNotEmpty()
  public nsuid: string;
}
