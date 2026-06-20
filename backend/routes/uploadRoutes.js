const express = require("express");

const router = express.Router();

const upload = require("../middleware/uploadMiddleware");

const cloudinary = require("../utils/cloudinary");

router.post(
  "/",
  upload.single("image"),
  async (req, res) => {

    try {

      const result = await cloudinary.uploader.upload(
        req.file.path
      );

      res.status(200).json({
        imageUrl: result.secure_url
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message: error.message
      });

    }

  }
);

module.exports = router;