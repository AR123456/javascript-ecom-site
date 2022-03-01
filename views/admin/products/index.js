// this will list the products for the front end. It is called index because we usualy associate showing a list of things with and index.admin
const layout = require("../layout");
const { getError } = require("../../helpers");

module.exports = ({ products }) => {
  // this function will map through the products and build out html snipit
  //map  over list of products
  // result will be an array of HTML snipits
  // create HTML snippit
  // resulting array then turned into string to put into the template literal in the return
  //.join puts the array into one big string to show
  const renderedProducts = products
    // renderedProducts will be an array
    // passing a function called product into the map, it will be invoked
    // with every element inside the array
    .map((product) => {
      // multi line string representing "product"
      return `
    <div>${product.title}</div>
    `;
    })
    // .join is making this one big string and assigning it to  renderedProducts
    .join("");
  return layout({
    content: `
 <h1 class="title">Products</h1>
 ${renderedProducts}
      `,
  });
};
// this goes to producuts.js in the routes admin folder
