import bcrypt from 'bcrypt';
import { userModel } from '../models/user.models.js';
import { generarJWT } from '../helpers/generarJWT.js';

export const authService = {};

authService.loginUser = async (userData) => {
  const { Email, Contrasenia } = userData;
  // Buscar al usuario por email
  const usuario = await userModel.findOne({ Email });
  if (!usuario) {
    throw new Error('El usuario o contraseña no coinciden');
  }
  // Verificar la contraseña
  const validarContrasenia = bcrypt.compareSync(
    Contrasenia,
    usuario.Contrasenia
  );
  if (!validarContrasenia) {
    throw new Error('El usuario o contraseña no coinciden');
  }
  // Generar el JWT
  const token = await generarJWT({ id: usuario._id });
  return { msg: 'Inicio de sesión exitoso', token };
};
