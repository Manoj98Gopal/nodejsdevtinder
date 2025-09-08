const express = require("express");

const ProfileRouter = express.Router();

ProfileRouter.get("/profile/view", async (req, res) => {
  try {
    res.send("Working fine")
  } catch (error) {
    res.status(500).send(error.message);
  }
});

ProfileRouter.patch("/profile/edit", async (req, res) => {
  try {
  } catch (error) {
    res.status(500).send(error.message);
  }
});

ProfileRouter.patch("/profile/password", async (req, res) => {
  try {
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = ProfileRouter;
