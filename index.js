const express = require("express");

const app = express();

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
  res.send(
    `<div>
  <h1>Account Created </h1>
  </div>`
  );
});
app.listen(port, () =>
  console.log(`App is listening of port "http://localhost:${port}"`)
);
