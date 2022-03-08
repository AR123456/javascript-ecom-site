const express = require("express");

const { handleErrors } = require("./middlewares");
//TODO  this should point to a customer repository not users which is admin
const usersRepo = require("../../repositories/users");
const signupTemplate = require("../../views/carts/customerAuth/custSignup");
const signinTemplate = require("../../views/carts/customerAuth/custSignin");
//TODO will need customer specific validator to not allow customer to admin activities
const {
  requireEmail,
  requirePassword,
  requirePasswordConfirmation,
  requireEmailExists,
  requireValidPasswordForUser,
} = require("./validators");

const router = express.Router();

router.get("/custSignup", (req, res) => {
  // TODO send the custmer signup template
  res.send(signupTemplate({ req }));
});

router.post(
  "/custSignup",
  [requireEmail, requirePassword, requirePasswordConfirmation],
  handleErrors(signupTemplate),
  async (req, res) => {
    const { email, password } = req.body;
    //TODO point this to the customerRepo - all of this should be customerId ect not user
    const user = await usersRepo.create({ email, password });

    req.session.userId = user.id;
    // TODO this should go the pages a customer needs to make a purchase
    res.redirect("/admin/products");
  }
);
// TODO this should be a customer signout
router.get("/signout", (req, res) => {
  req.session = null;
  // redirect to products page
  res.send("You are logged out");
});
// TODO send the customer signintemplate
router.get("/signin", (req, res) => {
  res.send(signinTemplate({}));
});
// TODO this sould be customer sign in
router.post(
  "/signin",
  [requireEmailExists, requireValidPasswordForUser],
  handleErrors(signinTemplate),
  async (req, res) => {
    const { email } = req.body;

    const user = await usersRepo.getOneBy({ email });

    req.session.userId = user.id;
    // redirect to the pages that allow user to make purchase
    res.redirect("/admin/products");
  }
);

module.exports = router;
