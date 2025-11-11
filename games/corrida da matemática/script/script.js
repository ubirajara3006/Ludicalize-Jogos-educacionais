const motorcycle = document.querySelector('.motorcycle');
const obstacle = document.querySelector('#obstacle');
const grass = document.querySelector('#grass');
const score = document.querySelector('#score span');
const options = document.querySelector('#options');
const option = document.querySelectorAll('.option');
const operation = document.querySelector('#operation');
const res = document.querySelector('#res');
const reload = document.querySelector('#reload');
const countdown = document.querySelector('#countdown');
let n1 = document.querySelector('#n1');
let n2 = document.querySelector('#n2');
let c = 0;

const random = (max, min) => Math.floor(Math.random() * (max - min) + min);

function createQuestion() {

  if (c >= 4000 && c < 6000) {
    let x = random(9, 15);
    let y = random(2, 8);
    n1.innerHTML = x;
    n2.innerHTML = y;
    let p = x * y;
    createOption(p);
  } else if (c >= 6000 && c < 10000) {
    let x = random(20, 25);
    let y = random(2, 5);
    n1.innerHTML = x;
    n2.innerHTML = y;
    let p = x * y;
    createOption(p);
  } else if (c > 10000) {
    res.style.display = 'flex';
    res.innerHTML = `CONGRATULATION!</br> ZEROU O JOGO!</br> SCORE:${c}.`;
    clearInterval(loop);
  } else {
    let x = random(2, 10);
    let y = random(2, 10);
    n1.innerHTML = x;
    n2.innerHTML = y;
    let p = x * y;
    createOption(p);
  }
}

function createOption(p) {
  let num = random(0, 4);
  option[num].innerHTML = p;

  if (num == 0) {
    option[1].innerHTML = p + 10;
    option[2].innerHTML = p + 2;
    option[3].innerHTML = p + 3;
  } else if (num == 1) {
    option[0].innerHTML = p + 2;
    option[2].innerHTML = p + 10;
    option[3].innerHTML = p + 3;
  } else if (num == 2) {
    option[0].innerHTML = p + 10;
    option[1].innerHTML = p + 2;
    option[3].innerHTML = p + 3;
  } else {
    option[0].innerHTML = p + 1;
    option[1].innerHTML = p + 20;
    option[2].innerHTML = p + 3;
  }
}

const checkAnswer = ({ target }) => {
  if (target.innerHTML == options.innerHTML || target.innerHTML == '') {
    return;
  } else if (target.innerHTML == n1.innerHTML * n2.innerHTML) {
    motorcycle.classList.add('motorcycle-jump');
    operation.style = 'animation: flip 0.2s linear;';
    createQuestion();
    setTimeout(() => {
      motorcycle.classList.remove('motorcycle-jump');
      operation.style = 'animation: none;';
    }, 1000);
  } else {
    motorcycle.src = './images/boom.gif';
    setTimeout(() => {
      res.style.display = 'flex';
      res.innerHTML = `RESPOSTA ERRADA! SCORE: ${score.innerHTML}.`;
    }, 1000);
  }
  console.log(target.innerHTML);
};

const loop = setInterval(() => {
  c++;
  score.innerHTML = c;
  const obstaclePosition = +window.getComputedStyle(obstacle).left.replace('px', '');
  const carPosition = +window.getComputedStyle(motorcycle).bottom.replace('px', '');

  if (obstaclePosition <= 80 && obstaclePosition > 0 && carPosition < 20 && n1.innerHTML != '') {
    obstacle.style.animation = 'none';
    obstacle.style.left = `${obstaclePosition}px`;
    obstacle.src = './images/car-beat.png';
    motorcycle.style.animation = 'none';
    motorcycle.style.bottom = `${carPosition}px`;
    motorcycle.src = './images/motorcycle-beat.png';
    grass.style.animation = 'none';
    setTimeout(() => {
      res.style.display = 'flex';
      res.innerHTML = `FIM DE JOGO!</br> SCORE: ${score.innerHTML}
      </br> &copy; 2022 UBIRAJARA JUNIOR.`;
    }, 1000);
    clearInterval(loop);
  }
}, 10);

options.addEventListener('click', checkAnswer);

reload.addEventListener('click', () => {
  location.reload();
});

const start = setInterval(() => {
  if (res.innerHTML != 1 && res.innerHTML != 2 && res.innerHTML != 3) {
    res.innerHTML = 1;
  } else if (res.innerHTML == 1) {
    res.innerHTML = 2;
  } else if (res.innerHTML == 2) {
    res.innerHTML = 3;
  } else {
    res.style.display = 'none';
    clearInterval(start);
    createQuestion();
  }
}, 1000);

// =========================
// NOVA PARTE: SETAS DO TECLADO
// =========================
document.addEventListener('keydown', (event) => {
  if (res.style.display === 'flex') return; // não reage se o jogo acabou

  switch (event.key) {
    case 'ArrowUp':
      option[2].click();
      break;
    case 'ArrowDown':
      option[3].click();
      break;
    case 'ArrowLeft':
      option[0].click();
      break;
    case 'ArrowRight':
      option[1].click();
      break;
  }
});
