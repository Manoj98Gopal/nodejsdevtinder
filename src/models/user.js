const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      minlength: [
        4,
        "First name must be at least 4 characters long, got '{VALUE}'"
      ]
    },
    lastName: {
      type: String
    },
    emailId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true
    },
    password: {
      type: String
    },
    age: {
      type: Number,
      min: [18, "Age should be above 18, got '{VALUE}'"]
    },
    gender: {
      type: String,
      validate: {
        validator: (value) => {
          const validation = ["Male", "Female"];
          return validation.includes(value);
        },
        message: (props) => `'${props.value}' is not allowed`
      }
    },
    profileUrl: {
      type: String,
      default: "https://www.freepik.com/icon/user-profile_5951752",
      validate: {
        validator: (value) => {
          return /^(https?:\/\/[^\s$.?#].[^\s]*)$/i.test(value);
        },
        message: (props) => `${props.value} is not a valid URL`
      }
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
