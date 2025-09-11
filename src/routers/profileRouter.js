const express = require("express");
const userMiddleware = require("../middlewares/userMiddleware");

const ProfileRouter = express.Router();

ProfileRouter.get("/profile/view", userMiddleware, async (req, res) => {
  try {
    res.status(200).json({ success: true, data: req.user });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
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
