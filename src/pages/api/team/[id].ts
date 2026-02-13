// @ts-nocheck
import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/mongodb";
import TeamMember from "@/models/TeamMember";
import { withAdmin } from "@/lib/auth";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  const { id } = req.query;

  if (req.method === "PUT") {
    return withAdmin(async (_req, res) => {
      try {
        const update = req.body;
        const member = await TeamMember.findByIdAndUpdate(id, update, {
          new: true,
        });

        if (!member) {
          return res.status(404).json({ message: "Team member not found" });
        }

        return res.status(200).json(member);
      } catch (error: any) {
        return res.status(500).json({ message: error.message });
      }
    })(req, res);
  }

  if (req.method === "DELETE") {
    return withAdmin(async (_req, res) => {
      try {
        const member = await TeamMember.findByIdAndDelete(id);

        if (!member) {
          return res.status(404).json({ message: "Team member not found" });
        }

        return res.status(200).json({ message: "Member deleted" });
      } catch (error: any) {
        return res.status(500).json({ message: error.message });
      }
    })(req, res);
  }

  return res.status(405).json({ message: "Method not allowed" });
}

export default handler;
