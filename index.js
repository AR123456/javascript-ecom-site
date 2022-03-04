const express = require("express");
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");
const authRouter = require("./routes/admin/auth");
const adminProductsRouter = require("./routes/admin/products");
const productsRouter = require("./routes/products");
const cartsRouter = require("./routes/carts");
// express validator package https://express-validator.github.io/docs/sanitization.html
const app = express();
//middleware
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cookieSession({
    keys: ["adfkjafdkjl"],
  })
);
// place right below other middleware
app.use(authRouter);

app.use(productsRouter);
app.use(adminProductsRouter);
// add the carts router
app.use(cartsRouter);
const port = 3000;

app.listen(port, () =>
  console.log(`App is listening on http://localhost:${port}`)
);
