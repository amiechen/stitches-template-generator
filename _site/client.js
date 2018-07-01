const dragula = require("dragula");
const droppable = document.querySelector(".droppable");
const snippets = document.querySelector(".snippets");
const snippet = document.querySelectorAll(".snippet");
const filter = document.querySelector(".filter");
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
  let snippetsInDroppable = droppable.querySelectorAll(".snippet");
  for (var i = 0; i < snippetsInDroppable.length; i++) {
    selectedBlocks.push(snippetsInDroppable[i].id);
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
