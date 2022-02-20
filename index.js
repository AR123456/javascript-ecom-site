const express = require("express");
const bodyParser = require("body-parser");
const usersRepo = require("./repositories/users");

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
// user account creation route
app.post("/", async (req, res) => {
  //are password and confrimation password different
  console.log(req.body); // req.body is object of properties from form name inputs
  const { email, password, passwordConfirmation } = req.body;
  // create an existing user const to store use of the method from the users.js file
  const existingUser = await usersRepo.getOneBy({ email: email });

  //is email already taken
  // if existing user is defined meaning getOneBy finds something
  if (existingUser) {
    return res.send("email taken ");
  }
  if (password !== passwordConfirmation) {
    return res.send("passwords do not match ");
  }
  res.send("account created");
});
app.listen(port, () =>
  console.log(`App is listening of port "http://localhost:${port}"`)
);
