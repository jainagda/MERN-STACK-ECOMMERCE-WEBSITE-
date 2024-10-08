const ErrorHandler = require("../utils/errorHandle");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const sendEmail = require("../utils/sendEmail");
const User = require("../models/userModel");
const sendToken = require("../utils/jwttoken");
const crypto = require("crypto");
// register the user

exports.registerUser = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password } = req.body;

  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: "this is my sample id",
      url: "profile url",
    },
    role: "admin",
  });

  sendToken(user, 201, res);
});

//Login User

exports.loginUser = catchAsyncErrors(async (req, res, next) => {
  console.log("req.body", req.body);
  const { email, password } = req.body;
  //checking if user has given passweord and email both

  if (!email || !password) {
    return next(new ErrorHandler("Please Enter email & password", 400));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHandler("Invalid email and password", 401));
  }
  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  console.log(user, "user");
  sendToken(user, 200, res);
});

//LOGOUT

exports.logout = catchAsyncErrors(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    sucess: true,
    message: "logged out",
  });
});

// forget password

exports.forgetPassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }

  // get resetToken Password Token

  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforesave: false });

  const resetPasswordUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/password/reset/${resetToken}`;

  const message = `Your Password Reset Token is := \n\n ${resetPasswordUrl} \n\n if you have not requested this email then please ignore it `;

  try {
    await sendEmail({
      email: user.email,
      subject: `Ecommerce password Recovery`,
      message,
    });

    res.status(200).json({
      sucess: true,
      message: `Email sent to ${user.email} sucessfully`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;

    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });

    return next(new ErrorHandler(error.message, 500));
  }
});

// reset password Url
exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
  // creating token hash
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
      new ErrorHandler(
        "Reset Password token is Invalid or has been expired",
        400
      )
    );
  }
  if (req.body.password !== req.body.confrimPassword) {
    return next(new ErrorHandler("Password does not password", 400));
  }

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  sendToken(user, 200, res);
});

// Get user details

exports.getUserDetails = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    sucess: true,
    user,
  });
});

//update user password

exports.updateUserPassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");

  const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Old password is Invalid", 401));
  }

  if (req.body.newPassword !== req.body.confrimPassword) {
    return next(new ErrorHandler("Password does not match", 401));
  }

  user.password = req.body.newPassword;

  await user.save();

  sendToken(user, 200, res);
});

//update user profile

exports.updateUserProfile = catchAsyncErrors(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
  };

  // we will add cloudinary later

  const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    sucess:true,
  });


});


//get all user  Admin

exports.getAllUser = catchAsyncErrors(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({
    sucess:true,
    users
  });
})

// get single user details Admin
exports.getSingleUser = catchAsyncErrors(async (req, res, next) => {

  const users = await User.findById(req.params.id);

  if(!users){
    return next(new ErrorHandler(`User does not exist with id:${req.params.id}`, 401));
  }
  res.status(200).json({
    sucess:true,
    users
  });
})

//update the user role by admin 

exports.updateUserProfileByAdmin = catchAsyncErrors(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  };

  const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    sucess:true,
  });


});

// delete the user by admin 

exports.DeleteUserByAdmin = catchAsyncErrors(async (req, res, next) => {

  const user = await User.findById(req.params.id) 

  if(!user){
    return next(new ErrorHandler(`User does not exist with id:${req.params.id}`, 401));
  }

  await user.remove();

  res.status(200).json({
    sucess:true,
    message:"user deleted successfully"
  });


});

