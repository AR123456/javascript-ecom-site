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
// get the data posted by the form off the request body
// Header is sent first
// server sees req
// server runs callback - but dosent have all info yet so tell it to wait
// then browser starts to transmit info from body in bits
app.post("/", (req, res) => {
  // the .on is almost identical to addEventListener, the event we are working with is data
  req.on("data", (data) => {
    // console.log(data);
    // console.log(data.toString("utf8"));
    // parse and create object - there are libraries for this which is better way to go in real life
    const parsed = data.toString("utf8").split("&");
    const formData = {};
    for (let pair of parsed) {
      // es6 desturcture here
      const [key, value] = pair.split("=");
      formData[key] = value;
    }
    //now it looks like an object 
    console.log(formData);
  });
  res.send("account created");
});
app.listen(port, () =>
  console.log(`App is listening of port "http://localhost:${port}"`)
);
