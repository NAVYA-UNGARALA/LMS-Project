import express from "express";
import { uploadMedia } from "../utils/cloudinary.js";
import upload from "../utils/multer.js";

const router = express.Router();

router.post("/upload-video", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: "No file provided" });
    }

    const result = await uploadMedia(req.file.path);
    const { secure_url, public_id } = result;

    res.status(200).json({
      success: true,
      message: "File Uploaded Successfully",
      data: {
        url: secure_url,
        public_id,
      },
    });
  } catch (error) {
    console.error("Upload Error:", error);
    res.status(500).json({ success: false, message: error.message || "Error uploading file" });
  }
});

export default router;
