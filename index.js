const express = require("express");

const app = express();

const port = 3000;

app.get("/", (req, res) => res.send("Hello World!"));

app.listen(port, () =>
  //  in this HTTP request there are 4 things the
  //  host - local host - this could be anything like google or amazon
  //  port - 3000  - mosts of the time in real world the default is used
  //  the path - /  - where on the sever to go, default is slash
  //  were are doing app.get so the Method is "GET", when we hit enter key this happens. this is the intent of the req

  // the GET request is registering the request with the router object, the router then passes off to the callback function

  console.log(`App is listening of port "http://localhost:${port}"`)
);
