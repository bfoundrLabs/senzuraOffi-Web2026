// @ts-nocheck
import mongoose from "mongoose";

export interface ICareerApplication {
  careerTitle: string;
  name: string;
  email: string;
  phone: string;
  coverLetter: string;
  resumeUrl: string;
  createdAt: Date;
}

const CareerApplicationSchema = new mongoose.Schema({
  careerTitle: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, default: "" },
  coverLetter: { type: String, default: "" },
  resumeUrl: { type: String, default: "" },
  createdAt: { type: Date, default: Date.now },
});

const CareerApplication = (mongoose.models.CareerApplication ||
  mongoose.model("CareerApplication", CareerApplicationSchema)) as any;
export default CareerApplication;
