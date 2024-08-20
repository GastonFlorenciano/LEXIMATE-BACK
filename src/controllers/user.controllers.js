import { userService } from '../services/user.services.js';
import { authService } from '../services/auth.services.js';

export const userControllers = {};

// Controlador de registro
userControllers.register = async (req, res) => {
  try {
    const response = await userService.registerUser(req.body);
    res.status(201).json(response);
  } catch (error) {
    console.error('Error en el registro:', error);
    res.status(500).json({ msg: 'Error en el registro: ' + error.message });
  }
};

// Controlador de login
userControllers.login = async (req, res) => {
  try {
    const response = await authService.loginUser(req.body);
    res.json(response);
  } catch (error) {
    console.error('Error en el proceso de login:', error);
    res.status(500).json({ msg: 'Error interno del servidor' });
  }
};
