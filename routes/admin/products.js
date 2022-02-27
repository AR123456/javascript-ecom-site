// import express
const express = require("express");
const { validationResult } = require("express-validator");
const multer = require("multer");
const productsRepo = require("../../repositories/products");
const productsNewTemplate = require("../../views/admin/products/new");
// get validators
const { requireTitle, requirePrice } = require("./validators");

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

///1 list products
router.get("/admin/products", (req, res) => {
  //user is making request to admin/products
  //   res is response to browser
});
///2 show form to create product
router.get("/admin/products/new", (req, res) => {
  //user is making request to admin/products/new
  //   res is response to browser
  res.send(productsNewTemplate({}));
});
///3 submit create product form
// 3 params route, validators and the ususal req,res
router.post(
  "/admin/products/new",
  [requireTitle, requireTitle],
  upload.single("image"),
  (req, res) => {
    //
    const errors = validationResult(req);
    console.log(req.file);

    res.send("submitted");
  }
);
///4 show edit product route
/// 5 submit edited product
/// 6 delete product
// export the moule
module.exports = router;
// go to index.js and import this router
