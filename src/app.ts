import express from 'express';
import bodyParser from 'body-parser';
import passport from 'passport';
import { configureGooglePassport } from './middleware/google';
import cors from 'cors';
import index from './routes/index';

const app = express();

// Middlewares
app.use(cors({
  origin: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));
app.use(bodyParser.json());
app.use(passport.initialize());
configureGooglePassport();

// Rutas
app.use('/', index);

export default app;
