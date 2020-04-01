const layout = require("../layout");
const { getError } = require("../../helpers");
module.exports = ({ errors }) => {
  //return html- this form needs a method of post vs its defalut of get.
  return layout({
    content: `
      <form method="POST">
      <input placeholder="Title" name="title" />
      <input placeholder="Price" name="price" />
      <input type="file" name="image" />
      <button>Submit</button>
      </form>
      
      `
  });
};
// this will be used by products route page to show to user
