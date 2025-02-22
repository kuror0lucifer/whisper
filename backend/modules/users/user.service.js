import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from './user.js';

dotenv.config();

class AuthService {
  static async register(email, password) {
    const userExists = await User.findOne({ where: { email } });
    if (userExists) {
      throw new Error('Email is already being used');
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = await User.create({ email, password: hashedPassword });

    const token = jwt.sign(
      { id: newUser.id, email: newUser.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    return { id: newUser.id, userEmail: newUser.email, token };
  }

  static async login(email, password) {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw new Error('User not found');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid login or password');
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    return {
      token,
      id: user.id,
      userEmail: user.email,
      userName: user.name,
    };
  }

  static async changeName(id, name) {
    const user = await User.findOne({ where: id });

    if (!user) {
      throw new Error('User not found');
    }

    const userName = await User.update({ name: name }, { where: { id: id } });

    return { userName };
  }
}

export default AuthService;
