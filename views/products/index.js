// layout for customer facing
module.exports = ({ products }) => {
  //object of products - iterate over it
  const renderedProducts = products
    .map(product => {
      return ` <li> ${product.title}-${product.price}</li>`;
    })
    .join("");

  return `
    <ul> ${renderedProducts}</ul>

    `;
};
