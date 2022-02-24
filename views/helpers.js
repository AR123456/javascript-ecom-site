//array of helper objects can be imported where needed and needed oject used as function
// using in singin and signup js

module.exports = {
  getError(errors, prop) {
    try {
      return errors.mapped()[prop].msg;
    } catch (err) {
      return "";
    }
  },
};
