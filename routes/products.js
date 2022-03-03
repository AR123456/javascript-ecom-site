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

// want to be able to show cart and ability to add but retain selections even if the user is not logged in. Then carry the choices over to the logged in user
//1 tie cart to person not logged in
//2 tie product to cart
