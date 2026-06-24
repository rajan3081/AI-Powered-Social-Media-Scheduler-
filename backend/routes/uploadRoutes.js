const express = require("express");

let onlineUsers = [];

const router = express.Router();

const multer = require("multer");

const cloudinary = require("../config/cloudinary");

const storage = multer.memoryStorage();

const upload = multer({

  storage

});

// ================= IMAGE UPLOAD =================

router.post(
  "/",
  upload.single("image"),

  async (req, res) => {
    console.log(req.file);

    try {

      const file = req.file;

      if (!file) {

        return res.status(400).json({

          message: "No file uploaded"

        });

      }

      const result =
        await cloudinary.uploader.upload(

          `data:${file.mimetype};base64,${file.buffer.toString("base64")}`,

          {
            folder: "social-media-scheduler"
          }

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