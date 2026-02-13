// @ts-nocheck
import mongoose from "mongoose";

export interface IBlog {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  tags: string[];
  author: string;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const BlogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    excerpt: { type: String, required: true },
    content: { type: String, required: true },
    coverImage: { type: String, default: "" },
    tags: [{ type: String }],
    author: { type: String, default: "Senzura Codelabs" },
    published: { type: Boolean, default: false },
  },
  { timestamps: true },
);

const Blog = (mongoose.models.Blog ||
  mongoose.model("Blog", BlogSchema)) as any;
export default Blog;
