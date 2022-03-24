const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter your name"],
    maxLength: [30, "Name con't exceed 30 character."],
    minLength: [4, "Name should have more than 4 character."],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Enter your email"],
    validate: [validator.isEmail, "Please Enter your valid email."],
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Enter your password"],
    minLength: [8, "password should be greater than 8 characters."],
    select: false,
  },
  avatar: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  role: {
    type: String,
    default: "user",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  resetPasswordExpire: Date,
  resetPasswordToken: String,
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

//jwt sign
userSchema.methods.jwtSing = function () {
  return jwt.sign({ id: this._id }, process.env.SECRET, {
    expiresIn: process.env.EXPIRE,
  });
};

//Compare password
userSchema.methods.comparePassword = async function (enterPassword) {
  return await bcrypt.compare(enterPassword, this.password);
};

//Generating reset Forgot password token
userSchema.methods.getResetPasswordToken = function () {
  const token = crypto.randomBytes(20).toString("hex");
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;
  return token;
};

module.exports = mongoose.model("User", userSchema);
