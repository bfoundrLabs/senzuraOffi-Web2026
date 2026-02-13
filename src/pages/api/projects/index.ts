import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/mongodb";
import Project from "@/models/Project";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  await dbConnect();

  if (req.method === "GET") {
    const { all } = req.query;
    const filter = all === "true" ? {} : { published: true };
    const projects = await Project.find(filter).sort({
      order: 1,
      createdAt: -1,
    });
    return res.status(200).json(projects);
  }

  if (req.method === "POST") {
    try {
      const {
        name,
        description,
        favicon,
        images,
        sourceCodeHref,
        liveWebsiteHref,
        tags,
        published,
        order,
      } = req.body;
      const slug = name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
      const project = await Project.create({
        name,
        slug,
        description,
        favicon: favicon || "/favicon.png",
        images: images || [],
        sourceCodeHref: sourceCodeHref || "",
        liveWebsiteHref: liveWebsiteHref || "",
        tags: tags || [],
        published: published ?? false,
        order: order ?? 0,
      });
      return res.status(201).json(project);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Server error";
      return res.status(500).json({ error: message });
    }
  }

  res.setHeader("Allow", ["GET", "POST"]);
  return res.status(405).json({ error: `Method ${req.method} not allowed` });
}
