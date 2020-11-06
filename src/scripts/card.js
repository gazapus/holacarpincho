function setCardImage() {
    let cardImages = document.getElementsByClassName("card__image");
    if (cardImages) {
        for (let cardImage of cardImages) {
            cardImage.style.backgroundImage = `url('${cardImage.dataset.imageurl}')`;
        }
    }
}