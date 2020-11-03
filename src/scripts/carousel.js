let carouselInnerContainer = document.getElementsByClassName("carouselContainer__space")[0];

let widthState = 100;
let ORIGINALS_SLIDES;

window.onload = () => {
    ORIGINALS_SLIDES = carouselInnerContainer.innerHTML;
    resizeWidth();
    duplicateSlides();
    hideFirstSlide();
    addListenerToButtons();
}

window.onresize = () => {
    carouselInnerContainer.innerHTML = ORIGINALS_SLIDES;
    resizeWidth();
    duplicateSlides();
    hideFirstSlide();
    addListenerToButtons();
}

function resizeWidth() {
    let width = window.innerWidth;
    let finalWidth = 96;
    if (width > 1200) {
        finalWidth = 80;
    } else if (width > 1024 && width < 1200) {
        finalWidth = -0.114 * width + 216.364;
    }
    document.documentElement.style.setProperty('--carousel-width', finalWidth + 'vw');
    widthState = finalWidth;
}

function duplicateSlides() {
    let slides = carouselInnerContainer.children;
    let totalSlides = slides.length;
    for (let i = 0; i < totalSlides - 1; i++) {
        carouselInnerContainer.insertBefore(slides[i].cloneNode(true), slides[slides.length - 1].nextSibling);
    }
    carouselInnerContainer.insertBefore(slides[totalSlides - 1].cloneNode(true), slides[0]);
}

function hideFirstSlide() {
    desanimate();
    let slides = document.getElementsByClassName("carousel");
    Array.prototype.map.call(slides, (slide) => {
        slide.style.transform = `translate(-${widthState}vw)`;
    })
}

function addListenerToButtons() {
    let buttons = document.getElementsByClassName("boton_siguiente");
    Array.prototype.map.call(buttons, (button) => {
        button.addEventListener('click', moveToNext);
    })
    let buttonsPrevius = document.getElementsByClassName("boton_anterior");
    Array.prototype.map.call(buttonsPrevius, (button) => {
        button.addEventListener('click', moveToPrevius);
    })
}

function moveToNext() {
    animate();
    changeDisabledState();
    let slides = document.getElementsByClassName("carousel");
    Array.prototype.map.call(slides, (slide) => {
        slide.style.transform = `translate(-${widthState * 2}vw)`;
    });
    slides[0].addEventListener('transitionend', () => {
        sortSlides(updateNextExtremes);
        changeDisabledState();
    })
}

function moveToPrevius() {
    animate();
    changeDisabledState();
    let slides = document.getElementsByClassName("carousel");
    Array.prototype.map.call(slides, (slide) => {
        slide.style.transform = `translate(${0}vw)`;
    });
    slides[slides.length - 1].addEventListener('transitionend', () => {
        sortSlides(updateExtremePrevius);
        changeDisabledState();
    })
}

function sortSlides(updateExtremes) {
    desanimate();
    updateExtremes();
    let slides2 = document.getElementsByClassName("carousel");
    Array.prototype.map.call(slides2, (slide) => {
        slide.style.transform = `translate(-${widthState}vw)`;
    });
}

function updateNextExtremes() {
    let slides = carouselInnerContainer.children;
    let firstSlide = slides[0];
    let lastSlide = slides[slides.length - 1];
    carouselInnerContainer.insertBefore(firstSlide.cloneNode(true), lastSlide.nextSibling);
    carouselInnerContainer.removeChild(firstSlide);
    addListenerToButtons();
}

function updateExtremePrevius() {
    let slides = carouselInnerContainer.children;
    carouselInnerContainer.insertBefore(slides[slides.length - 1].cloneNode(true), slides[0]);
    carouselInnerContainer.removeChild(slides[slides.length - 1]);
    addListenerToButtons();
}

function changeDisabledState() {
    let buttonsNext = document.getElementsByClassName("boton_siguiente");
    let buttonsPrevius = document.getElementsByClassName("boton_anterior");
    let buttons = Array.from(buttonsNext).concat(Array.from(buttonsPrevius));
    for (let button of buttons) {
        button.disabled = !button.disabled;
    }
}

function animate() {
    let slides = document.getElementsByClassName("carousel");
    return Array.prototype.map.call(slides, (slide) => {
        slide.style.transitionProperty = 'all';
        slide.style.transitionDuration = '2s';
    });
}

function desanimate() {
    let slides = document.getElementsByClassName("carousel");
    return Array.prototype.map.call(slides, (slide) => {
        slide.style.transitionDuration = '0s';
    });
}