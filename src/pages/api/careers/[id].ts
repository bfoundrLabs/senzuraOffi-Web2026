import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/mongodb";
import Career from "@/models/Career";
import { withAdmin } from "@/lib/auth";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();
  const { id } = req.query;

  if (req.method === "PUT") {
    return withAdmin(async (req, res) => {
      try {
        const career = await Career.findByIdAndUpdate(id, req.body, {
          new: true,
        });
        if (!career) {
          return res.status(404).json({ message: "Career not found" });
        }
        return res.status(200).json(career);
      } catch (error: any) {
        return res.status(500).json({ message: error.message });
      }
    })(req, res);
  }

  if (req.method === "DELETE") {
    return withAdmin(async (req, res) => {
      try {
        const career = await Career.findByIdAndDelete(id);
        if (!career) {
          return res.status(404).json({ message: "Career not found" });
        }
        return res.status(200).json({ message: "Career deleted" });
      } catch (error: any) {
        return res.status(500).json({ message: error.message });
      }
    })(req, res);
  }

  return res.status(405).json({ message: "Method not allowed" });
}

export default handler;
