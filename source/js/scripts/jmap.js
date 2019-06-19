if (document.querySelector('#ymap')) {
  window.onload = function() {
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

      let placemarkBig = new ymaps.Placemark([59.938631, 30.3230554], {
        balloonContentHeader: "Cat Energy",
        balloonContentBody: "ул. Большая <br>Конюшенная, д. 19/8 <br>Санкт-Петербург",
        hintContent: "Мы находимся здесь"
      }, {
        iconLayout: 'default#image',
        iconImageHref: 'img/picture/map-pin.png',
        iconImageSize: [124, 106],
        iconImageOffset: [-30, -51]
      });
      
      myMap.geoObjects.add(placemark);
      myMap.behaviors.disable(['scrollZoom']);
  
      if (matchMedia) {
        let desktopWidth = window.matchMedia( '(min-width: 1300px)' );
        let tabletWidth = window.matchMedia( '(min-width: 768px)' );

        desktopWidth.addListener(setMapCenter);
        tabletWidth.addListener(setBigPin);

        setMapCenter(desktopWidth);
        setBigPin(tabletWidth);
  
        function setMapCenter(mq) {
          if (mq.matches) {
            myMap.setCenter([59.938725,30.319447]);
          } else {
            myMap.setCenter([59.938631, 30.3230554]);
          }
        }

        function setBigPin(mq) {
          if (mq.matches) {
            myMap.geoObjects.remove(placemark);
            myMap.geoObjects.add(placemarkBig);
          } else {
            myMap.geoObjects.remove(placemarkBig);
            myMap.geoObjects.add(placemark);
          }
        }
      }
    });
  };
}
