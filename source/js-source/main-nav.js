const mainNav = document.querySelector('.js--main-nav');
const mainNavButton = document.querySelector('.js--header__nav-btn');

if (matchMedia) {
  let mq = window.matchMedia( "(min-width: 768px)" );
  mq.addListener(WidthChange);
  WidthChange(mq);
}

mainNavButton.addEventListener('click', function(evt) {
  evt.preventDefault();
  if (mainNav.classList.contains('display-none')) {
    mainNav.classList.remove('display-none');
    mainNavButton.classList.add('header__nav-btn--close')
  } else {
    mainNav.classList.add('display-none');
    mainNavButton.classList.remove('header__nav-btn--close')
  }
});

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
