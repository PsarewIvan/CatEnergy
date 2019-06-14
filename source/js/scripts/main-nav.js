const mainNav = document.querySelector('.js--main-nav');
const mainNavButton = document.querySelector('.js--header__nav-btn');
const burgerIcon = document.querySelector('js--header-burger');

if (matchMedia) {
  let mqNav = window.matchMedia( '(min-width: 768px)' );
  mqNav.addListener(WidthChangeNav);
  WidthChangeNav(mqNav);
}

mainNavButton.addEventListener('click', function(evt) {
  evt.preventDefault();
    mainNav.classList.toggle('display-none');
    mainNavButton.classList.toggle('header__nav-btn--close');
});

function WidthChangeNav(mq) {
  if (!mq.matches) {
    mainNav.classList.add('display-none');
    mainNavButton.classList.remove('display-none');
    mainNavButton.classList.remove('header__nav-btn--close');
  } else {
    mainNav.classList.remove('display-none');
    mainNavButton.classList.add('display-none');
  }
}
