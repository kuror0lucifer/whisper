import { generateToken } from "../utils/generateToken.js";

const generateTgToken = (req, res) => {
  const { userId } = req.body;
  const token = generateToken(userId);
  res.json({ token });
};

export { generateTgToken };
