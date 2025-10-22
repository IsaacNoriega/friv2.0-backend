import { Router } from "express";
import Auth from './auth';
import LeaderBoard from './leaderBoard';

const router = Router();
router.use("/auth" , Auth);
router.use("/leaderboard" , LeaderBoard);

export default router;