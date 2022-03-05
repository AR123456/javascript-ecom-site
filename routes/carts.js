// create the router object and associate rotes to it
const express = require("express");
const carts = require("../repositories/carts");
// need this repo to create the cart
const cartRepo = require("../repositories/carts");
const router = express.Router();
// Note that is will come in on the rec.body
router.post("/cart/products", async (req, res) => {
  //cart logic- cookie session does this user have a cart on cartId property coming from cart repo
  // the cart is scoped to the if statement  so declare here so it can be updated in the if
  let cart;

  if (!req.session.cartId) {
    //no cart so create one and store it on rec.session.cartId property
    // create a starting object , empty array by default
    cart = await cartRepo.create({ items: [] });
    // assing the id of the cart to rec.session
    req.session.cartId = cart.id;
  } else {
    // there is a cart get it. Use method  from the repository repo get one method
    cart = await cartsRepo.getOne(req.session.cartId);
  }
  console.log(cart);
  // increment quantity for existing product or add new product to items array

  // update quantity or is this a ndw itme

  console.log(req.body.productId);
  res.send("Product added to cart");
});
// receive GET request to show all items in cart

// receive POST request to delete an item from a cart

module.exports = router;
