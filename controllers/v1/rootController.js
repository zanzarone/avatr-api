const path = require("path");
const { validationResult } = require("express-validator");
const { createCanvas, loadImage } = require("canvas");
const { Failure } = require("../../config/failure");
const {
  BaseType,
  SkinType,
  MouthType,
  NoseType,
  HairType,
  HairColors,
  EarsType,
  EyesType,
  EyesColors,
} = require("../../config/defines");
const { existsSync } = require("fs");

const IMAGE_SIZE = 128; // Adjust this based on your image size
const CANVAS_WIDTH = IMAGE_SIZE;
const CANVAS_HEIGHT = IMAGE_SIZE;
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

  if (
    !Object.keys(BaseType).includes(base) ||
    !Object.keys(SkinType).includes(skin) ||
    !Object.keys(MouthType).includes(mouth) ||
    !Object.keys(NoseType).includes(nose) ||
    !Object.keys(HairType).includes(hair.type) ||
    !Object.keys(HairColors).includes(`${hair.color}`) ||
    !Object.keys(EarsType).includes(ears) ||
    !Object.keys(EyesType).includes(eyes.type) ||
    !Object.keys(EyesColors).includes(`${eyes.color}`)
  ) {
    return next(new Failure("Error on validation", 400));
  }

  let images;
  try {
    const imagePaths = [
      path.join(ROOT_FOLDER, `base`, `${base}.png`),
      path.join(ROOT_FOLDER, `skin`, `${base}`, `${skin}.png`),
      path.join(ROOT_FOLDER, `mouth`, `${mouth}.png`),
      path.join(ROOT_FOLDER, `nose`, `${nose}.png`),
      path.join(ROOT_FOLDER, `eyes`, `${eyes.color}`, `${eyes.type}.png`),
    ];
    for (let i = 0; i < imagePaths.length; i++) {
      const path = imagePaths[i];
      if (!existsSync(path)) {
        throw new Failure(`No such file or directory for ${path}`);
      }
    }
    images = await Promise.all(
      imagePaths.map((filePath) => {
        console.log("path", filePath);
        return loadImage(filePath);
      })
    );
  } catch (error) {
    if (error instanceof Failure) {
      return next(error);
    }
    return next(new Failure("Error on validation", 500));
  }

  //# Create a canvas and context
  const canvas = createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
  const context = canvas.getContext("2d");
  try {
    //# Loop through the images and draw them onto the canvas
    for (let index = 0; index < images.length; index++) {
      const image = images[index];
      context.drawImage(image, 0, 0, IMAGE_SIZE, IMAGE_SIZE);
      //# Optional: Watermark
      // context.font = "20px "; // Use the font you registered
      // context.fillStyle = "white";
      // context.fillText(`Image ${index + 1}`, 0 + 10, 0 + 30);
    }
  } catch (err) {
    return next(new Failure(err.message, 500));
  }
  //# Convert the canvas to a buffer and send it as the response
  const buffer = canvas.toBuffer("image/png");
  res.set("Content-Type", "image/png");
  console.log(buffer);
  res.send(buffer);
};

module.exports = {
  generate,
};
