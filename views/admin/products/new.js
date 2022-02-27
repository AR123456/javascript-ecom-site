const layout = require("../layout");
const { getError } = require("../../helpers");
module.exports = ({ errors }) => {
  //return html- this form needs a method of post vs its default of get.
  // the errors are coming from the route products post new products
  return layout({
    content: `
      <form method="POST" enctype="multipart/form-data">
      <input placeholder="Title" name="title" />
      ${getError(errors, "title")}
      <input placeholder="Price" name="price" />
      ${getError(errors, "price")}
      <input type="file" name="image" />
      <button>Submit</button>
      </form>
      
      `,
  });
};
// this will be used by products route page to show to user
