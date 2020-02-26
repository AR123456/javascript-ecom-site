const layout = require("../layout");
//prop === email password or passowrd congirmaiton
const getError = (errors, prop) => {
  // if (errors) {
  //   // map takes array and returns an object
  //   // if there are no errors there is nothing there so have to handle
  //   // using if statement could get message undefined message if there are no errors
  //   // so use try catch instead
  //   return errors.mapped()[prop].msg;
  // }
  // noted here that lecturer felt this was a "cheat" bunch of if statements would be technicaly correct
  try {
    return errors.mapped()[prop].msg;
  } catch (err) {
    // if we land here we are essentialy looking up an error message that dosent exist
    return "";
  }
};
// sending in errors from auth js
// need to make sure that there are errors before sending to template
// use helper function for that
module.exports = ({ req, errors }) => {
  return layout({
    content: `
  <div> 
  Your Id is: ${req.session.userId}
  <form method="POST">
  <input name="email" placeholder="email"/>
  ${getError(errors, "email")}
  <input name="password" placeholder="password"/>
  ${getError(errors, "password")}
  <input name="passwordConfirmation" placeholder="password confirmation"/>
  ${getError(errors, "passwordConfirmation")}
  <button>Sign Up</button>
  </form>
  </div>
  `
  });
};
