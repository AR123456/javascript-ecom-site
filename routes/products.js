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
//1 tie cart to person not logged in - this logic needs to be able to create active shopping carts and store products in in for un signed in users
// generate a representation of a shopping cart and assig it a random ID  set that ID inside a cookie and send that the person sending the request.  So it is assinged  to them in their browser. stuff in cart is assinged to that ID which is assinged to that person
//2 tie product to cart
// There are a few ways to do this... dont use them -create a cart ID for the user then  could add that id to each item in the cart -- this is not quite the definition of a product so poluting that and we are storing potental stray items in the producs carts array.  Lots of lost dat

// Another bad approche would be to genearte cart ID  then make a seprate repo that is for carts , that repo stoes the cart and a products array inside of that objet that is the products.  - the downside of this is that we are making a copy of the products def and storing it in the cart.  The copy will not get any updates such as price made subsequent to it being placed in the stored cart.   WWould be a big lift to go over all the stored objects and update the price
//// This is the approch to use :
// Products Repo &  Carts Repo in the cart is a randomly generated ID and a products array this time dont store a product just the product ID  and a quantity value . The product ID is a pointer to what is in the products repository.  So to find what someone has in their cart use that pointer to find it in the products  array. Any updates to the products repo will not need to be reconciled in each individual cart.  
