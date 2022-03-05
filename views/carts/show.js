// start with layout
const layout = require("../layout");

module.exports = ({ items }) => {
  // getting total price for the cart
  // let totalPrice = 0;
  // for (let item of items) {
  //   // one way to get the total of the cart
  //   totalPrice += item.quantity * item.product.price;
  // }
  //// getting total using reduce prev is an accumulater item is what we are iterating over.
  const totalPrice = items.reduce((prev, item) => {
    // do this with the loops, need to return so it is avalible on next iteration
    return prev + item.quantity * item.product.price;

    // this zero is the second argument to reduce - it will be passed in as prev above
  }, 0);
  const renderedItems = items
    .map((item) => {
      return `
        <div class="cart-item message">
          <h3 class="subtitle">${item.product.title}</h3>
          <div class="cart-right">
            <div>
              $${item.product.price}  X  ${item.quantity} = 
            </div>
            <div class="price is-size-4">
              $${item.product.price * item.quantity}
            </div>
            <div class="remove">
              <form method="POST">
                <button class="button is-danger">                  
                  <span class="icon is-small">
                    <i class="fas fa-times"></i>
                  </span>
                </button>
              </form>
            </div>
          </div>
        </div>
      `;
    })
    .join("");

  return layout({
    content: `
      <div id="cart" class="container">
        <div class="columns">
          <div class="column"></div>
          <div class="column is-four-fifths">
            <h3 class="subtitle"><b>Shopping Cart</b></h3>
            <div>
              ${renderedItems}
            </div>
            <div class="total message is-info">
              <div class="message-header">
                Total
              </div>
              <h1 class="title">$${totalPrice}</h1>
              <button class="button is-primary">Buy</button>
            </div>
          </div>
          <div class="column"></div>
        </div>
      </div>
    `,
  });
};
