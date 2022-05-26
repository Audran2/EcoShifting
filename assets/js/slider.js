let slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}
    
function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slides[slideIndex-1].style.display = "block";
}

let slideauto = 0;
autoSlides();

function autoSlides() {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slideauto++;
  if (slideauto > slides.length) {slideauto = 1}
  slides[slideauto-1].style.display = "block";
  setTimeout(autoSlides, 5000); // Change image every 5 seconds
}



// animation parallax
const scene = document.getElementById('scene');
const parallaxInstance = new Parallax(scene, {
  relativeInput: true,
  scalarY: 8,
});

parallaxInstance.friction(0.2, 0.2);


// animation without librairie

var feuille1 = document.getElementById('feuille1');
var feuille2 = document.getElementById('feuille2');
var feuille3 = document.getElementById('feuille3');
var feuille4 = document.getElementById('feuille4');


function onMove(elementId, transform) {
  elementId.style.transform =transform;
}

function onMoveLeef(id,deg,transforms) {

  const movementLeef =  `translateY(${transforms.translateY}px) translateX(${transforms.translateX}px) rotate(${deg}deg)`
  onMove(id, movementLeef)
}

function eventMouseMouveLeef(transforms,xMultiplier, yMultiplier, id, deg) {
  const translateX = xMultiplier*transforms.translateX;
  const translateY = yMultiplier*transforms.transformY;

  onMoveLeef(id, deg,{translateX, translateY} )
}

function takeClientFromEvent(event){

  const translateX = event.clientX;
  const transformY = event.clientY;
  return {translateX, transformY}
  
}

window.addEventListener("mousemove", function(event){ 
 const transforms =  takeClientFromEvent(event) 
eventMouseMouveLeef(transforms,-0.07, 0.03,feuille1, -50)
eventMouseMouveLeef(transforms,0.07, 0.03,feuille2, 40)
eventMouseMouveLeef(transforms,-0.07, -0.03,feuille3, -100)
eventMouseMouveLeef(transforms,0.07, -0.03,feuille4, 100)
});



