const exampleAfterBtn = document.querySelector('.js-example__switch-btn--after');
const exampleBeforeBtn = document.querySelector('.js-example__switch-btn--before');
const exampleToggle = document.querySelector('.js-example__switch');
const imgAfter = document.querySelector('.js-example__picture--after');
const imgBefore = document.querySelector('.js-example__picture--before');
const imgHide = 'example__picture--hide';

exampleAfterBtn.addEventListener('click', function(evt) {
  evt.preventDefault();
  imgAfter.classList.remove(imgHide);
  imgBefore.classList.add(imgHide);
  exampleToggle.classList.add('example__switch--after');
});

exampleBeforeBtn.addEventListener('click', function(evt) {
  evt.preventDefault();
  imgBefore.classList.remove(imgHide);
  imgAfter.classList.add(imgHide);
  exampleToggle.classList.remove('example__switch--after');
});

exampleToggle.addEventListener('click', function(evt) {
  evt.preventDefault();
  imgBefore.classList.toggle(imgHide);
  imgAfter.classList.toggle(imgHide);
  exampleToggle.classList.toggle('example__switch--after');
})