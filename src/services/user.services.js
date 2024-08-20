import bcrypt from 'bcrypt';
import { userModel } from '../models/user.models.js';
export const userService = {};

userService.registerUser = async (userData) => {
  const {
    NombreUsuario,
    ApellidoUsuario,
    Genero,
    FechaNacimiento,
    Pais,
    Email,
    Contrasenia,
  } = userData;
  // Verificar que el email no sea null o vacío
  if (!Email) {
    throw new Error('El campo email es obligatorio.');
  }
  if (!Contrasenia) {
    throw new Error('El campo contraseña es obligatorio.');
  }
  // Verificar si el email ya existe
  const existeUsuario = await userModel.findOne({ Email });
  if (existeUsuario) {
    throw new Error('El correo ya está registrado');
  }
  // Hash de la contraseña
  const hashContrasenia = bcrypt.hashSync(Contrasenia, 10);
  // Crear el nuevo usuario
  const nuevoUsuario = new userModel({
    NombreUsuario,
    ApellidoUsuario,
    Genero,
    FechaNacimiento,
    Pais,
    Email,
    Contrasenia: hashContrasenia,
  });
  // Guardar el nuevo usuario en la base de datos
  await nuevoUsuario.save();
  return { msg: 'Usuario registrado con éxito' };
};
