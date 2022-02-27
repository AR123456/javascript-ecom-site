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
// has 3 params route, validators and the ususal req,res
// post request coming from the public folder will miss the bodyParser middleware
router.post(
  "/admin/products/new",
  // order is important here
  // upload.. is comming from the multer middleware.
  // since this is coming in from the public dir body parser middleware
  // in index.js is being missed. (due to the needed order of imports public needs to be before body parser)
  // so multer is parsing req.body for us
  upload.single("image"),
  // after upload... so multer can pars the req.body for us
  [requireTitle, requirePrice],

  async (req, res) => {
    // turning the image into a string to store in product json file.
    // this is not a production appropriate solution
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // important to log the errors if there are any - send get errors to the view new.js in products
      return res.send(productsNewTemplate({ errors }));
    }
    const image = req.file.buffer.toString("base64");
    const { title, price } = req.body;
    // call the reusable create function in the repository.js file
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
