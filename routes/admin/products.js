// import express
const express = require("express");

// set up new router
const router = express.Router();
// stub out route handlers list products, show form to create product, submit create product form , show edit product , submit edited product and delet product
///1 list products
router.get("./admin/products", (req, res) => {
  //user is making request to admin/products
  //   res is response to browser
});
///2 show form to create product
router.get("/admin/products/new", (req, res) => {
  //user is making request to admin/products/new
  //   res is response to browser
});
///3 submit create product form
///4 show edit product route
/// 5 submit edited product
/// 6 delete product
// export the moule
module.exports = router;
// go to index.js and import this router
