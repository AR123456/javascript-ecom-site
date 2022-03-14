// TODO look at this for changes also need to tie to customer if and when customer logs in
const express = require("express");
const cartsRepo = require("../repositories/carts");
const productsRepo = require("../repositories/products");
const cartShowTemplate = require("../views/carts/show");
const purchaseTemplate = require("../views/carts/purchase");

const router = express.Router();

// Receive a post request to add an item to a cart
router.post("/cart/products", async (req, res) => {
  // Figure out the cart!
  let cart;
  if (!req.session.cartId) {
    // We dont have a cart, we need to create one,
    // and store the cart id on the req.session.cartId
    // property
    cart = await cartsRepo.create({ items: [] });
    req.session.cartId = cart.id;
  } else {
    // We have a cart! Lets get it from the repository
    cart = await cartsRepo.getOne(req.session.cartId);
  }

  const existingItem = cart.items.find(
    (item) => item.id === req.body.productId
  );
  if (existingItem) {
    // increment quantity and save cart
    existingItem.quantity++;
  } else {
    // add new product id to items array
    cart.items.push({ id: req.body.productId, quantity: 1 });
  }
  await cartsRepo.update(cart.id, {
    items: cart.items,
  });

  res.redirect("/cart");
});

// Receive a GET request to show all items in cart
router.get("/cart", async (req, res) => {
  if (!req.session.cartId) {
    return res.redirect("/");
  }

  const cart = await cartsRepo.getOne(req.session.cartId);

  for (let item of cart.items) {
    const product = await productsRepo.getOne(item.id);

    item.product = product;
  }

  res.send(cartShowTemplate({ items: cart.items }));
});

// Receive a post request to delete an item from a cart
router.post("/cart/products/delete", async (req, res) => {
  //
  console.log(req.body.itemId);
  const { itemId } = req.body;
  const cart = await cartsRepo.getOne(req.session.cartId);
  const items = cart.items.filter((item) => item.id !== itemId);
  await cartsRepo.update(req.session.cartId, { items });
  res.redirect("/cart");
});
//TODO need to associate the cart.id with the customer when they click the purchase button. Likley put this isn customer/purchase.js
// Receive a GET request to show all items in cart
router.get("/purchase", async (req, res) => {
  if (!req.session.cartId) {
    return res.redirect("/");
  }

  const cart = await cartsRepo.getOne(req.session.cartId);

  for (let item of cart.items) {
    const product = await productsRepo.getOne(item.id);

    item.product = product;
  }
  //TODO gut user id from local storage, pull in the shipping address from user and show on template

  res.send(purchaseTemplate({ items: cart.items }));
  console.log(`The cart ID is ${cart.id} comming from carts.js route`);
});
// TODO if they are not yet logged in they need to or somehow assoicate the cart with them while they make the purchase Likley put this isn customer/purchase.js
//
module.exports = router;
// TODO - putting in cart.js for now, may be better in its own route file
// TODO customer should need to be singed in and a valid customer
// know what is in the cart
// TODO need to get the customers payment info if stored or ask for it.
// be able to remove items from cart prior to purchase
// be able to add required shipping address if diffrent from home address supplied at sign in
// be able to add required method of purchase and decide to keep stored or not
// confirm purchase decision
// see any tax or shipping being added or discount
// click by for final
// TODO send customer somewhere relevant if purchase fails for some reason
// credit card charged
// est delivery time to user
// email to user
// deprecate the inventory

//TODO will need to have a delete so that invoentory is deprecated after customer makes a successfull purchase
// or if someone signed up for a webinar add to attendy list and depricte avalible spots
