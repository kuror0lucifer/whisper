import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import User from "../models/User.js";

dotenv.config();

const createUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const isUserExist = await User.findOne({ where: { email } });

    if (isUserExist) {
      return res.status(400).json({ error: "Email is already being used" });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = await User.create({ email, password: hashedPassword });
    const { id, email: userEmail } = newUser;

    res.status(201).json({ id, email: userEmail });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: " Failed to create user" });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) return res.status(400).json({ error: "User not found" });

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid)
      return res.status(400).json({ error: "Invalid login or password" });

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.cookie("auth_token", token, {
      httpOnly: true,
      secure: false,
      maxAge: 3600000,
    });

    res.status(200).json({ message: "Login successful" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to login" });
  }
};

export { createUser, loginUser };
