const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userMiddleware = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      throw new Error("Please login!");
    }

    const decoded = jwt.verify(token, "Learning node js");
    const userData = await User.findById({ _id: decoded?._id });

    req.user = userData;

    next();
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = userMiddleware;
