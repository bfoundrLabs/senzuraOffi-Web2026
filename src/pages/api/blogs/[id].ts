import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/mongodb";
import Blog from "@/models/Blog";
import { withAdmin } from "@/lib/auth";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();
  const { id } = req.query;

  if (req.method === "GET") {
    try {
      // Try by slug first, then by _id
      let blog = await Blog.findOne({ slug: id as string });
      if (!blog) {
        blog = await Blog.findById(id);
      }
      if (!blog) {
        return res.status(404).json({ message: "Blog not found" });
      }
      return res.status(200).json(blog);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }

  if (req.method === "PUT") {
    return withAdmin(async (req, res) => {
      try {
        const blog = await Blog.findByIdAndUpdate(id, req.body, { new: true });
        if (!blog) {
          return res.status(404).json({ message: "Blog not found" });
        }
        return res.status(200).json(blog);
      } catch (error: any) {
        return res.status(500).json({ message: error.message });
      }
    })(req, res);
  }

  if (req.method === "DELETE") {
    return withAdmin(async (req, res) => {
      try {
        const blog = await Blog.findByIdAndDelete(id);
        if (!blog) {
          return res.status(404).json({ message: "Blog not found" });
        }
        return res.status(200).json({ message: "Blog deleted" });
      } catch (error: any) {
        return res.status(500).json({ message: error.message });
      }
    })(req, res);
  }

  return res.status(405).json({ message: "Method not allowed" });
}

export default handler;
