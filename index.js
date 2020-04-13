const express = require("express");
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");
const authRouter = require("./routes/admin/auth");
const adminProductRouter = require("./routes/admin/products");
const productsRouter = require("./routes/products");
const cartRouter = require("./routes/carts.js");
// express validator package https://express-validator.github.io/docs/sanitization.html
const app = express();
//middleware
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cookieSession({
    keys: ["adfkjafdkjl"]
  })
);
// place right below other middleware
app.use(authRouter);
// associate the producst router with the app
app.use(adminProductRouter);
// for user cart
app.use(productsRouter);

app.use(cartRouter);
const port = 3000;

app.listen(port, () =>
  console.log(`App is listening on http://localhost:${port}`)
);
