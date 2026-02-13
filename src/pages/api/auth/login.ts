import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import { serialize } from "cookie";
import dbConnect from "@/lib/mongodb";
import Admin from "@/models/Admin";
import { signToken } from "@/lib/auth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    await dbConnect();

    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = signToken({
      id: admin._id.toString(),
      name: admin.name,
      email: admin.email,
      role: admin.role,
    });

    res.setHeader(
      "Set-Cookie",
      serialize("admin_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: "/",
      }),
    );

    return res.status(200).json({
      message: "Login successful",
      admin: { name: admin.name, email: admin.email, role: admin.role },
    });
  } catch (error: any) {
    console.error("Login error:", error);
    return res
      .status(500)
      .json({ message: error.message || "Internal server error" });
  }
}
