// TODO should not need this for customers but will need purchasing functionality, renameing to purchase
const express = require("express");
const multer = require("multer");
// TODO customer should need to be singed in and avalid customer
const { handleErrors, requireAuth } = require("./middlewares");
// const productsRepo = require('../../repositories/products');
// const productsNewTemplate = require('../../views/admin/products/new');
// const productsIndexTemplate = require('../../views/admin/products/index');
// const productsEditTemplate = require('../../views/admin/products/edit');
// const { requireTitle, requirePrice } = require('./validators');

const router = express.Router();
// not uploading images as a customer so do not need multer
// const upload = multer({ storage: multer.memoryStorage() });
//
// TODO need to get the customers payment info if stored or ask for it.

// router.get('/admin/products', requireAuth, async (req, res) => {
//   const products = await productsRepo.getAll();
//   res.send(productsIndexTemplate({ products }));
// });

router.get("/admin/products/:id/edit", requireAuth, async (req, res) => {
  const product = await productsRepo.getOne(req.params.id);

  if (!product) {
    return res.send("Product not found");
  }
  // TODO send customer somewhere relevant if purchase fails for some reason
  res.send(productsEditTemplate({ product }));
});

//TODO will need to have a delete so that invoentory is deprecated after customer makes a successfull purchase
// or if someone signed up for a webinar add to attendy list and depricte avalible spots
router.post("/admin/products/:id/delete", requireAuth, async (req, res) => {
  await productsRepo.delete(req.params.id);

  res.redirect("/admin/products");
});

module.exports = router;
// TODO
// customers need to have a cart
// know what is in the cart
// be able to remove items from cart prior to purchase
// be able to add required shipping address if diffrent from home address supplied at sign in
// be able to add required method of purchase and decide to keep stored or not
// confirm purchase decision
// see any tax or shipping being added or discount
// click by for final
// credit card charged
// est delivery time to user
// email to user
// deprecate the inventory
