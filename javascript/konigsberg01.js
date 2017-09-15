setBackdropURL("./assets/bridges/KonigMap.jpg");

var monster = new Image({
  url: "./assets/bridges/WalkingMonster1.png",
  height: 120,
  width: 100
});

var monsterFeet = new Rectangle({
  width: 40,
  height: 5,
  x: monster.x,
  y: monster.y - 40,
  showing: false
});

monsterFeet.penColor = "red";
monsterFeet.penWidth = "5";

var monsterMouseDown = false;

monster.onMouseDown(function() {
  monsterMouseDown = true;
  monsterFeet.penDown();
});

monster.onMouseUp(function() {
  monsterMouseDown = false;
  monsterFeet.penUp();
});


forever(function() {
  monsterFeet.x = monster.x;
  monsterFeet.y = monster.y - 40;

  if (keysDown.includes("up")) {
    monster.y += 2;
  }
  if (keysDown.includes("right")) {
    monster.x += 2;
  }
  if (keysDown.includes("down")) {
    monster.y -= 2;
  }
  if (keysDown.includes("left")) {
    monster.x -= 2;
  }

  if (keysDown.includes("up") || keysDown.includes("right") || keysDown.includes("down") || keysDown.includes("left")) {
    monsterFeet.penDown();
  }
  else if (monsterMouseDown) {
    monster.x = mouseX;
    monster.y = mouseY;
    monsterFeet.penDown();
  }
  else {
    monsterFeet.penUp();
  }
});
