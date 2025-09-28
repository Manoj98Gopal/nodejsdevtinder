// backend/config/database.js
const mongoose = require("mongoose");

// Use environment variable or default to local MongoDB
const url = process.env.MONGO_URI || "mongodb://admin:password123@mongodb:27017/devTinder?authSource=admin";

const connectDatabase = async () => {
  try {
    await mongoose.connect(url);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

module.exports = connectDatabase;