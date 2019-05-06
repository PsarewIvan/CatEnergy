var mainNav = document.querySelector('.js--main-nav');
var mainNavButton = document.querySelector('.js--header__nav-btn');

if (matchMedia) {
  var mq = window.matchMedia( "(min-width: 748px)" );
  mq.addListener(WidthChange);
  WidthChange(mq);
}

function WidthChange(mq) {
  if (!mq.matches) {
    mainNav.classList.add('display-none');
    mainNavButton.classList.remove('display-none');
    mainNavButton.classList.remove('header__nav-btn--close');
  } else {
    mainNav.classList.remove('display-none');
    mainNavButton.classList.add('display-none');
  }
}
