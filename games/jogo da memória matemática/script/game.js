const grid = document.querySelector('.grid');
const timer = document.querySelector('.timer');
;const characters = [
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    '1-',
    '2-',
    '3-',
    '4-',
    '5-',
    '6-',
    '7-',
    '8-',
    '9-',
    '10-',
];

let firstCard = '';
let secondCard = '';
const revealCard = ({target}) => {

    if(target.parentNode.className.includes('reveal-card')){
        return;
    }
    if (firstCard === '') {
        target.parentNode.classList.add('reveal-card');
        firstCard = target.parentNode;
    } else if (secondCard === '') {
        target.parentNode.classList.add('reveal-card');
        secondCard = target.parentNode;
        checkCards()
    }

}
const createElement = (tag, className) =>{
    const element = document.createElement(tag);
    element.className = className;
    return element;
}
const checkEnndGame = () => {
    const disabledCards = document.querySelectorAll('.disabled-card');
    if(disabledCards.length === 20){
        clearInterval(this.loop)
        setTimeout(() =>{
            alert(`Parabéns, ${localStorage.getItem('player')}!!! Seu tempo foi ${timer.innerHTML}!!!`)
        },300)
    }
}
const checkCards = () => {
    const firstCharacter = firstCard.getAttribute('data-character').replace('-','');
    const secondCharacter = secondCard.getAttribute('data-character').replace('-','');

    if (firstCharacter === secondCharacter) {

        firstCard.firstChild.classList.add('disabled-card');
        secondCard.firstChild.classList.add('disabled-card');

        firstCard = '';
        secondCard = '';

        checkEnndGame()

    }else{
        setTimeout(() =>{

            firstCard.classList.remove('reveal-card');
            secondCard.classList.remove('reveal-card');

            firstCard = '';
            secondCard = '';

        }, 500)
        
    }
}
const createCard = (character) =>{

    const card = createElement('div', 'card');
    const front = createElement('div', 'face front');
    const back = createElement('div', 'face back');

    front.style.backgroundImage = `url('../images/image-1/${character}.png')`;

    card.appendChild(front);
    card.appendChild(back);

    card.addEventListener('click', revealCard);
    card.setAttribute('data-character', character)

    return card;
}


const loadGame = () => {

    const shuffledArray = characters.sort(() => Math.random() - 0.5);

    shuffledArray.forEach((character)=>{
        const card = createCard(character)
        grid.appendChild(card);
    });
    
    
}

const startTimer = ()=> {
    this.loop = setInterval(()=>{
        const currentTime = +timer.innerHTML;
        timer.innerHTML = currentTime + 1;
    }, 500)
}

window.onload = () =>{ //método onload executa uma função no momento que a janela terminar de carregar
    startTimer()
    loadGame(); 
}


// prevenção de bug

grid.style.transform = 'none';