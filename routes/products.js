// routes for users of the application not the admin
const express = require("express");
// get the  from the products repo
const productsRepo = require("../repositories/products.js");
// requiere the templae
const productsIndexTemplate = require("../views/products/index");
// set up the router
const router = express.Router();
// the root route will show the products
router.get("/", async (req, res) => {
  //here producs is an array
  const products = await productsRepo.getAll();
  res.send(productsIndexTemplate({ products }));
});
module.exports = router;

// store a pointer to the product in the cart repo
// will need routes to handle this, a repo and view to see cart
