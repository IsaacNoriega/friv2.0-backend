import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

dotenv.config(); // Carga las variables de entorno desde el archivo .env
const PORT = process.env.PORT || 3000; // Utiliza el puerto 3000 si no se especifica en .env


const app = express(); // Crea una instancia de Express

app.get('/', (req, res) => {
  res.send('Hello, World!'); // Responde con "Hello, World!" en la ruta raíz
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`); // Inicia el servidor en el puerto especificado
});
