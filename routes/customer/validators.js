const { check } = require("express-validator");
// TODO point to customers repo  should the admin have an additinal admin id requirement
const usersRepo = require("../../repositories/customers");

module.exports = {
  //TODO will need customer specific required items ie log in to make a purchase or supply at time of purchase if not account

  // First Name
  // Last Name
  // Home address for credit card validation
  // Shipping address if not home
  // email
  // password
  // credit card number
  // exp date of card
  // 3 digit code of card
  // zip code for card address
  // requireTitle: check("title")
  //   .trim()
  //   .isLength({ min: 5, max: 40 })
  //   .withMessage("Must be between 5 and 40 characters"),
  // requirePrice: check("price")
  //   .trim()
  //   .toFloat()
  //   .isFloat({ min: 1 })
  //   .withMessage("Must be a number greater than 1"),
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
