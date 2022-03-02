// this will list the products for the front end. It is called index because we usualy associate showing a list of things with and index.admin
const layout = require("../layout");
const { getError } = require("../../helpers");

module.exports = ({ products }) => {
  // wrap the del button in a form element to take advantage for the forms
  //built in post request behavior vs the href atrubutes  default of get
  // http delete reqquest would be better but form only supports post or ge, not delete.
  // so using oost to make the del
  // using post method and action of the url we are going to make post to
  // then in routes make a post request handler that looks for this post reqeust URL
  const renderedProducts = products
    .map((product) => {
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
         <form method="POST" action="/admin/products/${product.id}/delete">  
         <button class="button is-danger">Delete</button> 
         </form>
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
    `,
  });
};
// this goes to producuts.js in the routes admin folder
