const express = require("express");
const bodyParser = require("body-parser");

const app = express();
//Middleware   app.use wires it up
// now bodyParser will parse any form for us.
app.use(bodyParser.urlencoded({ extended: true }));

const port = 3000;

app.get("/", (req, res) => {
  res.send(
    `<div> 
  <form method="POST">
  <input name="email" placeholder="email"/>
  <input name="password" placeholder="password"/>
  <input name="passwordConfirmation" placeholder="password confirmation"/>
  <button>Sign Up</button>
  </form>
  </div>`
  );
});
app.post("/", (req, res) => {
  console.log(req.body);
  res.send("account created");
});
app.listen(port, () =>
  console.log(`App is listening of port "http://localhost:${port}"`)
);
