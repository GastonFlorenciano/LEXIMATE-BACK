import mongoose from 'mongoose';
import { MONGODB_URI } from '../config.js';

export const connectDb = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log(
      `😈 conexion exitosa a la base de datos: ${mongoose.connection.name} 😈`
    );
    return mongoose.connection;
  } catch (error) {
    console.log(error);
  }
};
