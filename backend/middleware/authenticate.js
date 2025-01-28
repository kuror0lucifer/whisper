import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

const authenticate = (req, res, next) => {
  const token = req.cookies.auth_token;

  if (!token) return res.status(401).json({ error: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ error: "Invalid token" });
  }
};

export default authenticate;
