import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import mongoose from 'mongoose';


dotenv.config(); // Carga las variables de entorno desde el archivo .env

const PORT = process.env.PORT || 3000; // Utiliza el puerto 3000 si no se especifica en .env
const DB_URL = process.env.DB_URL || ''; // URL de la base de datos desde .env

const app = express(); // Crea una instancia de Express


// Conexión a la base de datos y arranque del servidor
mongoose.connect(DB_URL).then(() => {
  console.log('Connected to the database');
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  })
}).catch((error) => {
  console.error('Database connection error:', error);
});

