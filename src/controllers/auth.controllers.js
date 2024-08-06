const { generarJWT } = require('../helpers/generarJWT.js');
const { conexionDB } = require('../db/database.js');
const bcrypt = require('bcrypt');

const ctrl = {};

ctrl.register = async (req, res) => {
    const { NombreUsuario, ApellidoUsuario, Genero, Email, Contrasenia } = req.body;

    console.log(req.body);

    const conexion = await conexionDB();

    const sql = `INSERT INTO usuario (NombreUsuario, ApellidoUsuario, Genero, Email, Contrasenia) VALUES (?,?,?,?,?)`;

    const hashContrasenia = bcrypt.hashSync(Contrasenia, 10);

    await conexion.query(sql, [NombreUsuario, ApellidoUsuario, Genero, Email, hashContrasenia]);

    res.status(200).send();
}

ctrl.login = async (req, res) => {
    const { Email, Contrasenia } = req.body;

    const connection = await conexionDB();

    const sql = 'SELECT * FROM usuario WHERE Email=? LIMIT 1';

    try {
        const [buscarUsuario] = await connection.query(sql, [Email]);

        if (!buscarUsuario[0]) {
            console.error('Usuario no encontrado');
            return res.status(404).json({ msg: 'El usuario o contraseña no coinciden' });
        }

        const validarContrasenia = bcrypt.compareSync(Contrasenia, buscarUsuario[0].Contrasenia);

        if (!validarContrasenia) {
            console.error('Contraseña incorrecta');
            return res.status(401).json({ msg: 'El usuario o contraseña no coinciden' });
        }

        const token = await generarJWT({ id: buscarUsuario[0].IdUsuario });

        return res.json({
            msg: 'Inicio de sesión exitoso',
            token
        });
    } catch (error) {
        console.error('Error en el proceso de login:', error);
        return res.status(500).json({ msg: 'Error interno del servidor' });
    }
};

module.exports = ctrl;