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

function createHTML(html) {
  var doc_impl = document.implementation,
    dt = doc_impl.createDocumentType("html", " ", " "),
    doc = doc_impl.createHTMLDocument("stitcher", "html", dt),
    charset_meta = doc
      .querySelector("head")
      .appendChild(doc.createElement("meta")),
    stylesheet = doc
      .querySelector("head")
      .appendChild(doc.createElement("link")),
    serializer = new XMLSerializer();

  charset_meta.setAttribute("charset", html.ownerDocument.characterSet);
  stylesheet.setAttribute("rel", "stylesheet");
  stylesheet.setAttribute("type", "text/css");
  stylesheet.setAttribute(
    "href",
    "https://cdn.rawgit.com/amiechen/web-component-library/master/stitches.css"
  );
  for (var i = 0; i < html.childNodes.length; i++) {
    doc.body.appendChild(doc.importNode(html.childNodes.item(i), true));
  }
  return doc.documentElement.outerHTML;
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
  download("stitcher.html", createHTML(droppable));
});
