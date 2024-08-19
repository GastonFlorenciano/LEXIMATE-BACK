import jwt from 'jsonwebtoken';
import { userModel } from '../models/user.models.js';

export const validarJWT = async (token) => {
  try {
    const { id } = jwt.verify(token, 'my secret');
    const usuario = await userModel.findById(id);
    if (!usuario) {
      return false;
    } else {
      return usuario;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
};
