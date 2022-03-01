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
    <div>${product.title}</div>
    `;
    })
    .join("");
  return layout({
    content: `
 <h1 class="title">Products</h1>
 ${renderedProducts}
      `
  });
};
// this goes to producuts.js in the routes admin folder
