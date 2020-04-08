// route handlers for products for users
const express = require("express");
// const cartsRepo = require("../repositories/carts");

const router = express.Router();

// add item to cart - form submit - post request on submit
// recive post request
router.post("/cart/products", (req, res) => {
  console.log(req.body.productId);
  res.send("product added ");
});
// show the stuff in the cart
// recive get

//recive post

module.exports = router;
