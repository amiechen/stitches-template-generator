var topNav = document.querySelector('.top-nav');
var icon = document.querySelector('.icon');

window.addEventListener('load', function(){
  function showNav() {
    if (topNav.className === 'top-nav') {
      topNav.className += ' responsive';
    } else {
      topNav.className = 'top-nav';
    }
  }
  icon.addEventListener('click', showNav);
});