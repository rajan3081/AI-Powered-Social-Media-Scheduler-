const express = require("express");

const router = express.Router();

const OpenAI = require("openai");

const openai = new OpenAI({

  apiKey: process.env.OPENAI_API_KEY

});

// ================= AI CAPTION =================

router.post("/generate-caption", async (req, res) => {

  try {

    const { prompt } = req.body;

    const completion =
      await openai.chat.completions.create({

        model: "gpt-3.5-turbo",

        messages: [

          {
            role: "system",
            content:
              "You are a social media caption generator."
          },

          {
            role: "user",
            content:
              `Generate a catchy Instagram caption for: ${prompt}`
          }

        ],

        max_tokens: 60

      });

    const caption =
      completion.choices[0].message.content;

    res.status(200).json({

      caption

    });

  } catch (error) {

    res.status(500).json({

      message: error.message

    });

  }

});

module.exports = router;