const { check } = require("express-validator");
// TODO point to customers repo  should the admin have an additinal admin id requirement
const usersRepo = require("../../repositories/customers");

module.exports = {
  //TODO will need customer specific required items ie log in to make a purchase or supply at time of purchase if not account
  // credit card number
  // exp date of card
  // 3 digit code of card
  // zip code for card address
  requireFirstName: check("fname")
    .trim()
    .isLength({ min: 2, max: 40 })
    .withMessage("Must be between 2 and 40 characters"),
  requireLastName: check("lname")
    .trim()
    .isLength({ min: 2, max: 40 })
    .withMessage("Must be between 2 and 40 characters"),
  //TODO look at street address best practices
  requireAddress: check("address")
    .trim()
    .isLength({ min: 2, max: 40 })
    .withMessage("Must be between 2 and 40 characters"),
  //TODO look at best practice for citys
  requireCity: check("city")
    .trim()
    .isLength({ min: 2, max: 40 })
    .withMessage("Must be between 2 and 40 characters"),
  //TODO look at best practices for states
  requireState: check("state")
    .trim()
    .isLength({ min: 2, max: 40 })
    .withMessage("Must be between 2 and 40 characters"),

  requireZip: check("zip")
    .trim()
    .isPostalCode("US")
    .withMessage("Must be an 5 digit zip code"),
  requireEmail: check("email")
    .trim()
    .normalizeEmail()
    .isEmail()
    .withMessage("Must be a valid email")
    .custom(async (email) => {
      const existingUser = await usersRepo.getOneBy({ email });
      if (existingUser) {
        throw new Error("Email in use");
      }
    }),
  requirePassword: check("password")
    .trim()
    .isLength({ min: 4, max: 20 })
    .withMessage("Must be between 4 and 20 characters"),
  requirePasswordConfirmation: check("passwordConfirmation")
    .trim()
    .isLength({ min: 4, max: 20 })
    .withMessage("Must be between 4 and 20 characters")
    .custom(async (passwordConfirmation, { req }) => {
      if (passwordConfirmation !== req.body.password) {
        throw new Error("Passwords must match");
      }
    }),
  requireEmailExists: check("email")
    .trim()
    .normalizeEmail()
    .isEmail()
    .withMessage("Must provide a valid email")
    .custom(async (email) => {
      const user = await usersRepo.getOneBy({ email });
      if (!user) {
        throw new Error("Email not found!");
      }
    }),
  requireValidPasswordForUser: check("password")
    .trim()
    .custom(async (password, { req }) => {
      const user = await usersRepo.getOneBy({ email: req.body.email });
      if (!user) {
        throw new Error("Invalid password");
      }

      const validPassword = await usersRepo.comparePasswords(
        user.password,
        password
      );
      if (!validPassword) {
        throw new Error("Invalid password");
      }
    }),
};
