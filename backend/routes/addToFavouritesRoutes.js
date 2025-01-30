import express from "express";
import { addToFavourites } from "../controllers/addToFavouritesController.js";

const router = express.Router();

router.post("/add-to-favourites", addToFavourites);

export default router;
