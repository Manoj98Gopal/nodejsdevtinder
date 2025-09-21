const mongoose = require("mongoose");

const url =
  "mongodb+srv://manoj98achar:2VJBuTqAPsdTZS9t@cluster0.iyss4mk.mongodb.net/devTinder";

const connectDatabase = async () => {
  await mongoose.connect(url);
};

module.exports = connectDatabase;
