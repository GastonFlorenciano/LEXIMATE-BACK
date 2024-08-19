import { app } from './app.js';
import { connectDb } from './utils/dataBase.js';
import { PORT } from './config.js';

//ponemos en escucha al servidor
app.listen(PORT, () => {
  connectDb();
  console.log('Servidor corriendo en el puerto:', PORT);
});
