import { Request , Response } from "express";
import { LeaderBoard } from "../models/LeaderBoard";
import { User } from "../models/User";


class LeaderBoardController {

    // Guarda o actualiza (solo si es mejor) la score del usuario para un juego
    async postScore ( req : Request , res : Response ) {
        try {
            const userId = (req as any).user?.userId;  // Cambiado para usar userId del token
            const { name } = req.params;
            const { score } = req.body;
  console.log("[postScore] headers:", req.headers);
  console.log("[postScore] params:", req.params);
  console.log("[postScore] body:", req.body);
  console.log("[postScore] req.user:", (req as any).user);
  console.log("[postScore] userId:", userId);
  console.log("[postScore] name:", name);
  console.log("[postScore] score:", score, typeof score);

            if (!userId) {
                return res.status(400).json({ message: "Usuario no autenticado o token inválido" });
            }
            if (!name) {
                return res.status(400).json({ message: "Nombre del juego es requerido" });
            }
            if (typeof score !== "number") {
                return res.status(400).json({ message: "Score debe ser un número" });
            }

            const user = await User.findById(userId).select("username");
            if (!user) return res.status(404).json({ message: "User not found" });

            // Upsert atómico: crea si no existe; $max mantiene la mayor puntuación
            const updated = await LeaderBoard.findOneAndUpdate(
                { name, user_id: user._id },
                {
                    $setOnInsert: { name, user_id: user._id, username: user.username },
                    $max: { score }
                },
                { upsert: true, new: true, setDefaultsOnInsert: true }
            );

            // Si el score resultante es igual al enviado, fue creación o mejora
            const isNewOrImproved = updated && updated.score === score;
            return res.status(200).json({ message: "Score processed", best: updated?.score, improved: !!isNewOrImproved });
        } catch (err: any) {
            if (err?.code === 11000) return res.status(409).json({ message: "Concurrent update, try again" });
            return res.status(500).json({ message: "Error saving score", error: err?.message });
        }
    }

    // Obtener top N del juego
    async getTop ( req: Request , res: Response ) {
        try {
            const { name } = req.params;
            const limit = Math.min(Number(req.query.limit) || 50, 200);
            if (!name) return res.status(400).json({ message: "Missing game name" });

            const top = await LeaderBoard.find({ name })
                .sort({ score: -1 })
                .limit(limit)
                .select("username score user_id -_id");

            return res.status(200).json({ game: name, top });
        } catch (err: any) {
            return res.status(500).json({ message: "Error fetching leaderboard", error: err?.message });
        }
    }

};



export default new LeaderBoardController();