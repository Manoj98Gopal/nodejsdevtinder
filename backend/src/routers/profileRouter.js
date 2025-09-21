const express = require("express");
const userMiddleware = require("../middlewares/userMiddleware");
const {
  validateUserProfileUpdate
} = require("../validators/userUpdateValidator");
const validateRequest = require("../middlewares/validateRequest");
const rejectUnknowFields = require("../utils/rejectUnknowFields");
const hashPassword = require("../utils/hashPassword");

const ProfileRouter = express.Router();

ProfileRouter.get("/profile/view", userMiddleware, async (req, res) => {
  try {
    res.status(200).json({ success: true, data: req.user });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

ProfileRouter.patch(
  "/profile/edit",
  rejectUnknowFields,
  userMiddleware,
  validateUserProfileUpdate,
  validateRequest,
  async (req, res) => {
    try {
      const updatedUser = req.user;
      Object.keys(req.body).forEach(
        (key) => (updatedUser[key] = req.body[key])
      );
      await updatedUser.save();
      res.status(200).json({ success: true, data: updatedUser });
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
);

ProfileRouter.patch("/profile/password",userMiddleware, async (req, res) => {
  try {
    const {oldPassword, newPassword} = req.body;

    if(!oldPassword || !newPassword){
      return res.status(400).json({success: false, message: "Both old and new password are required"});
    }

    const isValidPassword = await req.user.comparePassword(oldPassword);

    if(!isValidPassword){
      return res.status(400).json({success: false, message: "Old password is incorrect"});
    }
    const hashPwd = await hashPassword(newPassword);

    req.user.password = hashPwd;
    
    await req.user.save();  

    res.status(200).json({ success: true, data: "password updated" });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = ProfileRouter;
