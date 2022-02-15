const express = require("express");

const app = express();

const port = 3000;
// req is request from browser to the web server , res is sending back to them the browser
// run the res.send call back function
app.get("/", (req, res) => res.send("Hello World!"));
// tell express where to listen for the res
app.listen(port, () =>
  console.log(`App is listening of port "http://localhost:${port}"`)
);
// when user types in local host 3000 in url this is the http req to the running web server on our machine
