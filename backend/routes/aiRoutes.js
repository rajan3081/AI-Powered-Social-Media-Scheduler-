const express = require("express");

const axios = require("axios");

const router = express.Router();

// ================= AI CAPTION =================

router.post(
"/generate-caption",

async (req, res) => {


try {

  const { prompt } = req.body;

  const response =
    await axios.post(

      "https://api.x.ai/v1/chat/completions",

      {

        model: "grok-beta",

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

        temperature: 0.8

      },

      {

        headers: {

          Authorization:
            `Bearer ${process.env.GROK_API_KEY}`,

          "Content-Type":
            "application/json"

        }

      }

    );

  const caption =
    response.data.choices[0]
    .message.content;

  res.status(200).json({

    caption

  });

} catch (error) {

console.log(
error.response?.data
|| error.message
);

res.status(500).json({


message:
  error.response?.data
  || "AI Caption Failed"


});

}



}

);

module.exports = router;
