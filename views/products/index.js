// index of products for users
// layout for the customer facing products
module.exports = ({ products }) => {
  // mop over products
  const renderedProducts = products
    .map((product) => {
      return `
      <li>${product.title} - ${product.price} </li>
      `;
    })
    .join("");
  return `
  <ul> 
  ${renderedProducts}
  </ul>
  `;
};
