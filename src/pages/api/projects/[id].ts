import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/mongodb";
import Project from "@/models/Project";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  await dbConnect();
  const { id } = req.query;

  if (req.method === "GET") {
    const project = await Project.findById(id);
    if (!project) return res.status(404).json({ error: "Project not found" });
    return res.status(200).json(project);
  }

  if (req.method === "PUT") {
    try {
      const updates = req.body;
      if (updates.name && !updates.slug) {
        updates.slug = updates.name
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "");
      }
      const project = await Project.findByIdAndUpdate(id, updates, {
        new: true,
      });
      if (!project) return res.status(404).json({ error: "Project not found" });
      return res.status(200).json(project);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Server error";
      return res.status(500).json({ error: message });
    }
  }

  if (req.method === "DELETE") {
    const project = await Project.findByIdAndDelete(id);
    if (!project) return res.status(404).json({ error: "Project not found" });
    return res.status(200).json({ message: "Deleted" });
  }

  res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
  return res.status(405).json({ error: `Method ${req.method} not allowed` });
}
