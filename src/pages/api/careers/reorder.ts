import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/mongodb";
import Career from "@/models/Career";
import { withAdmin } from "@/lib/auth";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "PUT") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  return withAdmin(async (req, res) => {
    try {
      await dbConnect();

      const { orderedIds } = req.body as { orderedIds: string[] };

      if (!orderedIds || !Array.isArray(orderedIds)) {
        return res
          .status(400)
          .json({ message: "orderedIds array is required" });
      }

      const bulkOps = orderedIds.map((id, index) => ({
        updateOne: {
          filter: { _id: id },
          update: { $set: { order: index } },
        },
      }));

      await Career.bulkWrite(bulkOps);

      return res.status(200).json({ message: "Careers reordered" });
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  })(req, res);
}

export default handler;
