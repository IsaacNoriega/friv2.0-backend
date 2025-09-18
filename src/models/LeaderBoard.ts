import { Schema, model } from 'mongoose';

// Define el esquema del leaderboard
const LeaderBoardSchema = new Schema({
    name: { type: String, required: true },
    score: { type: Number, required: true },
    user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
});

// Exporta el modelo del leaderboard
export const LeaderBoard = model('LeaderBoard', LeaderBoardSchema);