import { Router } from "express";
import jwt from "jsonwebtoken";
import passport from "passport";
import AuthController from "../controllers/AuthController";
import { ensureAuth } from "../middleware/auth";

const router = Router();

// Auth routes
router.post("/register" , AuthController.register);
router.post("/login" , AuthController.login);

// CRUD routes (protected by auth middleware)
router.get("/me", ensureAuth, AuthController.getMe);
router.get("/users", ensureAuth, AuthController.getUsers);
router.get("/users/:id", ensureAuth, AuthController.getUserById);
router.put("/users/:id", ensureAuth, AuthController.updateUser);
router.delete("/users/:id", ensureAuth, AuthController.deleteUser);

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

    // Redirige al login con el token para que lo procese desde ahí
    const frontend = process.env.FRONTEND_URL || "http://localhost:5173";
    return res.redirect(`${frontend}/login?googleToken=${token}`);
  }
);

router.get("/login-failed", (_req, res) => res.status(401).json({ message: "Google authentication failed" }));

export default router;

