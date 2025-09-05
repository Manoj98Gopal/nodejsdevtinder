const validator = require("validator");

const validateUserRegister = (req) => {
  const { firstName, lastName, emailId, password, age, gender } = req.body;

  if (!firstName) {
    throw new Error("First Name is required");
  }

  if (!lastName) {
    throw new Error("Last Name is required");
  }

  if (!emailId) {
    throw new Error("Email id is required");
  } else {
    if (!validator.isEmail(emailId)) {
      throw new Error("wrong email !");
    }
  }

  if (!password) {
    throw new Error("password is required");
  }

  if (!age) {
    throw new Error("age is required");
  }

  if (!gender) {
    throw new Error("gender is required");
  }
};

module.exports = validateUserRegister;
