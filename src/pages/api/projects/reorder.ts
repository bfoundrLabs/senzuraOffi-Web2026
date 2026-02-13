import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/mongodb";
import Project from "@/models/Project";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "PUT") {
    res.setHeader("Allow", ["PUT"]);
    return res.status(405).json({ error: `Method ${req.method} not allowed` });
  }

  await dbConnect();

  try {
    const { items } = req.body;
    if (!Array.isArray(items)) {
      return res.status(400).json({ error: "items array required" });
    }

    const ops = items.map((item: { id: string; order: number }) =>
      Project.findByIdAndUpdate(item.id, { order: item.order }),
    );
    await Promise.all(ops);

    return res.status(200).json({ message: "Reorder successful" });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Server error";
    return res.status(500).json({ error: message });
  }
}
