var flasher = document.getElementById("flasher");

function flash() {
  setTimeout(on, 250);
  setTimeout(off, 500);
  setTimeout(on, 750);
  setTimeout(off, 1000);
  setTimeout(on, 1250);
  setTimeout(off, 1500);
  setTimeout(on, 1750);
  setTimeout(off, 2000); 
  setTimeout(on, 2250);
  setTimeout(off, 2500);
  setTimeout(on, 2750);
  setTimeout(off, 3000);
  setTimeout(on, 3250);
  setTimeout(off, 3500);
  setTimeout(on, 3750);
  setTimeout(off, 4000);
  setTimeout(on, 4250);
  setTimeout(off, 4500);
  setTimeout(on, 4750);
  setTimeout(off, 5000);
  setTimeout(on, 5250);
  setTimeout(off, 5000);
  setTimeout(on, 5750);
  setTimeout(off, 6000);
}

function on() {
  flasher.style.opacity = "1.0"
}

function off() {
  flasher.style.opacity = "0.0"
}
