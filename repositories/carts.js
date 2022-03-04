// this is very similar to the carts repository so will ues a special extended copy of it
//  import repository

const Repository = require("./repository.js");

// class that extends Repository
class CartsRepository extends Repository {}

// first param is telling express where to store this  - would really be in a DB
module.exports = new CartsRepository("carts.json");

