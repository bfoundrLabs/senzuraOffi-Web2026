import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/mongodb";
import Admin from "@/models/Admin";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    await dbConnect();

    const existingAdmin = await Admin.findOne({ email: "admin@senzura.com" });
    if (existingAdmin) {
      return res.status(200).json({ message: "Admin user already exists" });
    }

    const hashedPassword = await bcrypt.hash("admin123", 12);

    await Admin.create({
      email: "admin@senzura.com",
      password: hashedPassword,
      name: "Senzura Admin",
      role: "admin",
    });

    return res.status(201).json({ message: "Admin user seeded successfully" });
  } catch (error: any) {
    console.error("Seed error:", error);
    return res
      .status(500)
      .json({ message: error.message || "Internal server error" });
  }
}
