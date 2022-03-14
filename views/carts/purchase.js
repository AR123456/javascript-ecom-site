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
  // have added items to cart, cart is associated with user
  // cookie : cart id lesson 435 routes carts.js

  //TODO const that is the assoicated users payment method
  //TODO after purchase remove items from the users cart
  const renderedItems = items
    .map((item) => {
      return `
      <link href="/css/cart.css" rel="stylesheet">
    
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
              <div class="row">
              <div class="col-75">
                <div class="container">
                  <form action="/action_page.php">
                    <div class="row">
                      <div class="col-50">
                        <h3>Billing Address</h3>
                        <label for="fname"><i class="fa fa-user"></i> Full Name</label>
                        <input
                          type="text"
                          id="fname"
                          name="firstname"
                          placeholder="John M. Doe"
                        />
                        <label for="email"><i class="fa fa-envelope"></i> Email</label>
                        <input
                          type="text"
                          id="email"
                          name="email"
                          placeholder="john@example.com"
                        />
                        <label for="adr"
                          ><i class="fa fa-address-card-o"></i> Address</label
                        >
                        <input
                          type="text"
                          id="adr"
                          name="address"
                          placeholder="542 W. 15th Street"
                        />
                        <label for="city"><i class="fa fa-institution"></i> City</label>
                        <input type="text" id="city" name="city" placeholder="New York" />
            
                        <div class="row">
                          <div class="col-50">
                            <label for="state">State</label>
                            <input type="text" id="state" name="state" placeholder="NY" />
                          </div>
                          <div class="col-50">
                            <label for="zip">Zip</label>
                            <input type="text" id="zip" name="zip" placeholder="10001" />
                          </div>
                        </div>
                      </div>
            
                      <div class="col-50">
                        <h3>Payment</h3>
                        <label for="fname">Accepted Cards</label>
                        <div class="icon-container">
                          <i class="fa fa-cc-visa" style="color: navy"></i>
                          <i class="fa fa-cc-amex" style="color: blue"></i>
                          <i class="fa fa-cc-mastercard" style="color: red"></i>
                          <i class="fa fa-cc-discover" style="color: orange"></i>
                        </div>
                        <label for="cname">Name on Card</label>
                        <input
                          type="text"
                          id="cname"
                          name="cardname"
                          placeholder="John More Doe"
                        />
                        <label for="ccnum">Credit card number</label>
                        <input
                          type="text"
                          id="ccnum"
                          name="cardnumber"
                          placeholder="1111-2222-3333-4444"
                        />
                        <label for="expmonth">Exp Month</label>
                        <input
                          type="text"
                          id="expmonth"
                          name="expmonth"
                          placeholder="September"
                        />
            
                        <div class="row">
                          <div class="col-50">
                            <label for="expyear">Exp Year</label>
                            <input
                              type="text"
                              id="expyear"
                              name="expyear"
                              placeholder="2018"
                            />
                          </div>
                          <div class="col-50">
                            <label for="cvv">CVV</label>
                            <input type="text" id="cvv" name="cvv" placeholder="352" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <label>
                      <input type="checkbox" checked="checked" name="sameadr" /> Shipping
                      address same as billing
                    </label>
                    <input type="submit" value="Continue to checkout" class="btn" />
                  </form>
                </div>
              </div>
            </div>

               
             
            </div>
          </div>
          <div class="column"></div>
        </div>
      </div>
    `,
  });
};
