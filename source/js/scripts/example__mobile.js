if (document.querySelector('.js-example__switch')) {
  const exampleAfterBtn = document.querySelector('.js-example__switch-btn--after');
  const exampleBeforeBtn = document.querySelector('.js-example__switch-btn--before');
  const exampleToggle = document.querySelector('.js-example__switch');
  const imgAfter = document.querySelector('.js-example__picture--after');
  const imgBefore = document.querySelector('.js-example__picture--before');
  const imgHide = 'example__picture-hide';

  if (matchMedia) {
    // let mqExample = window.matchMedia( '(max-width: 768px)' );
    // временно, пока нереализую слайдер
    let mqExample = window.matchMedia( '(max-width: 5000px)' );
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
}
