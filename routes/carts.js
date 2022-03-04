// create the router object and associate rotes to it

const express = require("express");

const router = express.Router();
// ////route handlerpost add item to cart
// receive  add item post request to add item to a cart button triggers a post reqeust .
// start in the view with the add to cart button and mak sure it is wrapped in a from with a post method and action that contains the URL to send it to.
// Need to make sure that what is sent also has the info about the specific product that belongs to the button .  Could do this by adding as s string at end of urs or using a hidden input on the form so that the user will not see it. Give a hidden input of the product id see this in action n the products index.js view
// Note that is will come in on the rec.body
router.post("/cart/products", (req, res) => {
  console.log(req.body.productId);
  res.send("Product added to cart");
});
// receive GET request to show all items in cart

// receive POST request to delete an item from a cart

module.exports = router;
