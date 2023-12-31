function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}

const buttonOn = document.querySelector('[data-start]');
const buttonOff = document.querySelector('[data-stop]');
const body = document.querySelector('body');
let timerId = 0;

buttonOn.addEventListener('click', onStart);
buttonOff.addEventListener('click', onStop);

buttonOff.toggleAttribute('disabled');

function onStart() {
  timerId = setInterval(getBgColor, 1000);

  buttonOn.toggleAttribute('disabled');
  buttonOff.removeAttribute('disabled');
}

function onStop() {
  clearInterval(timerId);

  buttonOn.removeAttribute('disabled');
  buttonOff.toggleAttribute('disabled');
}

function getBgColor() {
  body.style.backgroundColor = getRandomHexColor();
}