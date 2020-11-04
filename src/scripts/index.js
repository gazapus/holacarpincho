function resizeWidthCards() {
    let width = window.innerWidth;
    let finalWidth = 96;
    if (width > 1200) {
        finalWidth = 80;
    } else if (width > 1024 && width < 1200) {
        finalWidth = -0.114 * width + 216.364;
    } else if (width < 500) {
        finalWidth = 100;
    }
    document.documentElement.style.setProperty('--cardsContainer-width', finalWidth + 'vw');
}
