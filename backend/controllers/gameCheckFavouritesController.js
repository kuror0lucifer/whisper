import Favourites from "../models/Favourites.js";

const gameCheckFavourites = async (req, res) => {
  const { userId, sku } = req.body;

  try {
    const gameInFavourites = await Favourites.findOne({
      where: { userid: userId, gameid: sku },
    });

    if (gameInFavourites) {
      return res.status(200).json({ status: "success" });
    }
  } catch (err) {
    return res.status(500).json({ error: "Failed to check favourites" });
  }
};

export { gameCheckFavourites };
