import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export function ensureAuth(req: Request, res: Response, next: NextFunction) {
  const auth = req.header("Authorization") || "";
  const token = auth.startsWith("Bearer ") ? auth.slice(7) : auth;
  if (!token) return res.status(401).json({ message: "No token provided" });

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET as string) as any;
    (req as any).user = { userId: payload.userId, email: payload.email };
    next();
  } catch {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}