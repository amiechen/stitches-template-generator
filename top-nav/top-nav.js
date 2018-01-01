var topNav = document.querySelector('.top-nav');
var icon = document.querySelector('.icon');

window.addEventListener('load', function(){
  function showNav() {
    if (topNav.className === 'top-nav') {
      topNav.className += ' responsive';
      icon.className += ' open';
    } else {
      topNav.className = 'top-nav';
      icon.classList.remove('open');
    }
  }
  icon.addEventListener('click', showNav);
});