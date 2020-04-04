// this will list the products for the front end. It is called index because we usualy associate showing a list of things with and index.admin
const layout = require("../layout");
const { getError } = require("../../helpers");

module.exports = ({ products }) => {
  // this function will map through the products and build out html snipit
  //map  over list of products
  // create HTML snippit
  // resulting array then turned into string to put into the template literal in the retun
  //.join puts them into one big string
  const renderedProducts = products
    .map(product => {
      //
      return `
      <tr>
        <td>${product.title}</td>
        <td>${product.price}</td>
        <td>
          <a href="/admin/products/${product.id}/edit">
            <button class="button is-link">
              Edit
            </button>
          </a>
        </td>
        <td>
          <button class="button is-danger">Delete</button>
        </td>
      </tr>
    `;
    })
    .join("");

  return layout({
    content: `
      <div class="control">
        <h1 class="subtitle">Products</h1>  
        <a href="/admin/products/new" class="button is-primary">New Product</a>
      </div>
      <table class="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Price</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          ${renderedProducts}
        </tbody>
      </table>
    `
  });
};
// this goes to producuts.js in the routes admin folder
