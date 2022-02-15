const express = require("express");

const app = express();

const port = 3000;

app.get("/", (req, res) => {
  // by default when clcking the button inside the form or hitting the enter key on an input box the browser will make an automatic submission
  // browser will then attempt to collect all the info in the input elements that have the "name" property assigned to them.
  // after getting this the browser then adds that info to the url in a query string
  // we can decode the query string to make a post request
  // adding form method of POST which will be the method used when form gets submitted
  // this overides the default behavior on the form of "GET"
  // POST creates a record
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
// express server needs a route to handle the POST from the form
// look for an incomming request on / with a method of post, if you find that do what is in res.send
// post info is not added to the query string in the URL , it is added to the request body
// appended to request body property.  (request has a property called body )
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
