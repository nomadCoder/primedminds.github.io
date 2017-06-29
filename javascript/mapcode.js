var isvideoopen = "no"
var arewedisplaying = "no"

function sethm(a, b) {
  hover = document.getElementById(a);
  message = document.getElementById(b);
  if (arewedisplaying === "no") {
    display()
  }
}

var flasher = document.getElementById("flasher");

function flash() {
  setTimeout(on, 500);
  setTimeout(off, 1000);
  setTimeout(on, 1500);
  setTimeout(off, 2000);
  setTimeout(on, 2500);
  setTimeout(off, 3000);
  setTimeout(on, 3500);
  setTimeout(off, 4000);
}

function on() {
  flasher.style.opacity = "1.0"
}

function off() {
  flasher.style.opacity = "0.0"
}

function display() {
  if (isvideoopen === "no") {
    message.style.visibility = "visible";
    arewedisplaying = "yes"
  }
}

function hide() {
  arewedisplaying = "no"
  message.style.visibility = "hidden";
}
var toopen = []
function openvideo(a) {
  toopen = document.getElementById(a);
  toopen.style.display = "block"
  isvideoopen = "yes"
}
var toclose = []
function closevideo(a) {
  toclose = document.getElementById(a);
  toclose.style.display = "none"
  isvideoopen = "no"
}
