import { Router } from "express";
import Auth from './Auth';


const router = Router();
router.use("/auth" , Auth);

export default router;