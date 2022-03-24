const router = require("express").Router();
const {
  userRegis,
  getUserDetails,
  userLogin,
  logOutUser,
  forgotPassword,
  resetPassword,
  updatedUserPassword,
  updatedUserProfile,
  getAllUserAdmin,
  getSingleUserAdmin,
  updatedUserRole,
  userDeleted,
} = require("../controller/userLogingController");
const { isAuthenticationUser, authorizeRole } = require("../middleWare/auth");
const upload = require("../middleWare/multer");

router.route("/register").post(upload.single("avatar"), userRegis);

// router.post("/register", upload.single("avatar"), userRegis);

router.route("/login").post(userLogin);
router.route("/password/forgot").post(upload.single("avatar"), forgotPassword);
router
  .route("/password/reset/:token")
  .put(upload.single("avatar"), resetPassword);

router.route("/logout").get(logOutUser);

// authorizeRole("admin"), any time use this code.

router.route("/me").get(isAuthenticationUser, getUserDetails);
router
  .route("/password/update")
  .put(upload.single("avatar"), isAuthenticationUser, updatedUserPassword);
router
  .route("/me/update")
  .put(upload.single("avatar"), isAuthenticationUser, updatedUserProfile);

//admin Facilities

router
  .route("/admin/users")
  .get(isAuthenticationUser, authorizeRole("admin"), getAllUserAdmin);
router
  .route("/admin/user/:id")
  .get(isAuthenticationUser, authorizeRole("admin"), getSingleUserAdmin)
  .put(isAuthenticationUser, authorizeRole("admin"), updatedUserRole)
  .delete(isAuthenticationUser, authorizeRole("admin"), userDeleted);
module.exports = router;
