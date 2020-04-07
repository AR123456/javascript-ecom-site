// route handlers for products for users
const express = require("express");
const productsRepo = require("../repositories/products");
const productsIndexTemplate = require("../views/products/index");

const router = express.Router();

router.get("/", async (req, res) => {
  // array of products
  const products = await productsRepo.getAll();
  // send the template
  res.send(productsIndexTemplate({ products }));
});

module.exports = router;
