//TODO redirect to customer specific routes 
const { validationResult } = require('express-validator');

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
    // TODO direct to customer specific route 
    if (!req.session.userId) {
      return res.redirect('/signin');
    }

    next();
  }
};