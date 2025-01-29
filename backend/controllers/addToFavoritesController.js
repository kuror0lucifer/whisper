import Favorites from "../models/Favorites";

const addToFavorites = async (req, res) => {
  const { telegramId, gameId } = req.body;

  if (!telegramId || !gameId)
    return res.status(400).json({ error: "telegramId and gameId required" });

  try {
    const existingFavorite = await Favorites.findOne({
      where: {
        telegramId,
        gameid: gameId,
      },
    });
    if (existingFavorite)
      return res
        .status(409)
        .json({ message: "The game is already in favorites" });

    const favorite = await Favorites.create({ telegramId, gameid: gameId });
    return res
      .status(201)
      .json({ message: "The game has been added to favourites successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Error adding a game to favourites" });
  }
};

export { addToFavorites };
