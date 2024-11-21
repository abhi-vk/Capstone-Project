const express = require("express");
const router = express.Router();
const upload = require("../middelware/upload");
const Image = require("../models/Image");

router.post("/upload", upload.single("image"), async (req, res) => {
  try {
    const { file } = req;
    if (!file) return res.status(400).json({ error: "No file uploaded" });

    const newImage = new Image({
      name: file.originalname,
      url: file.path, // Cloudinary returns the image URL in `file.path`
    });

    await newImage.save();
    res.status(201).json({ message: "Image uploaded successfully", image: newImage });
  } catch (err) {
    console.error("Error during upload:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
router.get("/", async (req, res) => {
    try {
      const images = await Image.find();
      res.status(200).json(images);
    } catch (err) {
      res.status(500).json({ error: "Error fetching images" });
    }
  });
  

module.exports = router;
