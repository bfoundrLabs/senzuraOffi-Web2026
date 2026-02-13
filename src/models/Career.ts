// @ts-nocheck
import mongoose from "mongoose";

export interface ICareer {
  title: string;
  position: string;
  type: string;
  location: string;
  description: string;
  requirements: string[];
  benefits: string[];
  active: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const CareerSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    position: { type: String, required: true },
    type: { type: String, required: true },
    location: { type: String, required: true },
    description: { type: String, required: true },
    requirements: [{ type: String }],
    benefits: [{ type: String }],
    active: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true },
);

const Career = (mongoose.models.Career ||
  mongoose.model("Career", CareerSchema)) as any;
export default Career;
