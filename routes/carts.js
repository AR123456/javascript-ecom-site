// route handlers for products for users
const express = require("express");
const cartsRepo = require("../repositories/carts");

const router = express.Router();

// add item to cart - form submit - post request on submit
// recive post request
router.post("/cart/products", async (req, res) => {
  // figure out if there is a cart
  let cart;
  if (!req.session.cartId) {
    // create cart
    // store cart id on the req.session.cartId
    cart = await cartsRepo.create({ items: [] });
    req.session.cartId = cart.id;
  } else {
    // we have cart so get it from repo
    cart = await cartsRepo.getOne(req.session.cartId);
  }
  console.log(cart);
  // check to see if product is in cart
  const existingItem = cart.items.find(item => item.id === req.body.productId);

  if (existingItem) {
    //increment quantity for existing product
    existingItem.quantity++;
  } else {
    // or add new product to cart
    cart.items.push({ id: req.body.productId, quantity: 1 });
  }
  await cartsRepo.update(cart.id, {
    items: cart.items
  });

  res.send("product added ");
});
// show the stuff in the cart
// recive get

//recive post

module.exports = router;
