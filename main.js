const dragula = require("dragula");
const imagesLoaded = require("imagesloaded");
const fileDownload = require("js-file-download");
const droppable = document.querySelector(".js-droppable");
const snippets = document.querySelector(".js-snippets");
const snippet = document.querySelectorAll(".js-snippet");
const filter = document.querySelector(".js-filter");
const downloadBtn = document.querySelector(".js-download");
const deleteBtnHtml =
  "<div class='bg-white hidden absolute top-0 left-0 js-delete-btn px-4 py-2 shadow'><i class='far fa-trash-alt pointer-events-none'></i></div>";
const stitchesCSSPath = "https://stitches.hyperyolo.com/output.css";
const fontAwesomePath =
  "https://use.fontawesome.com/releases/v5.6.3/css/all.css";
const fontAwesomeIntegrity =
  "sha384-UHRtZLI+pbxtHCWp1t77Bi1L4ZtiqrqD80Kn4Z8NTSRyMA2Fd33n5dQ8lWUE00s/";
const stitchesHTML = html => `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link href=${stitchesCSSPath} rel="stylesheet">
    <link rel="stylesheet" href=${fontAwesomePath} integrity=${fontAwesomeIntegrity} crossorigin="anonymous">
    <title>Stitches</title>
  </head>
  <body>${html}</body>
</html>`;

dragula([snippets, droppable], {
  copy: function(el, source) {
    return source === snippets;
  },
  accepts: function(el, target) {
    return target !== snippets;
  }
}).on("drop", (el, target) => {
  el.innerHTML += deleteBtnHtml;
  el.classList.add("relative");
});

filter.addEventListener("click", event => {
  if (event.target.tagName !== "BUTTON") {
    return;
  }
  const val = event.target.getAttribute("data-filter");

  for (var i = 0; i < snippet.length; i++) {
    if (snippet[i].classList.contains(val)) {
      snippet[i].style.display = "block";
    } else {
      snippet[i].style.display = "none";
    }
  }

  masonry(".js-snippets", ".js-snippet", 0, 2, 2, 1);
});

function masonry(grid, gridCell, gridGutter, dGridCol, tGridCol, mGridCol) {
  var g = document.querySelector(grid),
    gc = document.querySelectorAll(gridCell),
    gcLength = gc.length,
    gHeight = 0,
    i;

  for (i = 0; i < gcLength; ++i) {
    gHeight += gc[i].offsetHeight + parseInt(gridGutter);
  }

  if (window.screen.width >= 1024)
    g.style.height = gHeight / dGridCol + gHeight / (gcLength + 1) + 100 + "px";
  else if (window.screen.width < 1024 && window.screen.width >= 768)
    g.style.height = gHeight / tGridCol + gHeight / (gcLength + 1) + "px";
  else g.style.height = gHeight / mGridCol + gHeight / (gcLength + 1) + "px";
}

downloadBtn.addEventListener("click", event => {
  let selectedBlocks = [];
  let selectedSnippets = document.querySelectorAll(
    ".js-droppable > .js-snippet"
  );
  for (var i = 0; i < selectedSnippets.length; i++) {
    selectedBlocks.push(selectedSnippets[i].id);
  }

  let html = "";

  Promise.all(
    selectedBlocks.map(template =>
      fetch(`../templates/${template}.html`).then(
        response => response.text()
      )
    )
  ).then(templateString => {
    html += templateString.join("");
    fileDownload(stitchesHTML(html), "stitches.html");
  });
});

document.addEventListener("click", function(event) {
  if (event.target.classList.contains("js-delete-btn")) {
    document
      .querySelector(".js-droppable")
      .removeChild(event.target.parentElement);
  }
});

["resize", "load"].forEach(function(event) {
  window.addEventListener(event, function() {
    imagesLoaded(snippets, function() {
      // A masonry grid with 0px gutter, with 2 columns on desktop, 2 on tablet, and 1 column on mobile devices.
      masonry(".js-snippets", ".js-snippet", 0, 2, 2, 1);
    });
  });
});
