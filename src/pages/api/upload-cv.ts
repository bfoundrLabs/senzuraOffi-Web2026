// @ts-nocheck
import type { NextApiRequest, NextApiResponse } from "next";
import { v2 as cloudinary } from "cloudinary";

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "20mb",
    },
  },
};

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { file, fileName } = req.body;

    if (!file) {
      return res.status(400).json({ message: "File data is required" });
    }

    const folder = "senzura-cvs";

    // Cloudinary accepts data URIs for the `file` parameter.
    const publicId = fileName
      ? `${fileName
          .replace(/\.[^/.]+$/, "")
          .replace(/[^a-zA-Z0-9_-]/g, "_")}_${Date.now()}`
      : undefined;

    const uploadOptions: any = {
      resource_type: "raw",
      folder,
    };

    if (publicId) uploadOptions.public_id = publicId;

    try {
      const result = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload(
          file,
          uploadOptions,
          (error: any, result: any) => {
            if (error) return reject(error);
            resolve(result);
          },
        );
      });

      const data = result as any;

      return res.status(200).json({
        url: data.secure_url,
        publicId: data.public_id,
        format: data.format,
        originalFilename: data.original_filename,
      });
    } catch (cloudErr: any) {
      // Return detailed Cloudinary error when available
      const msg =
        (cloudErr && cloudErr.message) ||
        JSON.stringify(cloudErr) ||
        "Cloudinary upload failed";
      return res.status(500).json({ message: msg });
    }
  } catch (error: any) {
    return res.status(500).json({ message: error.message || "Upload failed" });
  }
}
