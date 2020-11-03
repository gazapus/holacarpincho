let navButton = document.getElementsByClassName("menu__button")[0];
let menu__list = document.getElementsByClassName("menu__list")[0];

navButton.addEventListener('click', () => {
    if(window.innerWidth < 800) {
        menu__list.classList.toggle('menu__list--hidden');
        menu__list.classList.toggle('menu__list--showed');
    }
})

window.onload = () => {
    setHeight();
}

function setHeight(){
    let itemsQuantity = menu__list.children.length;
    let heightNumber = itemsQuantity * 2.34;
    document.documentElement.style.setProperty("--menu__list-height", heightNumber + 'em');
}