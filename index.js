const express = require("express");
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");
const authRouter = require("./routes/admin/auth");
const productRouter = require("./routes/admin/products");
// express validator package https://express-validator.github.io/docs/sanitization.html
const app = express();
//middleware
app.use(express.static("public"));
// post request coming from public folder will miss this middleware for the image upload
// this is being passed off to multer in products route
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cookieSession({
    keys: ["adfkjafdkjl"],
  })
);
// place right below other middleware
app.use(authRouter);
// associate the producst router with the app
app.use(productRouter);
const port = 3000;

app.listen(port, () =>
  console.log(`App is listening on http://localhost:${port}`)
);
