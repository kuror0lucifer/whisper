import express from "express";
import { gameCheckFavourites } from "../controllers/gameCheckFavouritesController.js";

const router = express.Router();

router.post("/check-game-in-favourites", gameCheckFavourites);

export default router;
