// @ts-nocheck
import mongoose from "mongoose";

export interface IAdmin {
  email: string;
  password: string;
  name: string;
  role: string;
  createdAt: Date;
}

const AdminSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  role: { type: String, default: "admin" },
  createdAt: { type: Date, default: Date.now },
});

const Admin = (mongoose.models.Admin ||
  mongoose.model("Admin", AdminSchema)) as any;
export default Admin;
