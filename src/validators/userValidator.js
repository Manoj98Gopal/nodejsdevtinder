const { body } = require("express-validator");

exports.validateUserRegister = [
  body("firstName").notEmpty().withMessage("First name is required"),
  body("lastName").notEmpty().withMessage("Last name is required"),
  body("phoneNumber").isMobilePhone().withMessage("Invalid phone number"),
  body("email").isEmail().withMessage("Invalid email format"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
  body("gender")
    .isIn(["male", "female", "other"])
    .withMessage("Gender must be male, female, or other")
];
