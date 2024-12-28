// index.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/:date?", function (req, res) {
  // Extract the date parameter
  const requsetParam = req.params.date;

  try {
    // Check if there is a  request parameter
    if (!requsetParam) {
      // if no parameter, return the current date and time 
      const currentDateTime = new Date();

      res.json({ unix: Number(currentDateTime), utc: `${currentDateTime.toUTCString()}` });
    } // If there is a request parameter
      else if (requsetParam) {
      if (isNaN(requsetParam)) {
        const w = requsetParam

        const dateObject = new Date(w);
        console.log(dateObject)
        if (dateObject.toString() === "Invalid Date") {
          res.json({ error: "Invalid Date" });
        }
        //     console.log(dateObject);
        else {
          res.json({
            unix: Number(dateObject),
            utc: `${dateObject.toUTCString()}`,
          });
        }
      } else {
        const timestampNumber = Number(requsetParam);
        const qqw = new Date(timestampNumber);
        if (qqw.toString() === "Invalid Date") {
          res.json({ error: "Invalid Date" });
        } else {
          res.json({ unix: Number(qqw), utc: qqw.toUTCString() });
        }
        //     console.log(requsetParam)
      }
    }
  } catch (error) {
    console.log("I am her");
    console.log(error);

    res.json({ error: "Invalid Date" });
  }

  // res.json({ greeting: "hello API" });
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
