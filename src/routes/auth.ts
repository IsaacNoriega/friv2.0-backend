import { Router } from "express";
import jwt from "jsonwebtoken";
import passport from "passport";
import AuthController from "../controllers/AuthController";

const router = Router();

router.post("/register" , AuthController.register);
router.post("/login" , AuthController.login);

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"], session: false })
);

// Callback de Google
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/auth/login-failed", session: false }),
  (req, res) => {
    const user = req.user as { id: string; email: string };
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET || "default",
      { expiresIn: "1h" }
    );

    // Devuelve JSON o redirige al frontend con el token
    if (req.accepts("json")) return res.json({ token, message: "Google login successful" });

    const frontend = process.env.FRONTEND_URL || "http://localhost:5173";
    return res.redirect(`${frontend}/auth/callback#token=${token}`);
  }
);

router.get("/login-failed", (_req, res) => res.status(401).json({ message: "Google authentication failed" }));

export default router;

