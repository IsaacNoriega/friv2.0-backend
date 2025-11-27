import dotenv from 'dotenv';
import mongoose from 'mongoose';
import app from './app';

dotenv.config();

const PORT = process.env.PORT || 3000;
const DB_URL = process.env.DB_URL || '';

mongoose.connect(DB_URL)
  .then(() => {
    console.log('✅ Connected to the database');
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('❌ Error connecting to the database:', error);
  });