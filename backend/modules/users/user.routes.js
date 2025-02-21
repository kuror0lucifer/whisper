import express from 'express';
import {
  changeName,
  createUser,
  loginUser,
  logoutUser,
} from './user.controller.js';

const router = express.Router();

router.post('/registration', createUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);
router.patch('/changeName', changeName);

export default router;
