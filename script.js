const HEADER_MENU = document.getElementById('header__menu');
const PORTFOLIO_TAGS = document.getElementById('portfolio-tag-list');
const PORTFOLIO_IMAGES_BORDER = document.createElement('div');
const IPHONES = document.querySelectorAll('.iphone');
let PORTFOLIO_IMAGES = document.getElementById('portfolio-images');

PORTFOLIO_IMAGES_BORDER.classList.add('example__img-border');

HEADER_MENU.addEventListener('click', (event) => {
  if(event.target.tagName === 'A') {
    HEADER_MENU.querySelectorAll('a').forEach(el => el.classList.remove('navigation__link_active'));
    event.target.classList.add('navigation__link_active');
  }    
});

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