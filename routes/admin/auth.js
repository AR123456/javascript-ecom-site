// creating the sub router
const express = require("express");
const usersRepo = require("../../repositories/users");
// creating the sub router
const router = express.Router();
// replace app with router
router.get("/signup", (req, res) => {
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

router.post("/signup", async (req, res) => {
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
router.get("/signout", (req, res) => {
  req.session = null;
  res.send("you are logged out ");
});
router.get("/signin", (req, res) => {
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
router.post("/signin", async (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;
  const user = await usersRepo.getOneBy({ email });
  if (!user) {
    return res.send("email not found ");
  } else {
    const validPassword = await usersRepo.comparePasswords(
      user.password,
      password
    );
    if (!validPassword) {
      return res.send("invalid password");
    }
    req.session.userId = user.id;
    res.send("You are signed in");
  }
});
//make all the files avalible to project
module.exports = router;
