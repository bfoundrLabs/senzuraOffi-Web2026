import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/mongodb";
import Contact from "@/models/Contact";
import { withAdmin } from "@/lib/auth";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  if (req.method === "POST") {
    // Public: anyone can submit a contact form
    try {
      const { name, email, subject, message } = req.body;

      if (!name || !email || !subject || !message) {
        return res.status(400).json({ message: "All fields are required" });
      }

      await Contact.create({ name, email, subject, message });
      return res
        .status(201)
        .json({ status: 201, message: "Message sent successfully" });
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }

  if (req.method === "GET") {
    // Protected: admin only
    return withAdmin(async (_req, res) => {
      try {
        const contacts = await Contact.find().sort({ createdAt: -1 });
        return res.status(200).json(contacts);
      } catch (error: any) {
        return res.status(500).json({ message: error.message });
      }
    })(req, res);
  }

  return res.status(405).json({ message: "Method not allowed" });
}

export default handler;
