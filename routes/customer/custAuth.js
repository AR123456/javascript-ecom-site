const express = require("express");

const { handleErrors } = require("./middlewares");
//TODO  this should point to a customer repository not users which is admin
const usersRepo = require("../../repositories/customers");
const signupTemplate = require("../../views/carts/customerAuth/custSignup");
const signinTemplate = require("../../views/carts/customerAuth/custSignin");
//TODO will need customer specific validator to not allow customer to admin activities
//TODO need required name address for customers , if purchase credit card info
const {
  requireFirstName,
  requireLastName,
  requireAddress,
  requireCity,
  requireState,
  requireZip,
  requireEmail,
  requirePassword,
  requirePasswordConfirmation,
  requireEmailExists,
  requireValidPasswordForUser,
} = require("./validators");

const router = express.Router();

router.get("/custSignup", (req, res) => {
  // TODO test this
  res.send(signupTemplate({ req }));
});
//TODO add required name and address, later credit card info
router.post(
  "/custSignup",
  [
    requireFirstName,
    requireLastName,
    requireAddress,
    requireCity,
    requireState,
    requireZip,
    requireEmail,
    requirePassword,
    requirePasswordConfirmation,
  ],
  handleErrors(signupTemplate),
  async (req, res) => {
    const { email, password } = req.body;
    //TODO point this to the customers repo, is that enough ? - all of this should be customerId ect not user
    // TODO send other feilds to the customer repo
    const user = await usersRepo.create({ email, password });

    req.session.userId = user.id;
    // TODO this should go the pages a customer needs to make a purchase
    res.redirect("/cart");
    // res.send("You have signed up ");
  }
);

router.get("/custSignout", (req, res) => {
  req.session = null;
  //TODO redirect to /
  res.send("Customer is logged out");
});
// TODO send the customer signintemplate
router.get("/custSignin", (req, res) => {
  res.send(signinTemplate({}));
});
// TODO this should be customer sign in
router.post(
  "/custSignin",
  [requireEmailExists, requireValidPasswordForUser],
  handleErrors(signinTemplate),
  async (req, res) => {
    const { email } = req.body;

    const user = await usersRepo.getOneBy({ email });

    req.session.userId = user.id;
    // TODOredirect to the pages that allow user to make purchase
    // TODO make purchase page
    // res.redirect("/admin/products");
    res.send("customer is logged in");
    // res.redirect("/cart");
  }
);

module.exports = router;
