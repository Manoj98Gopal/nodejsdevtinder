const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const { Schema, model } = mongoose;

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name is required"],
      trim: true
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"],
      trim: true
    },
    experience: {
      type: String,
      trim: true
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      validate: {
        validator: (value) => validator.isEmail(value),
        message: (props) => `${props.value} is not a valid email`
      }
    },
    phoneNumber: {
      type: String,
      trim: true,
      validate: {
        validator: (value) =>
          !value ||
          validator.isMobilePhone(value, "any", { strictMode: false }),
        message: (props) => `${props.value} is not a valid phone number`
      }
    },
    gender: {
      type: String,
      enum: ["male", "female", "other"], // restrict values,
      required: [true, "Gender is required"]
    },
    profileURL: {
      type: String,
      default: "https://cdn-icons-png.flaticon.com/512/149/149071.png", // valid placeholder
      trim: true,
      validate: {
        validator: (value) => validator.isURL(value),
        message: (props) => `${props.value} is not a valid URL`
      }
    },
    about: {
      type: String,
      trim: true,
      maxlength: 500
    },
    skills: {
      type: [String], // correct syntax
      default: [],
      validate: {
        validator: (skills) => skills.length <= 10,
        message: () => `Skills must be less than or equal to 10`
      }
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [5, "Password must be at least 5 characters long"]
    }
  },
  { timestamps: true } // auto createdAt & updatedAt
);

userSchema.methods.comparePassword = async function (userInputPassword) {
  const user = this;
  const isValidPassword = await bcrypt.compare(
    userInputPassword,
    user.password
  );
  return isValidPassword;
};

module.exports = model("User", userSchema);
