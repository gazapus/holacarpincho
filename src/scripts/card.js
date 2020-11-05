function setCardImage() {
    let cardImages = document.getElementsByClassName("card__image");
    if (cardImages) {
        for (let cardImage of cardImages) {
            cardImage.style.backgroundImage = `url('../src/images/${cardImage.dataset.imageurl}')`;
        }
    }
}