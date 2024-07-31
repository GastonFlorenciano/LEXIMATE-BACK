const mysql = require('mysql2/promise');

const conexionDB = async () => {
    try {
        const connection = await mysql.createConnection ({
            host: 'localhost',
            port: 3306,
            database: 'leximate',
            user: 'root',
            password: ''
        })
        console.log('Conexión a la base de datos exitosa');
        return connection;
    } catch (err) {
        console.log('Error al conectar', err);
        throw err;
    }
}

module.exports = {
    conexionDB
}