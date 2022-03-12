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
    const { fname, lname, address, city, state, zip, email, password } =
      req.body;

    const user = await usersRepo.create({
      fname,
      lname,
      address,
      city,
      state,
      zip,
      email,
      password,
    });

    req.session.userId = user.id;
    // TODO kick off validation process email with link to log in

    res.send("Thanks for signing up please check your email for validation ");
  }
);

router.get("/custSignout", (req, res) => {
  req.session = null;
  //TODO clear local storage
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
    //TODO need to get the cart id associated with this session assinged to this user
    console.log(`The user id is ${user.id} comming from custAuth.js route`);
    // TODO after sign in add user id to local storage
    if (typeof window !== "undefined") {
      console.log("we are running on the client");
      localStorage.setItem("signedInUser", "user.id");
    } else {
      console.log("we are running on the server");
    }

    res.redirect("/purchase");
  }
);

module.exports = router;
