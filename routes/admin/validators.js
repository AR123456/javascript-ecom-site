// validation chains for export and use in app
const { check, validationResult } = require("express-validator");
const usersRepo = require("../../repositories/users");

module.exports = {
  requireEmail: check("email")
    .trim()
    .normalizeEmail()
    .isEmail()
    .custom(async email => {
      const existingUser = await usersRepo.getOneBy({ email: email });
      if (existingUser) {
        throw new Error("Email is in use ");
      }
    }),
  requirePassword: check("password")
    .trim()
    .isLength({ min: 4, max: 20 }),
  requirePasswordConfirmation: check("passwordConfirmation")
    .trim()
    .isLength({ min: 4, max: 20 })
    .custom(async (passwordConfirmation, { req }) => {
      if (passwordConfirmation !== req.body.password) {
        throw new Error("passwords do not match ");
      }
    })
};
