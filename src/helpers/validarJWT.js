const jwt = require('jsonwebtoken');
const { conexionDB } = require('../db/database.js');
// const { token } = require('morgan');

const validarJWT = async (token) => {

    try {
        const { id } = jwt.verify(token, 'my secret');

        const connection = await conexionDB();

        const [usuario] = await connection.query('SELECT * FROM usuario WHERE IdUsuario = ? LIMIT 1', id)

        if (!usuario) {
            return false
        } else {
            return usuario[0];
        }
    } catch (err) {
        console.log('error');
        return false;
    }
}

module.exports = {
    validarJWT
}
