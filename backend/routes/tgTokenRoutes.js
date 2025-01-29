import express from "express";
import { generateTgToken } from "../controllers/tgTokenController.js";

const router = express.Router();

router.post("/generate-token", generateTgToken);

export default router;
