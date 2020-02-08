const express = require("express");

const app = express();

const port = 3000;

app.get("/", (req, res) => {
  res.send(
    `<div> 
  <form>
  <input placeholder="email"/>
  <input placeholder="password"/>
  <input placeholder="password confirmation"/>
  <button>Sign Up</button>
  </form>
  </div>`
  );
});

app.listen(port, () =>
  console.log(`App is listening of port "http://localhost:${port}"`)
);
