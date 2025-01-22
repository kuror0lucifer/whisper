import User from "../models/User.js";

const createUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const isUserExist = await User.findOne({ where: { email } });

    if (isUserExist) {
      return res.status(400).json({ error: "Email is already being used" });
    }

    const newUser = await User.create({ email, password });
    const { id, email: userEmail } = newUser;
    res.status(201).json({ id, email: userEmail });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: " Failed to create user" });
  }
};

export { createUser };
