const express = require("express");

const { registerUser ,loginUser, logout, forgetPassword, resetPassword, getUserDetails, updateUserPassword} = require("../controller/userController");
const { isAuthenticatedUser } = require("../middleware/auth");
const router = express.Router();

router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

router.route("/password/forget").post(forgetPassword)
router.route("/password/reset/:token").put(resetPassword)

router.route("/logout").get(logout);

router.route("/me").get(isAuthenticatedUser ,getUserDetails);
router.route("/password/update").put(isAuthenticatedUser ,updateUserPassword);
module.exports = router;
