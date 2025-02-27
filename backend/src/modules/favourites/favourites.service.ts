import { BadRequestException, Injectable } from "@nestjs/common";
import { Favourites } from "./favourites";

@Injectable()
export class FavouritesService {
  public constructor() {}

  public async gameCheckFavourites(userId: number, nsuid: string) {
    const gameInFavourites = await Favourites.findOne({
      where: { user_id: userId, game_id: nsuid },
    });

    if (gameInFavourites) {
      return {
        success: true,
      };
    }
  }

  public async addToFavourites(userId: number, nsuid: string) {
    const existingFavourite = await Favourites.findOne({
      where: { user_id: userId, game_id: nsuid },
    });

    if (existingFavourite) {
      throw new BadRequestException("The game is already in favourites");
    }

    await Favourites.create({
      user_id: userId,
      game_id: nsuid,
    });

    return {
      success: true,
    };
  }

  public async getFavourites(userId: number) {
    const favourites = await Favourites.findAll({ where: { user_id: userId } });

    const gameIds = favourites.map((fav) => fav.game_id);

    return {
      success: true,
      gameIds,
    };
  }
}
