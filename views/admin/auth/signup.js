const layout = require("../layout");
// create a function to generate the HTML and export it
// pass in the req object
module.exports = ({ req }) => {
  //
  return layout({
    content: `
  <div> 
  Your Id is: ${req.session.userId}
  <form method="POST">
  <input name="email" placeholder="email"/>
  <input name="password" placeholder="password"/>
  <input name="passwordConfirmation" placeholder="password confirmation"/>
  <button>Sign Up</button>
  </form>
  </div>
  `
  });
};
