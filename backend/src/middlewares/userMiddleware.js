const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userMiddleware = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res.status(401).json({ success: false, message: "Please login" });
    }

    const decoded = jwt.verify(token, "devTinder");
    const userData = await User.findById({ _id: decoded?.id });

    req.user = userData;

    next();
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = userMiddleware;
