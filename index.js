const express = require("express");

const app = express();

const port = 3000;
// when we go to the root show this HTML
app.get("/", (req, res) => {
  // put a tempate string into the res.send
  // if the browser sees something that looks like HTML it will render it as such
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
