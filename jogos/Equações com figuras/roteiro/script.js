const h1 = document.getElementById('h1');
const p = document.getElementById('p');
const boxStart = document.getElementById('start');
const boxGame1 = document.getElementById('box-game');
const op1 = document.querySelectorAll('#expression-1 span');
const op2 = document.querySelector('#expression-2 span');
const op3 = document.querySelector('#expression-3 span');
const timerGame = document.querySelector('#timer');
const score = document.querySelector('#score');
const res1 = document.getElementById('res-1');
const res2 = document.getElementById('res-2');
const res3 = document.getElementById('res-3');
let num1 = '';
let num2 = '';
let num3 = '';
let c = 0;
let s = 0;

const random = (max, min) => Math.floor(Math.random() * (max - min) + min);

function CreatQuestions(){
    if(s == 0){
        num1 = random(5, 10);
        num2 = random(12, 20);
        num3 = random(2, 6);
        res1.innerHTML = num1 * 3;
        res2.innerHTML = num2 - num1;
        res3.innerHTML = num3 * num2;
    }else if(s == 1){
        op1[0].innerHTML = op1[0].innerHTML.replace('+','x');
        op1[1].innerHTML = op1[1].innerHTML.replace('+','x');
        num1 = random(2, 6);
        num2 =  num1 + random(10, 15);
        num3 = random(2, 5);
        res1.innerHTML = num1 * num1 * num1;
        res2.innerHTML = num2 - num1;
        res3.innerHTML = num3 * num2;
    }else{
        op2.innerHTML = op2.innerHTML.replace('-',':');
        num1 = random(2, 6);
        num2 =  num1 * random(3, 10);
        num3 = random(10, 15);
        res1.innerHTML = num1 * num1 * num1;
        res2.innerHTML = num2 / num1;
        res3.innerHTML = num3 * num2;
    }
}

boxGame1.addEventListener('submit', (e) =>{
    e.preventDefault();
    const inputRes = +document.getElementById('res-question').value;
    console.log(inputRes)

    if(inputRes == ''){
        alert('Digite um valor antes de confirmar resposta!')
    }
    else if(num1 + num2 + num3 == inputRes){
        alert('RESPOSTA CORRETA! +1 PONTO');
        s++;
        score.innerHTML = s;
        CreatQuestions();
    }else {
        alert('ERRoooOOOoou!')
    }
    boxGame1.reset()
})

function start() {
    boxStart.style.display = 'none';
    boxGame1.style.display = 'flex';
    CreatQuestions();
}

const timer = setInterval(() =>{
    if(boxGame1.style.display == 'flex')
    c++
    timerGame.innerHTML = c;
}, 1000);

function h1Writer (titulo){
    let c = 0
    const textoArray= titulo.innerHTML.split('');
    titulo.innerHTML = ''
    const loop = setInterval(()=>{
    if(c < textoArray.length){
        titulo.innerHTML += textoArray[c];
        c++
    }else{
        clearInterval(loop)
    }
    }, 50)
}
h1Writer(h1)

setTimeout(()=>{
    p.style.display = 'block';
    h1Writer(p);
}, 1400)

const value = setInterval(()=>{
    if(s == 3){
        clearInterval(timer);
        boxGame1.innerHTML = '<p>PARABÉNS, VOCÊ ACERTOU TODAS! FIM DE JOGO!';
        const endGame = document.querySelector('.box-game p');
        h1Writer(endGame)
        score.innerHTML = s;
        clearInterval(value);
    }
    const input1 = document.querySelectorAll('#input-1');
    const input2 = document.querySelectorAll('#input-2');
    const input3 = document.querySelectorAll('#input-3');
    input1[1].value = input1[0].value;
    input1[2].value = input1[1].value;
    input1[3].value = input1[2].value;
    input1[4].value = input1[3].value;

    input2[1].value = input2[0].value;
    input2[2].value = input2[1].value;

    input3[1].value = input3[0].value;
}, 1)
