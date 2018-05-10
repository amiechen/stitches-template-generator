const dragula = require("dragula");
const FileSaver = require("file-saver");
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
    dt = doc_impl.createDocumentType("html", null, null),
    doc = doc_impl.createDocument("http://www.w3.org/1999/xhtml", "html", dt),
    doc_el = doc.documentElement,
    head = doc_el.appendChild(doc.createElement("head")),
    charset_meta = head.appendChild(doc.createElement("meta")),
    title = head.appendChild(doc.createElement("title")),
    body = doc_el.appendChild(doc.createElement("body"));
  charset_meta.setAttribute("charset", html.ownerDocument.characterSet);
  for (var i = 0; i < html.childNodes.length; i++) {
    body.appendChild(doc.importNode(html.childNodes.item(i), true));
  }
  title.appendChild(doc.createTextNode("stitcher"));
  console.log(doc);
  return doc;
}

downloadBtn.addEventListener("click", event => {
  createHTML(droppable.innerHTML);
  // var blob = new Blob([droppable.innerHTML], {
  //   type: "text/html;charset=utf-8"
  // });
  // console.log(blob);
  // FileSaver.saveAs(blob, "stitcher.html");
});
