const express = require("express");
const { validateUserRegister } = require("../validators/userValidator");
const validateRequest = require("../middlewares/validateRequest");
const hashPassword = require("../utils/hashPassword");
const userModel = require("../models/user");
const jwt = require("jsonwebtoken");

const AuthRouter = express.Router();

AuthRouter.post(
  "/signup",
  validateUserRegister,
  validateRequest,
  async (req, res) => {
    try {
      const { password, ...rest } = req.body;

      // hash password
      const hashPwd = await hashPassword(password);

      // create user
      const user = new userModel({ ...rest, password: hashPwd });
      await user.save();

      // convert to object & remove password
      const userObj = user.toObject();
      delete userObj.password;

      // creating jwt token and adding user id to that jwt
      const jwtToken = jwt.sign({ id: userObj._id }, "devTinder", {
        expiresIn: "1d"
      });

      // setting the  jwt token in resCookie
      res.cookie("token", jwtToken, {
        httpOnly: false
      });

      res.status(201).json({ success: true, data: userObj });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  }
);

AuthRouter.post("/signin", async (req, res) => {
  try {
    // checking any user is there
    const user = await userModel.findOne({ email: req.body.email });

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }

    // checking is valid password
    const isValidPassword = await user.comparePassword(req.body.password);

    if (!isValidPassword) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }

    // creating jwt token and adding user id to that jwt
    const jwtToken = jwt.sign({ id: user._id }, "devTinder", {
      expiresIn: "1d"
    });

    // setting the  jwt token in resCookie
    res.cookie("token", jwtToken, {
      httpOnly: false
    });

    res.status(200).json({ success: true, data: user });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

AuthRouter.post("/logout", (req, res) => {
  try {
    res.cookie("token", "", {
      httpOnly: false,
      expires: new Date(0)
    });
    res.status(200).json({ success: true, data: "successfully logout" });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = AuthRouter;
