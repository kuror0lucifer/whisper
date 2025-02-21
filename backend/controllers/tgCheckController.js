import { Sequelize } from 'sequelize';
import User from '../modules/users/user.js';

const tgCheck = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({
      where: {
        email: email,
        telegramid: {
          [Sequelize.Op.ne]: null,
        },
      },
    });

    if (user) return res.status(200).json({ status: 'success' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Failed to check telegram' });
  }
};

export { tgCheck };
