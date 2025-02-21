import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import sequelize from './config/db.js';
import userRoutes from './modules/users/user.routes.js';
import tgTokenRoutes from './routes/tgTokenRoutes.js';
import tgCheckRoutes from './routes/tgCheckRoutes.js';
import addToFavouritesRoutes from './routes/addToFavouritesRoutes.js';
import gameCheckFavouritesRoutes from './routes/gameCheckFavouritesRoutes.js';
import authMiddleware from './middleware/authMiddleware.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT;

app.use(cookieParser());

const corsOptions = {
  origin: 'http://localhost:5173',
  methods: 'GET, POST, PUT, DELETE, PATCH',
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

app.use(authMiddleware);

app.use('/users', userRoutes);
app.use('/tg-token', tgTokenRoutes);
app.use('/favourites', addToFavouritesRoutes);
app.use('/telegram-id', tgCheckRoutes);
app.use('/game-check', gameCheckFavouritesRoutes);

sequelize
  .sync()
  .then(() => {
    console.log('Database synchronized!');
  })
  .catch(err => {
    console.error('Error synchronizing database: ', err);
  });

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
