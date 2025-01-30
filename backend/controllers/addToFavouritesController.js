import Favourites from "../models/Favourites.js";

const addToFavourites = async (req, res) => {
  const { userId, gameId } = req.body;

  if (!userId || !gameId)
    return res.status(400).json({ error: "userId and gameId required" });

  try {
    const existingFavorite = await Favourites.findOne({
      where: {
        userid: userId,
        gameid: gameId,
      },
    });
    if (existingFavorite)
      return res
        .status(409)
        .json({ message: "The game is already in favourites" });

    const favourite = await Favourites.create({
      userid: userId,
      gameid: gameId,
    });
    return res
      .status(201)
      .json({ message: "The game has been added to favourites successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Error adding a game to favourites" });
  }
};

export { addToFavourites };
