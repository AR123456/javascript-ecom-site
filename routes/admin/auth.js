const express = require("express");
const { check, validationResult } = require("express-validator");
const usersRepo = require("../../repositories/users");
const router = express.Router();
const signupTemplate = require("../../views/admin/auth/signup");
const signinTemplate = require("../../views/admin/auth/signin");
const {
  requireEmail,
  requirePassword,
  requirePasswordConfirmation
} = require("./validators.js");

router.get("/signup", (req, res) => {
  res.send(signupTemplate({ req: req }));
});

router.post(
  "/signup",
  [requireEmail, requirePassword, requirePasswordConfirmation],
  async (req, res) => {
    const errors = validationResult(req);

    // console.log(errors);
    // check to see if errors occured
    if (!errors.isEmpty()) {
      // send the errors to views, auth signupljs template to show user
      return res.send(signupTemplate({ req, errors }));
    }
    const { email, password, passwordConfirmation } = req.body;
    const user = await usersRepo.create({ email, password });
    req.session.userId = user.id;
    res.send("account created");
  }
);
router.get("/signout", (req, res) => {
  req.session = null;
  res.send("you are logged out ");
});
router.get("/signin", (req, res) => {
  res.send(signinTemplate({ req: req }));
});
router.post("/signin", async (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;
  const user = await usersRepo.getOneBy({ email });
  if (!user) {
    return res.send("email not found ");
  } else {
    const validPassword = await usersRepo.comparePasswords(
      user.password,
      password
    );
    if (!validPassword) {
      return res.send("invalid password");
    }
    req.session.userId = user.id;
    res.send("You are signed in");
  }
});

module.exports = router;
