// import express
const express = require("express");
const multer = require("multer");

const { handleErrors } = require("./middlewares");
const productsRepo = require("../../repositories/products");
const productsNewTemplate = require("../../views/admin/products/new");
const productsIndexTemplate = require("../../views/admin/products/index");
const { requireTitle, requirePrice } = require("./validators");

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

///1 list products
router.get("/admin/products", async (req, res) => {
  //user is making request to admin/products repo
  //   res is response to browser
  const products = await productsRepo.getAll();
  // call productsIndexTemplate and pass in the products object
  res.send(productsIndexTemplate({ products: products }));
});
///2 show form to create product
router.get("/admin/products/new", (req, res) => {
  //user is making request to admin/products/new
  //   res is response to browser
  res.send(productsNewTemplate({}));
});
///3 submit create product form
// has 3 params route, validators and the ususal req,res
router.post(
  "/admin/products/new",
  upload.single("image"),
  [requireTitle, requirePrice],
  handleErrors(productsNewTemplate),
  async (req, res) => {
    const image = req.file.buffer.toString("base64");
    const { title, price } = req.body;
    await productsRepo.create({ title, price, image });
    res.send("submitted");
  }
);
///4 show edit product route
/// 5 submit edited product
/// 6 delete product
// export the moule
module.exports = router;
// go to index.js and import this router
