import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/mongodb";
import CareerApplication from "@/models/CareerApplication";
import { withAdmin } from "@/lib/auth";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  if (req.method === "POST") {
    // Public: anyone can apply
    try {
      const { careerTitle, name, email, phone, coverLetter, resumeUrl } =
        req.body;

      if (!careerTitle || !name || !email) {
        return res
          .status(400)
          .json({ message: "Career title, name, and email are required" });
      }

      await CareerApplication.create({
        careerTitle,
        name,
        email,
        phone: phone || "",
        coverLetter: coverLetter || "",
        resumeUrl: resumeUrl || "",
      });

      return res
        .status(201)
        .json({ message: "Application submitted successfully" });
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }

  if (req.method === "GET") {
    // Protected: admin only
    return withAdmin(async (_req, res) => {
      try {
        const applications = await CareerApplication.find().sort({
          createdAt: -1,
        });
        return res.status(200).json(applications);
      } catch (error: any) {
        return res.status(500).json({ message: error.message });
      }
    })(req, res);
  }

  return res.status(405).json({ message: "Method not allowed" });
}

export default handler;
