// preload sprite images for better animation performance
if (document.images) {
  walking1 = document.createElement("img");
  walking2 = document.createElement("img");
  water1 = document.createElement("img");
  water2 = document.createElement("img");
  water3 = document.createElement("img");

  walking1.src = "./assets/bridges/WalkingMonster1.png";
  walking2.src = "./assets/bridges/WalkingMonster2.png";
  water1.src = "./assets/bridges/WaterMonster1.png";
  water2.src = "./assets/bridges/WaterMonster2.png";
  water3.src = "./assets/bridges/WaterMonster3.png";
}

setBackdropURL("./assets/bridges/KonigMap.jpg");

// monster sprite
var monster = new Image({
  url: "./assets/bridges/WalkingMonster1.png",
  height: 120,
  width: 100,
  x: minX + 75,
  y: maxY - 100
});

// walking animation frames
monster.walking = [
  "./assets/bridges/WalkingMonster1.png",
  "./assets/bridges/WalkingMonster2.png"
];

// drowning animation frames
monster.water = [
  "./assets/bridges/WaterMonster1.png",
  "./assets/bridges/WaterMonster2.png",
  "./assets/bridges/WaterMonster3.png"
];

var splash = new Audio("./assets/bridges/splash.mp3");

// invisible sprite for detecting what the monster's feet are touching, and drawing the path
var monsterFeet = new Rectangle({
  width: 40,
  height: 5,
  x: monster.x,
  y: monster.y - 40,
  brightness: 0
});

monsterFeet.penColor = "red";
monsterFeet.penWidth = "5";

// the native Pen feature of Woof draws a line that is jagged; this workaround fixes that
// to turn the pen on: monsterFeet.pen = true; off: monsterFeet.pen = false;
monsterFeet.drawPen = function() {
  if (monsterFeet.pen) {
    var proj = monsterFeet.project;
    var lastCoords = coordHistory[historyCount % 3];
    var lastX = lastCoords.x;
    var lastY = lastCoords.y - 40;
    if(monsterFeet.x != lastX || monsterFeet.y != lastY) {
      proj._penContext.save();
      proj._penContext.beginPath();
      proj._penContext.moveTo(...proj.translateToCanvas(lastX, lastY));
      proj._penContext.lineTo(...proj.translateToCanvas(monsterFeet.x, monsterFeet.y));
      proj._penContext.lineCap = "round";
      proj._penContext.strokeStyle = monsterFeet.penColor;
      proj._penContext.lineWidth = monsterFeet.penWidth;
      proj._penContext.stroke();
      proj._penContext.restore();
    }
  }
};

var tryAgain = createButton(-0.45 * height, "Try Again");

// holds polygon coordinates that represent water locations
// the x and y values are ratios relative to the width/height of the canvas
// so x = -0.5 is the left edge, x = 0.5 is the right edge etc.
// multiplying the coordinates by height and width give you the exact coords
var water = [
  // leftmost forked segment
  [
    { "x": -0.5, "y": 0.18 },
    { "x": -0.45, "y": 0.18 },
    { "x": -0.33, "y": 0.24 },
    { "x": -0.313, "y": 0.2 },
    { "x": -0.317, "y": 0.14 },
    { "x": -0.36, "y": 0.08 },
    { "x": -0.375, "y": 0 },
    { "x": -0.347, "y": -0.05 },
    { "x": -0.313, "y": -0.09 },
    { "x": -0.341, "y": -0.18 },
    { "x": -0.43, "y": -0.12 },
    { "x": -0.5, "y": -0.09 }
  ],
  // top segment second from the left
  [
    { "x": -0.25, "y": 0.28333 },
    { "x": -0.154, "y": 0.29733 },
    { "x": -0.053, "y": 0.264 },
    { "x": -0.08, "y": 0.14 },
    { "x": -0.142, "y": 0.165 },
    { "x": -0.217, "y": 0.16 }
  ],
  // top segment second from the right
  [
    { "x": 0.03, "y": 0.225 },
    { "x": 0.123, "y": 0.204 },
    { "x": 0.2256, "y": 0.25167 },
    { "x": 0.235, "y": 0.245 },
    { "x": 0.265, "y": 0.2 },
    { "x": 0.28, "y": 0.13 },
    { "x": 0.23, "y": 0.11 },
    { "x": 0.2, "y": 0.09 },
    { "x": 0.1796, "y": 0.03 },
    { "x": 0.104, "y": 0.03 },
    { "x": 0.066, "y": 0.1 },
    { "x": 0.008, "y": 0.11 }
  ],
  // rightmost top segment
  [
    { "x": 0.31, "y": 0.29 },
    { "x": 0.4, "y": 0.33 },
    { "x": 0.5, "y": 0.35 },
    { "x": 0.5, "y": 0.23 },
    { "x": 0.45, "y": 0.225 },
    { "x": 0.36, "y": 0.17 },
    { "x": 0.325, "y": 0.23 }
  ],
  // rightmost bottom segment
  [
    { "x": 0.345, "y": -0.18 },
    { "x": 0.5, "y": -0.15 },
    { "x": 0.5, "y": -0.3 },
    { "x": 0.4, "y": -0.285 },
    { "x": 0.32, "y": -0.29 }
  ],
  // bottom segment second from the right
  [
    { "x": -0.02, "y": -0.16 },
    { "x": 0.09, "y": -0.085 },
    { "x": 0.097, "y": -0.055 },
    { "x": 0.19, "y": -0.05 },
    { "x": 0.22, "y": -0.11 },
    { "x": 0.27, "y": -0.15 },
    { "x": 0.26, "y": -0.2 },
    { "x": 0.23, "y": -0.24 },
    { "x": 0.19, "y": -0.22 },
    { "x": 0.1, "y": -0.21 },
    { "x": -0.02, "y": -0.25 }
  ],
  // bottom segment second from the left
  [
    { "x": -0.228, "y": -0.13 },
    { "x": -0.1, "y": -0.145 },
    { "x": -0.12, "y": -0.25 },
    { "x": -0.25, "y": -0.225 }
  ]
];

// debugging purposes:
// uncomment the below code to display the above polygons on the screen
// water.forEach(function(section) {
//   section.forEach(function(segment, index) {
//     if (index !== section.length - 1) {
//       new Line({
//         color: "red",
//         width: 5,
//         x: segment.x * width,
//         y: segment.y * height,
//         x1: section[index + 1].x * width ,
//         y1: section[index + 1].y * height
//       });
//     }
//     else {
//       new Line({
//         color: "red",
//         width: 5,
//         x: segment.x * width,
//         y: segment.y * height,
//         x1: section[0].x * width,
//         y1: section[0].y * height
//       });
//     }
//   });
// });

// x and y coordinates for where the monster drowns and splashes in above water segments
var drowningPositions = [
  // leftmost forked segment
  {x: -0.44, y: 0.05},
  // first top segment
  {x: -0.154, y: 0.24},
  // second top segment
  {x: 0.123, y: 0.15},
  // rightmost top segment
  {x: 0.4, y: 0.24},
  // rightmost bottom segment
  {x: 0.4, y: -0.23},
  // 2nd from the right bottom segment
  {x: 0.123, y: -0.13},
  // 3rd from the right bottom segment
  {x: -0.18, y: -0.21}
];

// this array holds a series of lines that mark the entry/exit points of the bridges
// they're used to detect if the monster has crossed a bridge or not
// the respawn property is the point the monster returns to if trying to cross a previously crossed bridge
var bridgeBoundaries = [
  // top left bridge
  [
    {x: -0.335, y: 0.25, x1: -0.25, y1: 0.28, respawn: {x: -0.2998, y: 0.3567}},
    {x: -0.31, y: 0.12, x1: -0.22, y1: 0.15, respawn: {x: -0.2583, y: 0.1417}}
  ],
  // top middle bridge
  [
    {x: -0.05, y: 0.27, x1: 0.035, y1: 0.237, respawn: {x: -0.0058, y: 0.3451}},
    {x: -0.08, y: 0.14, x1: 0, y1: 0.11, respawn: {x: -0.0335, y: 0.1333}}
  ],
  // top right bridge
  [
    {x: 0.23, y: 0.26, x1: 0.31, y1: 0.28, respawn: {x: 0.2737, y: 0.362}},
    {x: 0.28, y: 0.15, x1: 0.353, y1: 0.17, respawn: {x: 0.33, y: 0.1754}}
  ],
  // bottom right bridge
  [
    {x: 0.273, y: -0.15, x1: 0.345, y1: -0.17, respawn: {x: 0.3183, y: -0.0922}},
    {x: 0.23, y: -0.25, x1: 0.32, y1: -0.28, respawn: {x: 0.2875, y: -0.2566}}
  ],
  // bottom middle bridge
  [
    {x: -0.1, y: -0.14, x1: -0.02, y1: -0.15, respawn: {x: -0.0627, y: -0.0669}},
    {x: -0.115, y: -0.245, x1: -0.022, y1: -0.25, respawn: {x: -0.0735, y: -0.2313}}
  ],
  // bottom left bridge
  [
    {x: -0.31, y: -0.08, x1: -0.22, y1: -0.13, respawn: {x: -0.2552, y: -0.0374}},
    {x: -0.345, y: -0.18, x1: -0.245, y1: -0.22, respawn: {x: -0.3014, y: -0.1934}}
  ],
  // middle bridge
  [
    {x: 0.1, y: 0.03, x1: 0.1, y1: -0.055, respawn: {x: 0.07, y: 0.03}},
    {x: 0.18, y: 0.04, x1: 0.2, y1: -0.05, respawn: {x: 0.22, y: 0.02}}
  ]
];

// bridge object constructor consisting of its two line boundaries
function Bridge(line1, line2) {
  this.active = true;
  this.line1 = line1;
  this.line2 = line2;
}

// create an array of bridge objects using the coordinates in bridgeBoundaries
var bridges = bridgeBoundaries.map(function(set) {
  var line1 = new Line({
    x: set[0].x * width,
    y: set[0].y * height,
    x1: set[0].x1 * width,
    y1: set[0].y1 * height,
    width: 15,
    brightness: 0
  });
  line1.crossed = false;
  line1.touched = false;
  line1.respawn = set[0].respawn;
  var line2 = new Line({
    x: set[1].x * width,
    y: set[1].y * height,
    x1: set[1].x1 * width,
    y1: set[1].y1 * height,
    width: 15,
    brightness: 0
  });
  line2.crossed = false;
  line2.touched = false;
  line2.respawn = set[1].respawn;
  return new Bridge(line1, line2);
});

var canMove = true;
var drowning = false;
var monsterMouseDown = false;
// remember the three most recent monster positions - this is useful for sending him backwards etc.
var coordHistory = [
  {},
  {},
  {}
];
var historyCount = 0;

monster.onMouseDown(function() {
  monsterMouseDown = true;
  monsterFeet.pen = true;
});

monster.onMouseUp(function() {
  monsterMouseDown = false;
  monsterFeet.pen = false;
});

// monster movement
forever(function() {
  monsterFeet.drawPen();

  // keep the feet always at the feet
  monsterFeet.x = monster.x;
  monsterFeet.y = monster.y - 40;

  // don't let him go off screen
  if (monster.x > maxX) monster.x = maxX;
  if (monster.x < minX) monster.x = minX;
  if (monster.y > maxY) monster.y = maxY;
  if (monster.y < minY) monster.y = minY;

  // allow movement if not drowning and not trying to cross a deactivated bridge
  if (!drowning && canMove) {
    if (keysDown.includes("up")) {
      monster.y += 3;
    }
    if (keysDown.includes("right")) {
      monster.x += 3;
    }
    if (keysDown.includes("down")) {
      monster.y -= 3;
    }
    if (keysDown.includes("left")) {
      monster.x -= 3;
    }

    // turning pen on and off with keys or mouse
    if (keysDown.includes("up") || keysDown.includes("right") || keysDown.includes("down") || keysDown.includes("left")) {
      monsterFeet.pen = true;
    }
    else if (monsterMouseDown) {
      monster.x = mouseX;
      monster.y = mouseY;
      monsterFeet.pen = true;
    }
    else {
      monsterFeet.pen = false;
    }

    // if the monster isn't in the water, keep track of the three most recent 'safe' positions
    // sometimes the most recent 'safe' position isn't actually safe, so if we can go back
    // two positions, it's more sure to be out of the water
    if (!isInWater(monsterFeet.x, monsterFeet.y)) {
      historyCount++;
      coordHistory[historyCount % 3].x = monster.x;
      coordHistory[historyCount % 3].y = monster.y;
    }
    // if the monster is touching the water, make him 'drown'
    else {
      drown();
    }
  }
});

// detect bridge crossing
forever(function() {
  bridges.forEach(function(bridge) {
    var line1 = bridge.line1;
    var line2 = bridge.line2;
    // if the bridge is active, detect if either of the boundaries are being crossed
    if (bridge.active) {
      detectBoundaryCrossing(line1);
      detectBoundaryCrossing(line2);
    }
    // if the bridge is inactive (i.e. both boundaries have been crossed), don't let the monster cross
    else {
      if (monsterFeet.touching(line1)) {
        monsterFeet.pen = false;
        monster.x = line1.respawn.x * width;
        monster.y = line1.respawn.y * height;
        canMove = false;
        monsterMouseDown = false;
      }
      if (monsterFeet.touching(line2)) {
        monsterFeet.pen = false;
        monster.x = line2.respawn.x * width;
        monster.y = line2.respawn.y * height;
        canMove = false;
        monsterMouseDown = false;
      }
      after(0.1, "seconds", function() { canMove = true; });
    }
    // mark the bridge inactive if both boundaries have been crossed
    if (line1.crossed && line2.crossed && !monsterFeet.touching(line1) && !monsterFeet.touching(line2)) {
      bridge.active = false;
    }
  });
});

// walking animation
var costume = 0;
every(0.1, "seconds", function() {
  if (!drowning && (monsterMouseDown || keysDown.length > 0)) {
    monster.setImageURL(monster.walking[costume % 2]);
    costume++;
  }
});

// 'try again' button behavior
tryAgain.button.onMouseDown(function() {
  monsterFeet.pen = false;
  monster.x = minX + 75;
  monster.y = maxY - 100;
  clearPen();
  bridges.forEach(function(bridge) {
    bridge.active = true;
    bridge.line1.crossed = false;
    bridge.line1.touched = false;
    bridge.line2.crossed = false;
    bridge.line2.touched = false;
  });
});

// function that checks if the monster is in the water
function isInWater(x, y) {
  return water.some(function(polygon) {
    return inside({x: x / width, y: y / height}, polygon);
  });
}

// function to determine if a point is inside a polygon. Source:
// https://github.com/substack/point-in-polygon
function inside(point, vs) {
  var x = point.x, y = point.y;

  var inside = false;
  for (var i = 0, j = vs.length - 1; i < vs.length; j = i++) {
    var xi = vs[i].x, yi = vs[i].y;
    var xj = vs[j].x, yj = vs[j].y;

    var intersect = ((yi > y) != (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
    if (intersect) inside = !inside;
  }
  return inside;
}

function drown() {
  monsterMouseDown = false;
  drowning = true;
  monsterFeet.pen = false;

  // get width/height ratios for the monster's position
  var x = monsterFeet.x / width;
  var y = monsterFeet.y / height;

  // make the monster drown at the appropriate water segment
  // rightmost forked
  if (x < -0.3) {
    monster.x = drowningPositions[0].x * width;
    monster.y = drowningPositions[0].y * height;
  }
  else if (x < -0.03) {
    // top left
    if (y > 0) {
      monster.x = drowningPositions[1].x * width;
      monster.y = drowningPositions[1].y * height;
    }
    // bottom left
    else {
      monster.x = drowningPositions[6].x * width;
      monster.y = drowningPositions[6].y * height;
    }
  }
  else if (x < 0.29) {
    // top second from right
    if (y > -0.05) {
      monster.x = drowningPositions[2].x * width;
      monster.y = drowningPositions[2].y * height;
    }
    // bottom second from right
    else {
      monster.x = drowningPositions[5].x * width;
      monster.y = drowningPositions[5].y * height;
    }
  }
  else {
    // top left
    if (y > 0) {
      monster.x = drowningPositions[3].x * width;
      monster.y = drowningPositions[3].y * height;
    }
    // bottom left
    else {
      monster.x = drowningPositions[4].x * width;
      monster.y = drowningPositions[4].y * height;
    }
  }
  
  // play splash sound 
  splash.play();

  // drowning animation
  var count = 0;
  var costume = 0;
  repeat(100, function() {
    if (count % 10 === 0) {
      monster.setImageURL(monster.water[costume % 3]);
      costume++;
    }
    count++;
    // after drowning, go back to the safest point from the coordinate history
  }, function() {
    drowning = false;
    monster.x = coordHistory[(historyCount - 2) % 3].x;
    monster.y = coordHistory[(historyCount - 2) % 3].y;
    monster.setImageURL(monster.walking[0]);
  });
}

function detectBoundaryCrossing(line) {
  if (monsterFeet.touching(line)) {
    if (line.touched) {
      line.crossed = false;
      // line.color = "black";
    }
    else {
      line.crossed = true;
      // line.color = "red";
    }
  }
  else {
    if (line.crossed) {
      line.touched = true;
    }
    else {
      line.touched = false;
    }
  }
}

// creates a red button in alignment with primed minds style guide
// returns an object of sprites that make up parts of the button
function createButton(y, textString) {
  var shadowCircle1 = new Circle({
    radius: 25,
    color: "#BBB",
    x: minX + 35,
    y: y - 4
  });

  var shadowCircle2 = new Circle({
    radius: 25,
    color: "#BBB",
    x: minX + 166,
    y: y - 4
  });

  var shadowBox = new Rectangle({
    width: 125,
    height: 50,
    x: minX + 100,
    y: y - 4,
    color: "#BBB"
  });

  var buttonCircle1 = new Circle({
    radius: 25,
    color: "#f44336",
    x: minX + 35,
    y: y
  });

  var buttonCircle2 = new Circle({
    radius: 25,
    color: "#f44336",
    x: minX + 166,
    y: y
  });

  var button = new Rectangle({
    width: 125,
    height: 50,
    x: minX + 100,
    y: y,
    color: "#f44336"
  });

  var text = new Text({
    text: textString,
    x: button.x,
    y: y,
    size: 20,
    color: "white"
  });

  return { button: button, text: text, buttonCircle1: buttonCircle1, buttonCircle2: buttonCircle2, shadowBox: shadowBox, shadowCircle1: shadowCircle1, shadowCircle2: shadowCircle2 };
}
