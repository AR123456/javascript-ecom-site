const express = require("express");
// const carts = require("../repositories/carts");
const cartsRepo = require("../repositories/carts");
const productsRepo = require("../repositories/products");
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

  // res.send("Product added to cart");
  res.redirect("/cart");
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
router.post("/cart/products/delete", async (req, res) => {
  // console.log(req.body.itemId);
  const { itemId } = req.body;
  // console.log(itemId);
  const cart = await cartsRepo.getOne(req.session.cartId);
  console.log(cart);
  // filer out what returns false so if this item dosent match up with and item in the array filter it out.
  // true add to new array
  // // false forget the item , do not add to new array
  const items = cart.items.filter((item) => item.id !== itemId);
  // console.log(items);
  // now update the cart -
  // update takes 2 params id of item and object of attributes we want to replace on the target record
  // console.log(req.session.cartId)
  await cartsRepo.update(req.session.cartTd, { items });
  // send respons back to go back to cart page
  res.redirect("/cart");
});
module.exports = router;
