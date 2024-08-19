import { Router } from 'express';
import { userControllers } from '../controllers/user.controllers.js';
export const userRoutes = Router();

userRoutes.post('/register', userControllers.register);
userRoutes.post('/login', userControllers.login);
