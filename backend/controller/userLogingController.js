const User = require("../model/userModel");
const catchAsyncError = require("../middleWare/catchAsyncError");
const ErrorHandler = require("../util/errorHandler");
const sendToken = require("../util/cookie");
const sendEmail = require("../util/sendEmail");
const crypto = require("crypto");
const cloudinary = require("cloudinary").v2;
const formidable = require("formidable");

//user register
exports.userRegis = catchAsyncError(async (req, res, next) => {
  if (req.file === undefined) {
    return next(new ErrorHandler("image field is empty.", 400));
  }
  const myCloud = await cloudinary.uploader.upload(req.file.path, {
    folder: "userInfoChecking",
    width: 150,
    crop: "scale",
  });

  const { name, email, password } = req.body;
  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    },
  });
  sendToken(user, 201, res);

  // console.log("this is body = ", req.body);
  // console.log("this is body file = ", req.file.originalname);
  // const { originalname } = req.file;
  // if (req.body.avatar) {

  // }
  // console.log("This is file = ", req.body.avatar);
  // const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
  //   folder: "userInfoChecking",
  //   width: 150,
  //   crop: "scale",
  // });
  // const { name, email, password } = req.body;
  // const user = await User.create({
  //   name,
  //   email,
  //   password,
  //   avatar: {
  //     public_id: myCloud.public_id,
  //     url: myCloud.secure_url,
  //   },
  // });
  // sendToken(user, 201, res);
});

//user Login
exports.userLogin = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler("Enter email or password", 400));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHandler("Invalid Email or Password", 401));
  }

  const isPasswordMatch = await user.comparePassword(password);

  if (!isPasswordMatch) {
    return next(new ErrorHandler("Invalid Email or Password", 401));
  }
  sendToken(user, 200, res);
});

//Logout user
exports.logOutUser = catchAsyncError(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(200).json({
    success: true,
    message: "Logged user",
  });
});

//Forgot user password
exports.forgotPassword = catchAsyncError(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorHandler("User not found", 400));
  }

  const resetToken = user.getResetPasswordToken();
  await user.save({ validateBeforeSave: false });

  const resetPasswordUrl = `${req.protocol}://${req.get(
    "host"
  )}/password/reset/${resetToken}`;

  const message = `Your password resetToken:- \n\n ${resetPasswordUrl} \n If you have not requested this email then ,Please ignore it`;

  try {
    await sendEmail({
      email: user.email,
      subject: "User reset password token",
      message,
    });
    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email} successfully..`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });
    return next(new ErrorHandler(error.message, 500));
  }
});

//reset password
exports.resetPassword = catchAsyncError(async (req, res, next) => {
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });
  if (!user) {
    return next(
      new ErrorHandler("ResetPassword is invalid has ben expired.", 404)
    );
  }
  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler("Password Doesn't match ", 404));
  }
  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();
  sendToken(user, 200, res);
});

//get User detail
exports.getUserDetails = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    user,
  });
});

// updated user password
exports.updatedUserPassword = catchAsyncError(async (req, res, next) => {
  // console.log("This is = ", req.body);
  const user = await User.findById(req.user.id).select("+password");
  const isPasswordMatch = await user.comparePassword(req.body.oldPassword);

  if (!isPasswordMatch) {
    return next(new ErrorHandler("Old Password is inCorrect", 401));
  }
  if (req.body.newPassword !== req.body.confirmPassword) {
    return next(new ErrorHandler("Password Doesn't match", 401));
  }
  user.password = req.body.newPassword;

  await user.save();

  sendToken(user, 200, res);
});

// User updated your profile..
exports.updatedUserProfile = catchAsyncError(async (req, res, next) => {
  const updatedData = {
    name: req.body.name,
    email: req.body.email,
  };
  if (req.file.path !== "") {
    const user = await User.findById(req.user.id);
    const imageId = user.avatar.public_id;
    await cloudinary.uploader.destroy(imageId);
  }
  const myCloud = await cloudinary.uploader.upload(req.file.path, {
    folder: "userInfoChecking",
    width: 150,
    crop: "scale",
  });
  updatedData.avatar = {
    public_id: myCloud.public_id,
    url: myCloud.secure_url,
  };

  const user = await User.findByIdAndUpdate(req.user.id, updatedData, {
    new: true,
  });
  if (!user) {
    next(new ErrorHandler(`User doesn\'t exist with ${req.params.id}`, 404));
  }
  res.status(200).json({
    success: true,
  });
});

//get all user {admin}
exports.getAllUserAdmin = catchAsyncError(async (req, res, next) => {
  const user = await User.find();
  res.status(200).json({
    success: true,
    user,
  });
});

//get single user {admin}
exports.getSingleUserAdmin = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(new ErrorHandler(`User not found this ${req.params.id}`, 404));
  }
  res.status(200).json({
    success: true,
    user,
  });
});

//User updated role ---{Admin}..
exports.updatedUserRole = catchAsyncError(async (req, res, next) => {
  const updatedData = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  };
  const user = await User.findByIdAndUpdate(req.params.id, updatedData, {
    new: true,
  });
  if (!user) {
    next(new ErrorHandler(`User doesn\'t exist with ${req.params.id}`, 404));
  }
  res.status(200).json({
    success: true,
    user,
  });
});

//user deleted---{Admin}..
exports.userDeleted = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(new ErrorHandler(`User not found this ${req.params.id}`, 404));
  }
  await user.remove();
  res.status(200).json({
    success: true,
    message: "Deleted successfully",
  });
});
