const exampleAfterBtn = document.querySelector('.js-example__switch-btn--after');
const exampleBeforeBtn = document.querySelector('.js-example__switch-btn--before');
const exampleToggle = document.querySelector('.js-example__switch');
const imgAfter = document.querySelector('.js-example__picture--after');
const imgBefore = document.querySelector('.js-example__picture--before');const imgHide = 'example__picture--hide';

if (matchMedia) {
  let mqExample = window.matchMedia( '(max-width: 768px)' );
  mqExample.addListener(WidthChangeExample);
  WidthChangeExample(mqExample);
}

function WidthChangeExample(mq) {
  if (mq.matches) {
    exampleAfterBtn.addEventListener('click', showImgAfter);
    exampleBeforeBtn.addEventListener('click', showImgBefore);
    exampleToggle.addEventListener('click', toggleImg);
  } else {
    exampleAfterBtn.removeEventListener('click', showImgAfter);
    exampleBeforeBtn.removeEventListener('click', showImgBefore);
    exampleToggle.removeEventListener('click', toggleImg);
  }
}

function showImgAfter(evt) {
  evt.preventDefault();
  imgAfter.classList.remove(imgHide);
  imgBefore.classList.add(imgHide);
  exampleToggle.classList.add('example__switch--after');
}

function showImgBefore(evt) {
  evt.preventDefault();
  imgBefore.classList.remove(imgHide);
  imgAfter.classList.add(imgHide);
  exampleToggle.classList.remove('example__switch--after');
}

function toggleImg(evt) {
  evt.preventDefault();
  imgBefore.classList.toggle(imgHide);
  imgAfter.classList.toggle(imgHide);
  exampleToggle.classList.toggle('example__switch--after');
}

if (document.querySelector('#ymap')) {
  ymaps.ready(function () {
    let myMap = new ymaps.Map("ymap", {
      center: [59.938631, 30.3230554],
      zoom: 17
    });

    let placemark = new ymaps.Placemark([59.938631, 30.3230554], {
      balloonContentHeader: "Cat Energy",
      balloonContentBody: "ул. Большая <br>Конюшенная, д. 19/8 <br>Санкт-Петербург",
      hintContent: "Мы находимся здесь"
    }, {
      iconLayout: 'default#image',
      iconImageHref: 'img/picture/map-pin.png',
      iconImageSize: [60, 51],
      iconImageOffset: [-30, -51]
    });
    
    myMap.geoObjects.add(placemark);

    myMap.behaviors.disable(['scrollZoom']);
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
      myMap.behaviors.disable('drag');
    }
  });
}

const mainNav = document.querySelector('.js--main-nav');
const mainNavButton = document.querySelector('.js--header__nav-btn');

if (matchMedia) {
  let mqNav = window.matchMedia( '(min-width: 768px)' );
  mqNav.addListener(WidthChangeNav);
  WidthChangeNav(mqNav);
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
