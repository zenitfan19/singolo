const HEADER_MENU = document.getElementById('header__menu');
const PORTFOLIO_TAGS = document.getElementById('portfolio-tag-list');
const PORTFOLIO_IMAGES_BORDER = document.createElement('div');
const IPHONES = document.querySelectorAll('.iphone');
const SLIDER = document. getElementById('slider-block');
const SLIDER_ARROW_LEFT = SLIDER.querySelector('.slider__arrow_left');
const SLIDER_ARROW_RIGHT = SLIDER.querySelector('.slider__arrow_right');
const SLIDES = SLIDER.querySelectorAll('.slider-wrapper > div');
let CURRENT_SLIDE_NUM = 0;
let SLIDER_BLOCKED = false;
let PORTFOLIO_IMAGES = document.getElementById('portfolio-images');

PORTFOLIO_IMAGES_BORDER.classList.add('example__img-border');

document.addEventListener('DOMContentLoaded', () => {
  setSlidesOrder();
});

document.addEventListener('scroll', (event) => {
  const currentPosition = window.scrollY + 95;
  const sections = document.querySelectorAll('main > div');
  const menuItems = HEADER_MENU.querySelectorAll('a');  

  sections.forEach((el) => {
    if(el.offsetTop <= currentPosition && (el.offsetTop + el.offsetHeight) > currentPosition) {      
      menuItems.forEach((a) => {
        a.classList.remove('navigation__link_active');
        if(el.getAttribute('id') === a.getAttribute('href').substring(1)) {
          a.classList.add('navigation__link_active');
        }
      });
    }
  });
})

PORTFOLIO_TAGS.addEventListener('click', (event) => {
  let images = PORTFOLIO_IMAGES.querySelectorAll('div.example__img');
  let imagesOffsetTarget = +event.target.getAttribute('img-offset');
  let imagesOffsetActive = +PORTFOLIO_TAGS.querySelector('.active').getAttribute('img-offset');
  let imagesOffsetCurrent = Math.abs(imagesOffsetTarget - imagesOffsetActive);
  let imagesOffset = imagesOffsetTarget > imagesOffsetActive ? -imagesOffsetCurrent : imagesOffsetCurrent;
  
  if(event.target.tagName === 'LI' && !event.target.classList.contains('active')) {
    PORTFOLIO_TAGS.querySelectorAll('li').forEach(el => el.classList.remove('active'));
    event.target.classList.add('active');       
    for(let i = 0; i < images.length; i++) { 
      if(imagesOffset > 0) {        
        PORTFOLIO_IMAGES.appendChild(images[(i+imagesOffset)%images.length]);
      } else {       
        PORTFOLIO_IMAGES.appendChild(images[(images.length + (i+imagesOffset))%images.length]);
      }     
    }    
  }  
});

PORTFOLIO_IMAGES.addEventListener('click', (event) => {
  if(event.target.tagName === 'DIV' && event.target.classList.contains('example__img')) {
    PORTFOLIO_IMAGES.querySelectorAll('.example__img').forEach(el => el.hasChildNodes() ? el.removeChild(el.firstChild) : el);
    event.target.appendChild(PORTFOLIO_IMAGES_BORDER);        
  } else if(event.target.classList.contains('example__img-border')) {
    event.target.parentNode.removeChild(event.target);
  }
});

IPHONES.forEach(el => el.addEventListener('click', (event) => {
  if(event.target.classList.contains('iphone__model')) {    
    let screen = event.target.nextElementSibling.classList.contains('iphone__screen') ? event.target.nextElementSibling : null;
    if(screen) {
      screen.classList.toggle('switched-off');    
    }
  }
}));

SLIDER_ARROW_LEFT.addEventListener('click', () => {
  moveSlideToRight();
});

SLIDER_ARROW_RIGHT.addEventListener('click', () => {
  moveSlideToLeft();
});

function setSlidesOrder() { 
  let currentSlide = SLIDES[CURRENT_SLIDE_NUM].cloneNode(true);
  let previousSlide = CURRENT_SLIDE_NUM === 0 ? SLIDES[SLIDES.length-1].cloneNode(true) : SLIDES[CURRENT_SLIDE_NUM-1].cloneNode(true);
  let nextSlide = CURRENT_SLIDE_NUM === SLIDES.length-1 ? SLIDES[0].cloneNode(true) : SLIDES[CURRENT_SLIDE_NUM+1].cloneNode(true);  
  let wrapper = SLIDER.querySelector('.slider-wrapper');
     
  wrapper.innerHTML = '';
  
  previousSlide.style.transform = 'translateX(-100%)';   
  nextSlide.style.transform = 'translateX(100%)';  
  wrapper.appendChild(previousSlide);
  wrapper.appendChild(currentSlide);
  wrapper.appendChild(nextSlide);
  wrapper.classList.remove('disabled'); 
}

function moveSlideToLeft() {
  if (!SLIDER_BLOCKED) {
    SLIDER_BLOCKED = true;
    let slides = SLIDER.querySelectorAll('.slider-wrapper > div');
    slides[1].style.transform = 'translateX(-100%)';
    slides[2].style.transform = 'translateX(0%)';

    CURRENT_SLIDE_NUM = CURRENT_SLIDE_NUM + 1 < SLIDES.length ? ++CURRENT_SLIDE_NUM : 0;           
  }
}

function moveSlideToRight() {
  if (!SLIDER_BLOCKED) {
    SLIDER_BLOCKED = true;
    let slides = SLIDER.querySelectorAll('.slider-wrapper > div');
    slides[1].style.transform = 'translateX(100%)';
    slides[0].style.transform = 'translateX(0%)';

    CURRENT_SLIDE_NUM = CURRENT_SLIDE_NUM > 0 ? --CURRENT_SLIDE_NUM : SLIDES.length - 1;            
  }
}

SLIDER.querySelector('.slider-wrapper').addEventListener('transitionend', function () {
    setSlidesOrder();
    SLIDER_BLOCKED = false;
});