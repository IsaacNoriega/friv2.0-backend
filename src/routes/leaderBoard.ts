import { Router } from "express";
import LeaderBoardController from "../controllers/LeaderBoardController";
import { ensureAuth

 } from "../middleware/auth";
const router = Router();

router.post("/:name/score", ensureAuth , LeaderBoardController.postScore);
router.get("/:name/top", LeaderBoardController.getTop);

export default router;