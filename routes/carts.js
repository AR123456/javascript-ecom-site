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
    //no cart so create one and store it on rec.session.cartId property
    cart = await cartsRepo.create({ items: [] });
    req.session.cartId = cart.id;
  } else {
    // there is a cart get it. Use method  from the repository repo get one method
    cart = await cartsRepo.getOne(req.session.cartId);
  }
  const existingItem = cart.items.find(
    (item) => item.id === req.body.productId
  );
  if (existingItem) {
    // increment quantity for existing product or add new product to items array
    existingItem.quantity++;
  } else {
    // add new item
    cart.items.push({ id: req.body.productId, quantity: 1 });
  }
  // save cart back up to repo
  await cartsRepo.update(cart.id, { items: cart.items });
  // display the cart display page insted of this.
  res.send("Product added to cart");
});
// receive GET request to show all items in cart
router.get("/cart", async (req, res) => {
  // make sure the user has a cart assinged, if not go back to product listing page
  if (!req.session.cartId) {
    return res.redirect("/");
  }
  const cart = await cartsRepo.getOne(req.session.cartId);
  // itterate cart and look for id and then on the id ....
  for (let item of cart.items) {
    // for each item look at id and quantity
    // need products repo for this
    const product = await productsRepo.getOne(item.id);
    // need to had this data off to a template so use item property
    item.product = product;
  }
  // out of for loop send the template
  res.send(cartShowTemplate({ items: cart.items }));
});
// set up route handler for displaying the cart display page

// receive POST request to delete an item from a cart

module.exports = router;
