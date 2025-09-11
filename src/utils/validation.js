const validation = require("validator");

const validateUserRegister = (req) => {
  const mustFields = [
    "firstName",
    "lastName",
    "password",
    "email",
    "phoneNumber",
    "gender"
  ];

  //Find missing fields
  const missingFields = mustFields.filter((filed) => !req.body[filed]);

  if (missingFields.length > 0) {
    throw new Error(`Missing required fields: ${missingFields.join(", ")}`);
  }

  
};

module.exports = validateUserRegister;
