// need to make sure that customer is logged and this is showing the cart associated with them
const layout = require("../layout");

module.exports = ({ items }) => {
  // reducer to get total price
  const subTotalPrice = items.reduce((prev, item) => {
    // provide this to next iteration
    return prev + item.quantity * item.product.price;
  }, 0);
  const shipping = subTotalPrice * 0.25;
  const tax = subTotalPrice * 0.075;
  const grandTotal = subTotalPrice + shipping + tax;
  //TODO const that is getting the associated users address render it in shipping address
  // look at routes/customer/middleware try to console.log (req.session.userId)

  //TODO const that is the assoicated users payment method

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
              <form method="POST" action="/cart/products/delete">
              <input hidden value="${item.id}" name="itemId"/>
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
            <div>Product Total</div>
              <h1 class="title">$${subTotalPrice}</h1>
            <div>Shipping</div>
              <h1 class="title">$${shipping}</h1>
            <div>Tax</div>
              <h1 class="title">$${tax}</h1>
            <div class="total message is-info">
            <div class="message-header">Grand Total</div>
            </div>
              <h1 class="title">$${grandTotal}</h1>
              <div> Shipping address</div>
              <div>Payment method</div>

              <a href="/" class="social"><button class="social is-primary">Confirm Purchase <i class="fa fa-shopping-cart"></i></button></a>
             
            </div>
          </div>
          <div class="column"></div>
        </div>
      </div>
    `,
  });
};
