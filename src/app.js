import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { userRoutes } from './routes/user.routes.js';

//inicializamos
export const app = express();

//middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

//nuestras rutas
app.use(userRoutes);
