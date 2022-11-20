function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const changeColorBtn = document.querySelector('[data-start]');
const stopChangeColorBtn = document.querySelector('[data-stop]');
const bodyEl = document.querySelector('body');
let timerId = null;
stopChangeColorBtn.disabled = true;

changeColorBtn.addEventListener('click', () => {
  bodyEl.style.background = getRandomHexColor();
  timerId = setInterval(
    () => (bodyEl.style.background = getRandomHexColor()),
    1000
  );
  changeColorBtn.disabled = true;
  stopChangeColorBtn.disabled = false;
});

stopChangeColorBtn.addEventListener('click', () => {
  clearInterval(timerId);
  stopChangeColorBtn.disabled = true;
  changeColorBtn.disabled = false;
});
