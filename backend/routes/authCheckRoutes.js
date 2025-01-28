import express from "express";
import authenticate from "../middleware/authenticate.js";

const router = express.Router();

router.get("/protected-route", authenticate, (req, res) => {
  res.status(200).json({ user: req.user });
});

export default router;
