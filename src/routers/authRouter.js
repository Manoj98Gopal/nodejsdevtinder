const express = require("express");
const { validateUserRegister } = require("../validators/userValidator");
const validateRequest = require("../middlewares/validateRequest");

const AuthRouter = express.Router();

AuthRouter.post("/signup", validateUserRegister, validateRequest, async(req, res) => {
    try {
      res.status(201).json({ success: true, data: req.body });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  }
);

AuthRouter.post("/signin", (req, res) => {
  try {
  } catch (error) {
    res.status(500).send(error.message);
  }
});

AuthRouter.post("/logout", (req, res) => {
  try {
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = AuthRouter;
