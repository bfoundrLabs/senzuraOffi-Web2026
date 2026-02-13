// @ts-nocheck
import mongoose from "mongoose";

export interface IProject {
  name: string;
  slug: string;
  description: string;
  favicon: string;
  images: string[];
  sourceCodeHref: string;
  liveWebsiteHref: string;
  tags: string[];
  published: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    favicon: { type: String, default: "/favicon.png" },
    images: [{ type: String }],
    sourceCodeHref: { type: String, default: "" },
    liveWebsiteHref: { type: String, default: "" },
    tags: [{ type: String }],
    published: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
  },
  { timestamps: true },
);

const Project = (mongoose.models.Project ||
  mongoose.model("Project", ProjectSchema)) as any;
export default Project;
