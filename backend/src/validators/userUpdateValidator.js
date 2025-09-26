const { body } = require("express-validator");

exports.validateUserProfileUpdate = [
  body("firstName")
    .optional()
    .notEmpty()
    .withMessage("First name cannot be empty"),
  body("lastName")
    .optional()
    .notEmpty()
    .withMessage("Last name cannot be empty"),
  body("phoneNumber")
    .optional()
    .isMobilePhone()
    .withMessage("Invalid phone number"),
  body("experience").optional().notEmpty().withMessage("Invalid experience"),
  body("gender")
    .optional()
    .notEmpty()
    .withMessage("Gender cannot be empty")
    .bail()
    .isIn(["male", "female", "other"])
    .withMessage("Gender must be male, female or other"),
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
