// @ts-nocheck
import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/mongodb";
import TeamMember from "@/models/TeamMember";
import { withAdmin } from "@/lib/auth";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  if (req.method === "GET") {
    try {
      // Public: return active members only (unless admin requests all)
      const showAll = req.query.all === "true";
      const filter = showAll ? {} : { active: true };
      const members = await TeamMember.find(filter).sort({ order: 1 });
      return res.status(200).json(members);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }

  if (req.method === "POST") {
    return withAdmin(async (_req, res) => {
      try {
        const { name, role, image, linkedinUrl, active } = req.body;

        if (!name || !role) {
          return res
            .status(400)
            .json({ message: "Name and role are required" });
        }

        const count = await TeamMember.countDocuments();
        const member = await TeamMember.create({
          name,
          role,
          image: image || "",
          linkedinUrl: linkedinUrl || "",
          active: active !== undefined ? active : true,
          order: count,
        });

        return res.status(201).json(member);
      } catch (error: any) {
        return res.status(500).json({ message: error.message });
      }
    })(req, res);
  }

  return res.status(405).json({ message: "Method not allowed" });
}

export default handler;
