import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import index from './routes/index';
import passport from 'passport';
import { configureGooglePassport } from './middleware/google';
import cors from 'cors'; // 👈 Importa cors

dotenv.config(); // Carga las variables de entorno desde el archivo .env

const PORT = process.env.PORT || 3000;
const DB_URL = process.env.DB_URL || '';

const app = express();

// =======================
// MIDDLEWARES
// =======================

// ✅ Habilita CORS para todas las solicitudes
app.use(cors({
  origin: '*', // o reemplaza '*' por tu frontend (por ej: 'http://localhost:5173')
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(bodyParser.json()); // Middleware para parsear JSON
app.use(passport.initialize()); // Inicializa Passport
configureGooglePassport(); // Configura la estrategia de Google

// =======================
// RUTAS
// =======================
app.use('/', index); // Corrige el path vacío a '/'

// =======================
// CONEXIÓN A LA DB
// =======================
mongoose.connect(DB_URL)
  .then(() => {
    console.log('✅ Connected to the database');
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('❌ Database connection error:', error);
  });
