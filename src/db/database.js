const mysql = require('mysql2/promise');

const conexionDB = async () => {
    try {
        const connection = await mysql.createConnection ({
            host: 'localhost',
            port: 3307,
            database: 'leximate',
            user: 'root',
            password: ''
        })
        console.log('Conexión a la base de datos exitosa');
    } catch (err) {
        console.log('Error al conectar', err);
        throw err;
    }
}