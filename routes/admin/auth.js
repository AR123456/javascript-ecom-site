const express = require("express");
const { check, validationResult } = require("express-validator");
const usersRepo = require("../../repositories/users");
const router = express.Router();
const signupTemplate = require("../../views/admin/auth/signup");
const signinTemplate = require("../../views/admin/auth/signin");

router.get("/signup", (req, res) => {
  res.send(signupTemplate({ req: req }));
});

router.post(
  "/signup",
  [
    check("email")
      .trim()
      .normalizeEmail()
      .isEmail()
      // express validator custom function async await syntax is there a user with this email?
      .custom(async (email) => {
        const existingUser = await usersRepo.getOneBy({ email: email });
        if (existingUser) {
          // this will be shown to the user
          throw new Error("Email is in use ");
        }
      }),
    check("password").trim().isLength({ min: 4, max: 20 }),
    check("passwordConfirmation")
      .trim()
      .isLength({ min: 4, max: 20 })
      .custom(async (passwordConfirmation, { req }) => {
        if (passwordConfirmation !== req.body.password) {
          throw new Error("passwords do not match ");
        }
      }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    console.log(errors);
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
