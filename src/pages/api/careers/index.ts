import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/mongodb";
import Career from "@/models/Career";
import { withAdmin } from "@/lib/auth";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  if (req.method === "GET") {
    try {
      const onlyActive = req.query.all !== "true";
      const filter = onlyActive ? { active: true } : {};
      const careers = await Career.find(filter).sort({
        order: 1,
        createdAt: -1,
      });
      return res.status(200).json(careers);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }

  if (req.method === "POST") {
    return withAdmin(async (req, res) => {
      try {
        const {
          title,
          position,
          type,
          location,
          description,
          requirements,
          benefits,
          active,
          order,
        } = req.body;

        if (!title || !position || !type || !location || !description) {
          return res.status(400).json({ message: "Required fields missing" });
        }

        const career = await Career.create({
          title,
          position,
          type,
          location,
          description,
          requirements: requirements || [],
          benefits: benefits || [],
          active: active ?? true,
          order: order ?? 0,
        });

        return res.status(201).json(career);
      } catch (error: any) {
        return res.status(500).json({ message: error.message });
      }
    })(req, res);
  }

  return res.status(405).json({ message: "Method not allowed" });
}

export default handler;
