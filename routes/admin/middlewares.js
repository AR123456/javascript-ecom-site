// custom reusable middleware to handle the rendering of error messages in the signinTemplate
// tied to admin
const { validationResult } = require("express-validator");

module.exports = {
  // recive a template function and pass it in to the parans in handle Errors
  handleErrors(templateFunc) {
    ///return function that will be executed when a request comes in
    return (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.send(templateFunc({ errors }));
      }
      next();
    };
  },
  // because the session.userId is created at sign in and stored on the cookie
  // check for it and if not found redirect to the signin page
  requireAuth(req, res, next) {
    if (!req.session.userId) {
      return res.redirect("/signin");
    }
    // all is well go on to the next step
    next();
  },
};
