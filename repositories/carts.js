const Repository = require("./repository");

// make use of the generic repository in products
class CartsRepository extends Repository {
  // will add more here
}
// create a new instance of productsRepository and export it
module.exports = new CartsRepository("carts.json");
