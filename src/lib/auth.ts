import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import { parse } from "cookie";

const JWT_SECRET = process.env.JWT_SECRET || "senzura-admin-secret-key-2026";

export interface AdminTokenPayload {
  id: string;
  name: string;
  email: string;
  role: string;
}

export function signToken(payload: AdminTokenPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
}

export function verifyToken(token: string): AdminTokenPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as AdminTokenPayload;
  } catch {
    return null;
  }
}

export function getTokenFromRequest(req: NextApiRequest): string | null {
  const cookies = parse(req.headers.cookie || "");
  return cookies.admin_token || null;
}

export function withAdmin(
  handler: (
    // eslint-disable-next-line no-unused-vars
    req: NextApiRequest,
    // eslint-disable-next-line no-unused-vars
    res: NextApiResponse,
    // eslint-disable-next-line no-unused-vars
    admin: AdminTokenPayload,
  ) => Promise<void>,
) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const token = getTokenFromRequest(req);
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const admin = verifyToken(token);
    if (!admin) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }

    return handler(req, res, admin);
  };
}
