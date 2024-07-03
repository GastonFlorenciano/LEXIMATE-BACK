const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

//inicializamos
const app = express();
const PORT = process.env.PORT ||  3000;

//middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

//nuestras rutas
app.use(require('./routes/auth.routes.js'));

//ponemos en escucha al servidor
app.listen(PORT, () => {
    console.log('Servidor corriendo en el puerto:', PORT);
})