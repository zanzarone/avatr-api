const router = require("express").Router();
const rootController = require("../../controllers/v1/rootController");
const { body } = require("express-validator");

//# Middleware per la sanitizzazione e la validazione del corpo JSON
const validateGenerateRequestBody = [
  body("base").isString().escape(),
  body("skin").isString().escape(),
  body("mouth").isString().escape(),
  body("nose").isString().escape(),
  body("hair").isString().escape(),
  body("eyes.color").isInt().toInt(),
  body("eyes.type").isString().escape(),
  body("ears.skinColor").isInt().toInt(),
  body("ears.type").isString().escape(),
];

router.post("/generate", validateGenerateRequestBody, rootController.generate);

module.exports = router;
