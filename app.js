const startBtn = document.querySelector('#start');
const screens = document.querySelectorAll('.screen');
const timeList = document.querySelector('#time-list');
const timeEl = document.querySelector('#time');
const bord = document.querySelector('#board');
const colors = [
    'linear-gradient(90deg, #cea1e3 0%, #c569f0 47%, #b120f5 100%)',
    'linear-gradient(90deg, #16D9E3 0%, #30C7EC 47%, #46AEF7 100%)',
    'linear-gradient(90deg, #d7f0ad 0%, #c2f569 47%, #a2f01d 100%)',
    'linear-gradient(90deg, #f5bbab 0%, #f28263 47%, #f2400f 100%)',
    'linear-gradient(90deg, #aeabf5 0%, #5c57f7 47%, #1e16f7 100%)'
];
let time = 0;
let score = 0;


startBtn.addEventListener('click', (event) => {
  event.preventDefault();
  screens[0].classList.add('up');
});

timeList.addEventListener('click', event => {
  if (event.target.classList.contains('time-btn')) {
    time = parseInt(event.target.getAttribute('data-time'));
    if (time === 0) {
      time = getRandomNumber(5, 30);
    }
    screens[1].classList.add('up');
    startGame();
  }
});

bord.addEventListener('click', event => {
  if (event.target.classList.contains('circle')) {
    score++;
    event.target.remove();
    createRandomCircle();
  }
});

function startGame () {
  setInterval(decreaseTime, 1000);
  createRandomCircle();
  setTime(time);
}

function decreaseTime () {
  if (time === 0) {
    finishGame();
  } else {
  let current = --time;
  if (current < 10) {
    current = `0${current}`;
  }
  setTime(current);
  }
}

function setTime (value) {
  timeEl.innerHTML = `00:${value}`;
}

function finishGame () {
  timeEl.parentNode.classList.add('hide');
  bord.innerHTML = `<h1>Счёт: <span class="primary">${score}</span></h1>`;
}

function createRandomCircle() {
  const circle = document.createElement('div');
  const size = getRandomNumber(10, 60);
  const { width, height } = bord.getBoundingClientRect();
  
  const x = getRandomNumber(0, width - size);
  const y = getRandomNumber(0, height - size);
  
  circle.classList.add('circle');
  circle.style.width = `${size}px`;
  circle.style.height = `${size}px`;
  circle.style.top = `${y}px`;
  circle.style.left = `${x}px`;
  circle.style.background = `${colors[getRandomNumber(0, colors.length - 1)]}`;
  
  bord.append(circle);
}

function getRandomNumber (min, max) {
  return Math.round(Math.random() * (max - min) + min);
}
