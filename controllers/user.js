const User = require("../models/user");

module.exports.signupFormRender = (req, res) => {
  res.render("user/signup.ejs", { title: "Signup" });
};

module.exports.signup = async (req, res) => {
  try {
    let { username, email, password } = req.body;
    let newUser = new User({ email, username });
    let registeredUser = await User.register(newUser, password);
    req.login(registeredUser, (err) => {
      if (err) {
        return next(err);
      }
      req.flash("success", "Welcome to the HomeStay!");
      res.redirect("/listings");
    });
  } catch (e) {
    req.flash("error", e.message);
    res.redirect("/signup");
  }
};

module.exports.loginFormRender = (req, res) => {
  res.render("user/login.ejs", { title: "Login" });
};

module.exports.login = async (req, res) => {
  let redirect = res.locals.redirectUrl || "/listings";
  req.flash("success", "Welcome back to the HomeStay!");
  res.redirect(redirect);
};

module.exports.logout = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      next(err);
    }
    req.flash("success", "You are logged out!");
    res.redirect("/listings");
  });
};
