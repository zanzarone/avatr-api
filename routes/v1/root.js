const router = require("express").Router();
const rootController = require("../../controllers/v1/rootController");
const { body } = require("express-validator");

//# Middleware per la sanitizzazione e la validazione del corpo JSON
const validateGenerateRequestBody = [
  //! quelli esplicitati qui sono mandatori!
  body("base").isString().escape(),
  body("skin").isString().escape(),
  body("mouth").isString().escape(),
  body("nose").isString().escape(),
  body("hair.type").isString().escape(),
  body("hair.color").isInt().toInt(),
  body("eyes.color").isInt().toInt(),
  body("eyes.type").isString().escape(),
  body("ears").isString().escape(),
];

router.get("/generate", validateGenerateRequestBody, rootController.generate);

module.exports = router;
