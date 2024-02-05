const path = require("path");
const { validationResult } = require("express-validator");
// const { readdir } = require("node:fs/promises");
const { createCanvas, loadImage } = require("canvas");
const { Failure } = require("../../config/failure");

const CANVAS_WIDTH = 128;
const CANVAS_HEIGHT = 128;
const ROOT_FOLDER = path.join(__dirname, "..", "..", `/public/assets`);

const generate = async (req, res, next) => {
  //# Controlla gli errori di validazione
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new Failure("Error on validation", 400, errors.array()));
  }

  //# Il corpo JSON è valido e sanitizzato
  const sanitizedData = req.body;
  console.log(sanitizedData);
  //# Extract parameters from the request body
  const { base, skin, mouth, nose, hair, ears, eyes } = sanitizedData;

  let imagePaths = [
    path.join(ROOT_FOLDER, `base`, `${base}.png`),
    path.join(ROOT_FOLDER, `skin`, `${base}`, `${skin}.png`),
  ];
  try {
    const images = await Promise.all(
      imagePaths.map((filePath) => {
        console.log("pippo", filePath);
        loadImage(filePath);
      })
    );
  } catch (err) {
    return next(new Failure(err.message, 500));
  }
  //# Create a canvas and context
  const canvas = createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
  //# Convert the canvas to a buffer and send it as the response
  const buffer = canvas.toBuffer("image/png");
  res.set("Content-Type", "image/png");
  console.log(buffer);
  res.send(buffer);
};

module.exports = {
  generate,
};

//! after stable release we will think about a watermark to unsubscribed users
//   const context = canvas.getContext("2d");
//   // Draw a simple image with the provided text
//   context.font = "30px Arial";
//   context.fillText(text, 10, 50);
