const express = require("express");
const router = express.Router();
const path = require("path");
const { createCanvas, loadImage } = require("canvas");

router.get("^/$|/index(.html)?", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "views", "index.html"));
});

router.post("/generate-avatr", async (req, res) => {
  // Extract parameters from the request body
  const { width, height, text } = req.body;

  // Validate parameters
  if (!width || !height || !text) {
    return res
      .status(400)
      .json({ error: "Width, height, and text are required parameters." });
  }

  // Create a canvas and context
  const canvas = createCanvas(width, height);
  //! after stable release we will think about a watermark to unsubscribed users
  //   const context = canvas.getContext("2d");
  //   // Draw a simple image with the provided text
  //   context.font = "30px Arial";
  //   context.fillText(text, 10, 50);

  // Convert the canvas to a buffer and send it as the response
  const buffer = canvas.toBuffer("image/png");
  res.set("Content-Type", "image/png");
  res.send(buffer);
});

module.exports = router;
