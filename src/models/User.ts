import { Schema , model } from 'mongoose';

// Define el esquema del usuario
const UserSchema = new Schema({
    username : { type: String, required: true, unique: true },
    email : { type: String, required: true, unique: true },
    password : { type: String, required: true },
    hasPaid : { type: Boolean, default: false },
});

// Exporta el modelo del usuario
export const User = model('User', UserSchema);