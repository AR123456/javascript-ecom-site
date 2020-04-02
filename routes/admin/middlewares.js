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
  }
};
