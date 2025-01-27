// Import dependencies
const express = require("express");
const multer = require("multer");
const { uploadFile } = require("../config/s3");
const sharp = require("sharp");

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

const uploadFileController = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file provided" });
    }

    const compressedBuffer = await sharp(req.file.buffer)
      .resize({ width: 1024 })
      .jpeg({ quality: 80 })
      .toBuffer();

    const compressedFile = {
      ...req.file,
      buffer: compressedBuffer,
    };

    const fileUrl = await uploadFile(compressedFile);

    res.status(200).json({ message: "File uploaded successfully", url: fileUrl });
  } catch (error) {
    console.error("Error uploading file:", error);
    res.status(500).json({ message: "Error uploading file", error: error.message });
  }
};

///Todo: Handle delete file from S3

router.post("/upload", upload.single("file"), uploadFileController);

module.exports = router;