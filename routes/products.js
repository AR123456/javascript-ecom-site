// routes for users of the application not the admin
const express = require("express");
// set up the router
const router = express.Router();
// the root route will show the products
router.get("/", async (req, res) => {
  //
  res.send("Products !!! ");
});
module.exports = router;
