import { Router } from "express";
import LeaderBoardController from "../controllers/LeaderBoardController";
import { ensureAuth

 } from "../middleware/auth";
const router = Router();

router.post("/:name/score", ensureAuth , LeaderBoardController.postScore);

// Obtener scores por usuario
router.get("/user/:id", LeaderBoardController.getByUser);
// Obtener scores del usuario autenticado
router.get("/me", ensureAuth, LeaderBoardController.getMyScores);

router.get("/:name/top", LeaderBoardController.getTop);

export default router;