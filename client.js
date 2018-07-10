const dragula = require("dragula");
// const imagesLoaded = require("imagesloaded");
const droppable = document.querySelector(".droppable");
const snippets = document.querySelector(".js-snippets");
const snippet = document.querySelectorAll(".js-snippet");
const filter = document.querySelector(".js-filter");
const downloadBtn = document.querySelector(".downloadBtn");

dragula([snippets, droppable], {
  copy: function(el, source) {
    return source === snippets;
  },
  accepts: function(el, target) {
    return target !== snippets;
  }
});

filter.addEventListener("click", event => {
  // only work with buttons
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
});

function masonry(grid, gridCell, gridGutter, dGridCol, tGridCol, mGridCol) {
  var g = document.querySelector(grid),
      gc = document.querySelectorAll(gridCell),
      gcLength = gc.length,
      gHeight = 0,
      i;
  
  for(i=0; i<gcLength; ++i) {
    gHeight+=gc[i].offsetHeight+parseInt(gridGutter);
  }
  
  if(window.screen.width >= 1024)
    g.style.height = gHeight/dGridCol + gHeight/(gcLength+1) + "px";
  else if(window.screen.width < 1024 && window.screen.width >= 768)
    g.style.height = gHeight/tGridCol + gHeight/(gcLength+1) + "px";
  else
    g.style.height = gHeight/mGridCol + gHeight/(gcLength+1) + "px";
}

function download(filename, text) {
  var element = document.createElement("a");
  element.setAttribute(
    "href",
    "data:text/html;charset=utf-8," + encodeURIComponent(text)
  );
  element.setAttribute("download", filename);
  element.style.display = "none";
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}

downloadBtn.addEventListener("click", event => {
  let selectedBlocks = [];
  for (var i = 0; i < snippet.length; i++) {
    selectedBlocks.push(snippet[i].id);
  }
  fetch("/download", {
    method: "POST",
    body: JSON.stringify({ data: selectedBlocks }),
    headers: { "Content-Type": "application/json" }
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error("Something went wrong with your fetch");
      }
    })
    .then(json => {
      download("stitches.html", json.data);
    });
});


// imagesLoaded( snippets, function( instance ) {
//   console.log('all images are loaded');
//   ["resize", "load"].forEach(function(event) {
//     window.addEventListener(event, function() {
//       imagesLoaded( document.querySelector('.masonry'), function() {
//         // A maonsry grid with 8px gutter, with 3 columns on desktop, 2 on tablet, and 1 column on mobile devices.
//         masonry(".js-snippets", ".js-snippet", 0, 2, 2, 1);
//       });
//     });
//   });
// });