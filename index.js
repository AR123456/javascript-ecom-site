const express = require("express");
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");
const authRouter = require("./routes/admin/auth");
const app = express();
//middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cookieSession({
    keys: ["adfkjafdkjl"]
  })
);
// place right below other middleware
app.use(authRouter);
const port = 3000;

app.listen(port, () =>
  console.log(`App is listening on http://localhost:${port}`)
);
