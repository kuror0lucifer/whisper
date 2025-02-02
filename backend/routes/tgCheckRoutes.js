import express from "express";
import { tgCheck } from "../controllers/tgCheckController.js";

const router = express.Router();

router.post("/tg-check", tgCheck);

export default router;
