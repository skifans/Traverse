const express = require("express");
const app = express();
const path = require("path");
const port = 3001;

//Server set up
app.use(express.static(path.join(__dirname, "public")));
app.set("views", __dirname + "/views");
app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");
// Default home page
app.use('/', express.static(path.join(__dirname, '/../', 'traverse-react','build')))
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, '/../', 'traverse-react','build', 'index.html'));
});

// Post route from home page
app.post("/", (req, res) => {
  res.send("Received POST request");
});

// Website listener, should be changed when website will be deployed
app.listen(port, () =>
  console.log("Traverse app listening on port " + port + "!")
);
