// custom reusable middleware to handle the rendering of error messages in the signinTemplate
// tied to admin
const { validationResult } = require("express-validator");

module.exports = {
  // receive a template function and pass it in to the parans in handle Errors
  handleErrors(templateFunc) {
    ///return function that will be executed when a request comes in
    // all middlewares must be functions
    return (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.send(templateFunc({ errors }));
      }
      // next() tells express to keep going processing this request  next is a callback
      next();
    };
  },
};
