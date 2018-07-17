const dragula = require("dragula");
const imagesLoaded = require("imagesloaded");
const droppable = document.querySelector(".js-droppable");
const snippets = document.querySelector(".js-snippets");
const snippet = document.querySelectorAll(".js-snippet");
const filter = document.querySelector(".js-filter");
const downloadBtn = document.querySelector(".js-download");
const deleteBtns = document.querySelectorAll(".js-delete-btn");
const deleteBtnHtml = "<div class='bg-white hidden absolute pin-t pin-l js-delete-btn px-4 py-2 shadow'><i class='far fa-trash-alt pointer-events-none'></i></div>";

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

  masonry(".js-snippets", ".js-snippet", 0, 2, 2, 1);
});

function hideDeleteBtnOnLeave (el) {
  deleteBtn.style.display = "none";
}

function showDeleteBtnOnHover (el) {
  const rect = el.target.getBoundingClientRect();
  deleteBtn.style.top = rect.top;
  deleteBtn.style.left = rect.left;
  deleteBtn.style.display = "block";
}

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
    g.style.height = gHeight/dGridCol + gHeight/(gcLength+1) + 100 +"px";
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
  let selectedSnippets = document.querySelectorAll(".js-droppable > .js-snippet");
  for (var i = 0; i < selectedSnippets.length; i++) {
    selectedBlocks.push(selectedSnippets[i].id);
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

document.addEventListener("click", function(event){
  if (event.target.classList.contains("js-delete-btn")) {
    document.querySelector(".js-droppable").removeChild(event.target.parentElement);
  }
});


["resize", "load"].forEach(function(event) {
  window.addEventListener(event, function() {
    imagesLoaded( snippets, function() {
      // A maonsry grid with 0px gutter, with 2 columns on desktop, 2 on tablet, and 1 column on mobile devices.
      masonry(".js-snippets", ".js-snippet", 0, 2, 2, 1);
    });
  });
});

