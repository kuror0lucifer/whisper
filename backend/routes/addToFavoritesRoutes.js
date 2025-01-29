import express from "express";
import { addToFavorites } from "../controllers/addToFavoritesController.js";

const router = express.Router();

router.post("/add-to-favorites", addToFavorites);

export default router;
