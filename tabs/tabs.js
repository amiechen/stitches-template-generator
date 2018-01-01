var get = function (selector, scope) {
  scope = scope ? scope : document;
  return scope.querySelector(selector);
};

var getAll = function (selector, scope) {
  scope = scope ? scope : document;
  return scope.querySelectorAll(selector);
};

window.addEventListener("load", function() {
  // get all tab_containers in the document
  var tabContainers = getAll(".tab_container");

  // bind click event to each tab container
  for (var i = 0; i < tabContainers.length; i++) {
    tabContainers[i].addEventListener("click", tabClick);
  }

  // each click event is scoped to the tab_container
  function tabClick (event) {
    var scope = event.currentTarget;
    var clickedTab = event.target;
    var tabs = getAll('.tab', scope);
    var panes = getAll('.tab-pane', scope);
    var activePane = get(clickedTab.getAttribute('data-tab'), scope);

    // remove all active tab classes
    for (var i = 0; i < tabs.length; i++) {
      tabs[i].classList.remove('active');
    }

    // remove all active pane classes
    for (var i = 0; i < panes.length; i++) {
      panes[i].classList.remove('active');
    }

    // apply active classes on desired tab and pane
    clickedTab.classList.add('active');
    activePane.classList.add('active');
  }
});