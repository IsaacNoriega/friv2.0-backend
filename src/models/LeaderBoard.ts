import { Schema, model } from 'mongoose';

// Define el esquema del leaderboard
const LeaderBoardSchema = new Schema({
    name: { type: String, required: true, index: true }, // nombre del juego
    score: { type: Number, required: true },
    user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    username: { type: String, required: false }, // denormalización para lecturas rápidas
});

// Índice único: una fila por (name, user_id)
LeaderBoardSchema.index({ name: 1, user_id: 1 }, { unique: true });

// Exporta el modelo del leaderboard
export const LeaderBoard = model('LeaderBoard', LeaderBoardSchema);