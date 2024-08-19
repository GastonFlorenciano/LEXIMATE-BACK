import { generarJWT } from '../helpers/generarJWT.js';
import { userModel } from '../models/user.models.js';
import bcrypt from 'bcrypt';
export const userControllers = {};

// Controlador de registro
userControllers.register = async (req, res) => {
  try {
    const { NombreUsuario, ApellidoUsuario, Genero, Email, Contrasenia } =
      req.body;

    console.log(req.body);
    // Verificar si el email ya existe
    const existeUsuario = await userModel.findOne({ Email });
    if (existeUsuario) {
      return res.status(400).json({ msg: 'El correo ya está registrado' });
    }

    // Hash de la contraseña
    const hashContrasenia = bcrypt.hashSync(Contrasenia, 10);

    // Crear el nuevo usuario
    const nuevoUsuario = new userModel({
      NombreUsuario,
      ApellidoUsuario,
      Genero,
      Email,
      Contrasenia: hashContrasenia,
    });

    // Guardar el usuario en la base de datos
    await nuevoUsuario.save();

    res.status(200).json({ msg: 'Usuario registrado con éxito' });
  } catch (error) {
    console.error('Error en el registro:', error);
    res.status(500).json({ msg: 'Error interno del servidor' });
  }
};

// Controlador de login
userControllers.login = async (req, res) => {
  const { Email, Contrasenia } = req.body;

  try {
    // Buscar al usuario por email
    const usuario = await userModel.findOne({ Email });

    if (!usuario) {
      console.error('Usuario no encontrado');
      return res
        .status(404)
        .json({ msg: 'El usuario o contraseña no coinciden' });
    }

    // Verificar la contraseña
    const validarContrasenia = bcrypt.compareSync(
      Contrasenia,
      usuario.Contrasenia
    );

    if (!validarContrasenia) {
      console.error('Contraseña incorrecta');
      return res
        .status(401)
        .json({ msg: 'El usuario o contraseña no coinciden' });
    }

    // Generar el JWT
    const token = await generarJWT({ id: usuario._id });

    return res.json({ msg: 'Inicio de sesión exitoso', token });
  } catch (error) {
    console.error('Error en el proceso de login:', error);
    return res.status(500).json({ msg: 'Error interno del servidor' });
  }
};
