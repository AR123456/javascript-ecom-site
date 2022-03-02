// get the error from the helper function
const { getError } = require("../../helpers");

const layout = require("../layout");
// pass in the errors object from getErros
module.exports = ({ product, errors }) => {
  return layout({
    content: `
        <form method="POST">
        <input name="title" value="${product.title}"/>
      ${getError(errors, "title")}
        <input name="price" value="${product.price}"/>
        ${getError(errors, "price")}
        <input name="image" type="file"/>
        <button>Submit</button>
        </form>
              `,
  });
};
