// custom reusable middleware to handle the rendering of error messages in the signinTemplate
// tied to admin
const { validationResult } = require("express-validator");

module.exports = {
  // receive a template function and pass it in to the params in handle Errors
  handleErrors(templateFunc, dataCb) {
    ///return function that will be executed when a request comes in
    return async (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        let data = [];
        if (dataCb) {
          data = await dataCb(req);
        }
        return res.send(templateFunc({ errors, ...data }));
      }
      next();
    };
  },
  requireAuth(req, res, next) {
    if (!req.session.userId) {
      return res.redirect("/signin");
    }
    next();
  },
};
