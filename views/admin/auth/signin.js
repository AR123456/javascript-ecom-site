const layout = require("../layout");
module.exports = () => {
  // return layout with object of content with the string of the html string
  return layout({
    content: `
    <div> 
  <form method="POST">
  <input name="email" placeholder="email"/>
  <input name="password" placeholder="password"/>
  <button>Sign In</button>
  </form>
  </div>
  `
  });
};
