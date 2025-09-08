const express = require("express");

const AuthRouter = express.Router();

AuthRouter.post("/signup", (req, res) => {
  try {
  } catch (error) {
    res.status(500).send(error.message);
  }
});

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
