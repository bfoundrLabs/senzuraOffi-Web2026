// @ts-nocheck
import mongoose from "mongoose";

export interface IContact {
  name: string;
  email: string;
  subject: string;
  message: string;
  read: boolean;
  createdAt: Date;
}

const ContactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  subject: { type: String, required: true },
  message: { type: String, required: true },
  read: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

const Contact = (mongoose.models.Contact ||
  mongoose.model("Contact", ContactSchema)) as any;
export default Contact;
