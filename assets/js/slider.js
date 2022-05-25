// noinspection JSUnusedGlobalSymbols,JSUnresolvedFunction,JSUndeclaredVariable

let slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
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
  setTimeout(autoSlides, 5000); // Change image every 2 seconds
}



// animation parallax
const scene = document.getElementById('scene');
const parallaxInstance = new Parallax(scene, {
  relativeInput: true,
  scalarY: 8,
});

parallaxInstance.friction(0.2, 0.2);


// animation without library

const leaf1 = document.getElementById('leafOne');
const leaf2 = document.getElementById('leafTwo');
const leaf3 = document.getElementById('leafThree');
const leaf4 = document.getElementById('leafFour');

function movement(id,deg) {


    id.style.transform = `translateY(${Y}px) translateX(${X}px) rotate(${deg}deg)`;
}

window.addEventListener("mousemove", function(e){

  X = -0.07*e.clientX;
  Y = -0.03*e.clientY;
  movement(leaf1, -50)
});

window.addEventListener("mousemove", function(e){

  X = 0.07*e.clientX;
  Y = -0.03*e.clientY;
  movement(leaf2, 40)
});

window.addEventListener("mousemove", function(e){

  X = -0.07*e.clientX;
  Y = 0.03*e.clientY;
  movement(leaf3, -100)
});

window.addEventListener("mousemove", function(e){

  X = 0.07*e.clientX;
  Y = 0.03*e.clientY; 
  movement(leaf4, 100)
});


const imag = document.getElementsByClassName('thumbnail');
new simpleParallax(imag, {
	scale: 1.5
});


