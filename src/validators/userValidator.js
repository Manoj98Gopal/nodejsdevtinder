const { body } = require("express-validator");

exports.validateUserRegister = [
  body("firstName").notEmpty().withMessage("First name is required"),
  body("lastName").notEmpty().withMessage("Last name is required"),
  body("phoneNumber").optional().isMobilePhone().withMessage("Invalid phone number"),
  body("email").isEmail().withMessage("Invalid email format"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
  body("gender")
    .notEmpty()
    .withMessage("Gender is required")
    .bail() // stop running further validators if empty
    .isIn(["male", "female", "other"])
    .withMessage("Gender must be male, female, or other"),
  body("profileURL")
    .optional()
    .isURL()
    .withMessage("Profile url is invalid format"),
  body("about")
    .optional()
    .isLength({ max: 500 })
    .withMessage("About must be less than 500 characters"),
  body("skills")
    .optional()
    .isArray({ max: 10 })
    .withMessage("Skills should not have more than 10 items")
];
