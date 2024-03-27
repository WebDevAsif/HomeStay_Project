const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware");
const allUserController = require("../controllers/user");

router
  .route("/signup")
  .get(allUserController.signupFormRender)
  .post(wrapAsync(allUserController.signup));

router
  .route("/login")
  .get(allUserController.loginFormRender)
  .post(
    saveRedirectUrl,
    passport.authenticate("local", { failureRedirect: "/login", failureFlash: true }),
    allUserController.login
  );

router.get("/logout", allUserController.logout);

module.exports = router;
