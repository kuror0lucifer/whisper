import { Body, Controller, Post } from "@nestjs/common";
import { FavouritesService } from "./favourites.service";
import { AddToFavouritesDto, CheckGameDto } from "src/dtos/favourites.dto";

@Controller("favourites")
export class FavouritesController {
  constructor(private readonly favouritesService: FavouritesService) {}

  @Post("/check-game")
  public checkGame(@Body() checkGameDto: CheckGameDto) {
    return this.favouritesService.gameCheckFavourites(
      checkGameDto.userId,
      checkGameDto.nsuid,
    );
  }
  @Post("/add-to-favourites")
  public addToFavourites(@Body() addToFavouritesDto: AddToFavouritesDto) {
    return this.favouritesService.addToFavourites(
      addToFavouritesDto.userId,
      addToFavouritesDto.nsuid,
    );
  }
}
