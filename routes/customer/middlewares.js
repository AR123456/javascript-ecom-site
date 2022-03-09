//TODO test if customer login fails or works
const { validationResult } = require("express-validator");

module.exports = {
  handleErrors(templateFunc, dataCb) {
    return async (req, res, next) => {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        let data = {};
        if (dataCb) {
          data = await dataCb(req);
        }

        return res.send(templateFunc({ errors, ...data }));
      }

      next();
    };
  },
  requireAuth(req, res, next) {
    // TODO test
    if (!req.session.userId) {
      return res.redirect("/customerSignin");
    }

    next();
  },
};
