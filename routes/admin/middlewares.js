// custom reusable middleware to handle the rendering of error messages in the signinTemplate
// tied to admin
const { validationResult } = require("express-validator");

module.exports = {
  // receive a template function and pass it in to the params in handle Errors
  // update with an additional param to get products from handleErrors in the post request  here called dataCb
  handleErrors(templateFunc, dataCb) {
    ///return function that will be executed when a request comes in
    return async (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        // this is the errors object
        // here need to call the funtion supplied to us by the handleErrors call back funtion  aka dataCb
        // then add it in the res.send
        // need to define data as an empty object here since it would be out of scope otherwise outside the following if statement
        let data = [];
        if (dataCb) {
          // check to see if dataCb was called and if so call it and pass in request
          // update the data var
          data = await dataCb(req);
        }
        // data is an object with the product key and value merge it ino the return being sent to templateFunc with ...data
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
