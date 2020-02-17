const express = require("express");
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");
const usersRepo = require("./repositories/users");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cookieSession({
    keys: ["adfkjafdkjl"]
  })
);

const port = 3000;
// changing to signup
app.get("/signup", (req, res) => {
  res.send(
    `<div> 
    Your Id is: ${req.session.userId}
  <form method="POST">
  <input name="email" placeholder="email"/>
  <input name="password" placeholder="password"/>
  <input name="passwordConfirmation" placeholder="password confirmation"/>
  <button>Sign Up</button>
  </form>
  </div>`
  );
});
// changing to signup
app.post("/signup", async (req, res) => {
  console.log(req.body);
  const { email, password, passwordConfirmation } = req.body;
  const existingUser = await usersRepo.getOneBy({ email: email });
  if (existingUser) {
    return res.send("email taken ");
  }
  if (password !== passwordConfirmation) {
    return res.send("passwords do not match ");
  }

  const user = await usersRepo.create({ email, password });
  req.session.userId = user.id;
  res.send("account created");
});
app.get("/signout", (req, res) => {
  //tell browser to forget what is in the cookie
  req.session = null;
  res.send("you are logged out ");
});
app.get("/signin", (req, res) => {
  //
  res.send(
    `<div> 
    <form method="POST">
  <input name="email" placeholder="email"/>
  <input name="password" placeholder="password"/>
  <button>Sign In</button>
  </form>
  </div>`
  );
});
app.post("/signin", async (req, res) => {
 //
});
app.listen(port, () =>
  console.log(`App is listening on http://localhost:${port}`)
);
