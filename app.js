const express = require("express");
const morgan = require("morgan");
const app = express();
const path = require("path");
const fs = require("fs");
const bodyParser = require("body-parser");
const http = require("http");
const stitchesCSSPath =
  "https://cdn.rawgit.com/amiechen/stitches-template-generator/master/public/stitches.css";
const fontMuliPath = "https://fonts.googleapis.com/css?family=Muli:300,400,600,700,800,900";
const fontAwesomePath = "https://use.fontawesome.com/releases/v5.0.13/css/all.css";
const fontAwesomeIntegrity = "sha384-DNOHZ68U8hZfKXOrtjWvjxusGo9WQnrNx2sqG0tfsghAvtVlRW3tvkXWZh58N9jp";

let stitchesHTML = html => `<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" type="text/css" href=${stitchesCSSPath}>
    <link href=${fontMuliPath} rel="stylesheet">
    <link rel="stylesheet" href=${fontAwesomePath} integrity=${fontAwesomeIntegrity} crossorigin="anonymous">
    <title>Stitches</title>
  </head>
  <body>${html}</body>
</html>`;

app.use(morgan('combined'));
app.use(express.static("."));
app.use(bodyParser.json());

app.get("/healthcheck", (req, res) => {
  res.sendStatus(200);
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/../index.html"));
});

app.post("/download", (req, res) => {
  let templates = req.body.data; // e.g. [ 'nav-1', 'hero-1' ]
  let file = path.join(__dirname + "/../stitches.html");
  let html = "";

  templates.forEach(template => {
    html += fs.readFileSync(
      path.join(__dirname + `/../templates/${template}.html`),
      "utf-8"
    );
  });

  fs.writeFile(file, stitchesHTML(html), "utf8", err => {
    if (err) throw err;
    res.download(file);
    res.json({ data: stitchesHTML(html) });
  });
});

app.listen(3000, () => console.log("Example app listening on port 3000!"));
