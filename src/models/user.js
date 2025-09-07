const mongoose = require("mongoose");
const v = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

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
      lowercase: true,
      validate: {
        validator: (value) => v.isEmail(value),
        message: (props) => `${props.value} is not a valid email`
      }
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

userSchema.methods.getJwt = async function () {
  try {
    user = this;
    const token = await jwt.sign({ _id: user._id }, "Learning node js", {
      expiresIn: "2m"
    });
    return token;
  } catch (error) {
    throw new Error(error.message);
  }
};

userSchema.methods.verifyPassword = async function (userInputPassword) {
  try {
    user = this;
    const isValidUser = await bcrypt.compareSync(
      userInputPassword,
      user.password
    );
    return isValidUser;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = mongoose.model("User", userSchema);
