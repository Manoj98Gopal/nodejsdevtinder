const bcrypt = require("bcrypt");

async function hashPassword(userPassword) {
  const saltRound = 10;
  const hashedPassword = await bcrypt.hash(userPassword, saltRound);
  return hashedPassword;
}

module.exports = hashPassword;
