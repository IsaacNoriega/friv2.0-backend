import { Router } from "express";

import Auth from './auth';
import LeaderBoard from './leaderBoard';
import Ping from './ping';

const router = Router();

router.use("/auth" , Auth);
router.use("/leaderboard" , LeaderBoard);
router.use("/ping", Ping);

export default router;