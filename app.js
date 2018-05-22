const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");
const bodyParser = require("body-parser");

app.use(express.static("."));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/index.html"));
});

app.post("/download", (req, res) => {
  let templates = req.body.data; // e.g. [ 'nav-1', 'hero-1' ]
  let file = path.join(__dirname + "/stitches.html");
  let html = "";

  templates.forEach(template => {
    html += fs.readFileSync(
      path.join(__dirname + `/templates/${template}.html`),
      "utf-8"
    );
  });

  fs.writeFile(file, html);
  res.download(file, "stitches.html", function(err) {
    if (err) {
      console.log(err);
    } else {
      console.log("you downloaded a file!");
    }
  });
});

app.listen(3000, () => console.log("Example app listening on port 3000!"));
