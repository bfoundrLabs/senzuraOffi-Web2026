import type { NextApiRequest, NextApiResponse } from "next";
import { getTokenFromRequest, verifyToken } from "@/lib/auth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const token = getTokenFromRequest(req);
  if (!token) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  const admin = verifyToken(token);
  if (!admin) {
    return res.status(401).json({ message: "Invalid token" });
  }

  return res.status(200).json({ admin });
}
