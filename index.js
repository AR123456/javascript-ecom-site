const express = require("express");
const bodyParser = require("body-parser");
// cookie session is a middle ware so need to wire up below using app.use
const cookieSession = require("cookie-session");
const usersRepo = require("./repositories/users");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cookieSession({
    // confguration object with the keys
    // keys is a random set of characters
    //used to encrypt info in the cookie
    keys: ["adfkjafdkjl"],
  })
);

const port = 3000;

app.get("/", (req, res) => {
  // req.session.userId  is being stored in the browser we can get this using cookie-session and display to user
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
// cookie session adds an additional property ot the req object - or incoming request ( req.session)
app.post("/", async (req, res) => {
  console.log(req.body);
  const { email, password, passwordConfirmation } = req.body;
  const existingUser = await usersRepo.getOneBy({ email: email });
  if (existingUser) {
    return res.send("email taken ");
  }
  if (password !== passwordConfirmation) {
    return res.send("passwords do not match ");
  }
  //create user
  const user = await usersRepo.create({ email, password });

  // store id of that user in cookie
  // expess API can handle cookies but 3rd party package can do that .  Cookies are hard to handel and easy to get wrong.  Better to use a libary
  // req.session === {}; // added by cookie-session its a JS object, any info in the object is maintained by cookie session
  req.session.userId = user.id;

  res.send("account created");
});
app.listen(port, () =>
  console.log(`App is listening of port "http://localhost:${port}"`)
);
