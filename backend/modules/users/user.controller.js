import AuthService from './user.service.js';

const createUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await AuthService.register(email, password);
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const token = await AuthService.login(email, password);
    res.status(200).json(token);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const logoutUser = (req, res) => {
  res.status(200).json({ message: 'Logout successful' });
};

export { createUser, loginUser, logoutUser };
