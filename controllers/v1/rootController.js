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
  BgType,
} = require("../../config/defines");
const { existsSync } = require("fs");
// const { logWarn } = require("../../middleware/logger");

const IMAGE_SIZE = 128; // Adjust this based on your image size
const CANVAS_WIDTH = IMAGE_SIZE;
const CANVAS_HEIGHT = IMAGE_SIZE;
const ROOT_FOLDER = path.join(__dirname, "..", "..", `/public/assets`);

const generate = async (req, res, next) => {
  //# Controlla gli errori di validazione
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // logWarn(JSON.stringify(req.body));
    return next(new Failure("Error on validation", 400, errors.array()));
  }

  //# Il corpo JSON è valido e sanitizzato
  const sanitizedData = req.body;

  //# Extract parameters from the request body
  const {
    bg = undefined, //# can by null(background transparent)
    base,
    skin,
    mouth,
    nose,
    hair,
    ears,
    eyes,
  } = sanitizedData;

  //# check correctness of the params
  if (
    (bg && !Object.keys(BgType).includes(bg)) || //! if bg is specified MUST be in the collection
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
    return next(
      new Failure("Error on validation: " + JSON.stringify(sanitizedData), 400)
    );
  }

  // logWarn(JSON.stringify(sanitizedData));

  let images = [];
  try {
    let imagePaths = [
      path.join(ROOT_FOLDER, `BASE`, `${base}.png`),
      path.join(ROOT_FOLDER, `SKIN`, `${base}`, `${skin}.png`),
      path.join(ROOT_FOLDER, `MOUTH`, `${mouth}.png`),
      path.join(ROOT_FOLDER, `NOSE`, `${nose}.png`),
      path.join(ROOT_FOLDER, `EYES`, `${eyes.color}`, `${eyes.type}.png`),
      path.join(ROOT_FOLDER, `HAIR`, `${hair.color}`, `${hair.type}.png`),
      path.join(ROOT_FOLDER, `EARS`, `${skin}`, `${ears}.png`),
    ];

    //# if bg present, MUST be inserted before the others layers
    if (bg) {
      imagePaths.unshift(path.join(ROOT_FOLDER, `BACKGROUND`, `${bg}.png`));
    }

    //# we have to check if on the server the resources are found on the filesystem
    for (let i = 0; i < imagePaths.length; i++) {
      const path = imagePaths[i];
      if (!existsSync(path)) {
        throw new Failure(`No such file or directory for ${path}`);
      }
    }
    //# then i can load in memory
    images = await Promise.all(
      imagePaths.map((filePath) => {
        return loadImage(filePath);
      })
    );
  } catch (error) {
    if (error instanceof Failure) {
      return next(error);
    }
    return next(new Failure("Load image failed", 500));
  }

  //# Create a canvas and context
  const canvas = createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
  const context = canvas.getContext("2d");
  try {
    //# Loop through the images and draw them onto the canvas
    for (let index = 0; index < images.length; index++) {
      const image = images[index];
      context.drawImage(image, 0, 0, IMAGE_SIZE, IMAGE_SIZE);
      //TODO Optional: Watermark
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
  res.send(buffer);
};

module.exports = {
  generate,
};
