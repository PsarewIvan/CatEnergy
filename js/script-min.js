"use strict";

var exampleAfterBtn = document.querySelector('.js-example__switch-btn--after');
var exampleBeforeBtn = document.querySelector('.js-example__switch-btn--before');
var exampleToggle = document.querySelector('.js-example__switch');
var imgAfter = document.querySelector('.js-example__picture--after');
var imgBefore = document.querySelector('.js-example__picture--before');
var imgHide = 'example__picture--hide';

if (matchMedia) {
  var mqExample = window.matchMedia('(max-width: 768px)');
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
"use strict";

if (matchMedia && document.querySelector('#ymap')) {
  ymaps.ready(function () {
    var mapWidth = window.matchMedia('(max-width: 768px)');
    var myMap = new ymaps.Map("ymap", {
      center: [59.938631, 30.3230554],
      zoom: 17
    });
    var placemarkMobile = new ymaps.Placemark([59.938631, 30.3230554], {
      balloonContentHeader: "Cat Energy",
      balloonContentBody: "ул. Большая <br>Конюшенная, д. 19/8 <br>Санкт-Петербург",
      hintContent: "Мы находимся здесь"
    }, {
      iconLayout: 'default#image',
      iconImageHref: 'img/picture/map-pin.png',
      iconImageSize: [45, 38],
      iconImageOffset: [-22, -38]
    });
    var placemarkTablet = new ymaps.Placemark([59.938631, 30.3230554], {
      balloonContentHeader: "Cat Energy",
      balloonContentBody: "ул. Большая <br>Конюшенная, д. 19/8 <br>Санкт-Петербург",
      hintContent: "Мы находимся здесь"
    }, {
      iconLayout: 'default#image',
      iconImageHref: 'img/picture/map-pin.png',
      iconImageSize: [90, 76],
      iconImageOffset: [-22, -38]
    });
    mapWidth.addListener(addPlacemark);
    addPlacemark(mapWidth);
    myMap.behaviors.disable(['drag', 'scrollZoom']);
  });
}

function addPlacemark(mq) {
  if (mq.matches) {
    myMap.geoObjects.remove(placemarkTablet);
    myMap.geoObjects.add(placemarkMobile);
  } else {
    myMap.geoObjects.remove(placemarkMobile);
    myMap.geoObjects.add(placemarkTablet);
  }
}
"use strict";

var mainNav = document.querySelector('.js--main-nav');
var mainNavButton = document.querySelector('.js--header__nav-btn');

if (matchMedia) {
  var mqNav = window.matchMedia('(min-width: 768px)');
  mqNav.addListener(WidthChangeNav);
  WidthChangeNav(mqNav);
}

mainNavButton.addEventListener('click', function (evt) {
  evt.preventDefault();

  if (mainNav.classList.contains('display-none')) {
    mainNav.classList.remove('display-none');
    mainNavButton.classList.add('header__nav-btn--close');
  } else {
    mainNav.classList.add('display-none');
    mainNavButton.classList.remove('header__nav-btn--close');
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