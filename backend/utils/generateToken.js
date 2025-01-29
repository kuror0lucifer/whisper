import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const generateToken = (userId) => {
  const token = userId;
  return token;
  // const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
  //   algorithm: "HS256",
  //   expiresIn: "30m",
  // });
  // return token;
};

export { generateToken };
