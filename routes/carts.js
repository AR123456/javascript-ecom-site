// create the router object and associate rotes to it
const express = require("express");
const carts = require("../repositories/carts");
// need this repo to create the cart
const cartsRepo = require("../repositories/carts");
// need to display products in cart
const productsRepo = require("../repositories/products");
// so that we can use and send data to this teplate
const cartShowTemplate = require("../views/carts/show");
const router = express.Router();
// Note that is will come in on the rec.body
router.post("/cart/products", async (req, res) => {
  let cart;

  if (!req.session.cartId) {
    cart = await cartsRepo.create({ items: [] });
    req.session.cartId = cart.id;
  } else {
    cart = await cartsRepo.getOne(req.session.cartId);
  }
  const existingItem = cart.items.find(
    (item) => item.id === req.body.productId
  );
  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.items.push({ id: req.body.productId, quantity: 1 });
  }
  // save cart back up to repo
  await cartsRepo.update(cart.id, { items: cart.items });

  res.send("Product added to cart");
});
// GET request to show all items in cart
router.get("/cart", async (req, res) => {
  if (!req.session.cartId) {
    return res.redirect("/");
  }
  const cart = await cartsRepo.getOne(req.session.cartId);

  for (let item of cart.items) {
    const product = await productsRepo.getOne(item.id);

    item.product = product;
  }
  // out of for loop send the template
  res.send(cartShowTemplate({ items: cart.items }));
});

// receive POST request to delete an item from a cart

module.exports = router;
