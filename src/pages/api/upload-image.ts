// @ts-nocheck
import type { NextApiRequest, NextApiResponse } from "next";
import { withAdmin } from "@/lib/auth";

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "10mb",
    },
  },
};

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  return withAdmin(async (_req, res) => {
    try {
      const { image } = req.body;

      if (!image) {
        return res.status(400).json({ message: "Image data is required" });
      }

      const apiKey = process.env.IMGBB_API_KEY;
      if (!apiKey) {
        return res
          .status(500)
          .json({ message: "ImgBB API key not configured" });
      }

      // image should be base64 string (without the data:image/...;base64, prefix)
      const base64Data = image.includes("base64,")
        ? image.split("base64,")[1]
        : image;

      const formData = new URLSearchParams();
      formData.append("key", apiKey);
      formData.append("image", base64Data);

      const response = await fetch("https://api.imgbb.com/1/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!data.success) {
        return res
          .status(400)
          .json({ message: "Failed to upload image", error: data.error });
      }

      return res.status(200).json({
        url: data.data.display_url,
        thumb: data.data.thumb?.url || data.data.display_url,
        delete_url: data.data.delete_url,
      });
    } catch (error: any) {
      return res
        .status(500)
        .json({ message: error.message || "Upload failed" });
    }
  })(req, res);
}

export default handler;
