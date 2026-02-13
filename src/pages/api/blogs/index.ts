import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/mongodb";
import Blog from "@/models/Blog";
import { withAdmin } from "@/lib/auth";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  if (req.method === "GET") {
    try {
      // Public: only published blogs; Admin: all blogs (check query param)
      const filter = req.query.all === "true" ? {} : { published: true };
      const blogs = await Blog.find(filter).sort({ createdAt: -1 });
      return res.status(200).json(blogs);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }

  if (req.method === "POST") {
    // Protected: admin only
    return withAdmin(async (req, res) => {
      try {
        const {
          title,
          slug,
          excerpt,
          content,
          coverImage,
          tags,
          author,
          published,
        } = req.body;

        if (!title || !slug || !excerpt || !content) {
          return res.status(400).json({
            message: "Title, slug, excerpt, and content are required",
          });
        }

        const existing = await Blog.findOne({ slug });
        if (existing) {
          return res
            .status(409)
            .json({ message: "A blog with this slug already exists" });
        }

        const blog = await Blog.create({
          title,
          slug,
          excerpt,
          content,
          coverImage: coverImage || "",
          tags: tags || [],
          author: author || "Senzura Codelabs",
          published: published ?? false,
        });

        return res.status(201).json(blog);
      } catch (error: any) {
        return res.status(500).json({ message: error.message });
      }
    })(req, res);
  }

  return res.status(405).json({ message: "Method not allowed" });
}

export default handler;
