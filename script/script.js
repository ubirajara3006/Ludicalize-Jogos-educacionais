const menu = document.getElementById('options-menu')
const iconMenu = document.getElementById('icon-menu')
const headerBlock = document.querySelector('.header-block')
let c = 0;

function openMenu() {
    c++
    headerBlock.classList.toggle('flip');

    if(c % 2 != 0){
        
        iconMenu.innerHTML = '<ion-icon name="close-outline"></ion-icon>'
        
    }else{
        
        iconMenu.innerHTML = '<ion-icon name="menu-outline"></ion-icon>'

    }
    
}