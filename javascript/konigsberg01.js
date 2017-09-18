setBackdropURL("./assets/bridges/KonigMap.jpg");

var monster = new Image({
  url: "./assets/bridges/WalkingMonster1.png",
  height: 120,
  width: 100,
  x: minX + 75,
  y: maxY - 100
});

monster.walking = [
  "./assets/bridges/WalkingMonster1.png",
  "./assets/bridges/WalkingMonster2.png"
];

monster.water = [
  "./assets/bridges/WaterMonster1.png",
  "./assets/bridges/WaterMonster2.png",
  "./assets/bridges/WaterMonster3.png"
];

var monsterFeet = new Rectangle({
  width: 40,
  height: 5,
  x: monster.x,
  y: monster.y - 40,
  showing: false
});

monsterFeet.penColor = "red";
monsterFeet.penWidth = "5";

// holds polygon coordinates that represent water locations
// the order is clockwise starting from the forked water segment on the left
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
water.forEach(function(section) {
  section.forEach(function(segment, index) {
    if (index !== section.length - 1) {
      new Line({
        color: "red",
        width: 5,
        x: segment.x * width,
        y: segment.y * height,
        x1: section[index + 1].x * width ,
        y1: section[index + 1].y * height
      });
    }
    else {
      new Line({
        color: "red",
        width: 5,
        x: segment.x * width,
        y: segment.y * height,
        x1: section[0].x * width,
        y1: section[0].y * height
      });
    }
  });
});

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

var drowning = false;
var monsterMouseDown = false;
var coordHistory = [
  {},
  {},
  {}
];
var historyCount = 0;

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

  if (!drowning) {
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
      monsterMouseDown = false;
      drowning = true;
      monsterFeet.penUp();

      // get width/height ratios for the monster's position
      var x = (monsterFeet.x + maxX) / width;
      var y = (monsterFeet.y + maxY) / height;

      // make the monster drown at the appropriate water segment
      // rightmost forked
      if (x < 0.2) {
        monster.x = drowningPositions[0].x * width;
        monster.y = drowningPositions[0].y * height;
      }
      else if (x < 0.47) {
        // top left
        if (y > 0.5) {
          monster.x = drowningPositions[1].x * width;
          monster.y = drowningPositions[1].y * height;
        }
        // bottom left
        else {
          monster.x = drowningPositions[6].x * width;
          monster.y = drowningPositions[6].y * height;
        }
      }
      else if (x < 0.79) {
        // top second from right
        if (y > 0.45) {
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
        if (y > 0.5) {
          monster.x = drowningPositions[3].x * width;
          monster.y = drowningPositions[3].y * height;
        }
        // bottom left
        else {
          monster.x = drowningPositions[4].x * width;
          monster.y = drowningPositions[4].y * height;
        }
      }

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
  }
});

// walking animation
var costume = 0;
every(0.1, "seconds", function() {
  if (!drowning && (monsterMouseDown || keysDown.length > 0)) {
    monster.setImageURL(monster.walking[costume % 2]);
    costume++;
  }
});

// function that checks if dot walked into a water spot 
function isInWater(x, y) {
  var isInWater = false;

  for(var k = 0; k < water.length; k++){
    polygon = water[k];

    var j = polygon.length - 1;
    for(var i = 0; i < polygon.length; i++) {
      if (
        polygon[i].y * height < y 
        && polygon[j].y * height >= y
        || polygon[j].y * height < y
        && polygon[i].y * height >= y
      ) {
        if ((polygon[i].x * width) + (y - (polygon[i].y * height)) / ((polygon[j].y * height) - (polygon[i].y * height) * (polygon[j].x * width) - (polygon[i].x * width)) < x ) {
          isInWater = !isInWater;
        }
      }
      j = i;
    }

    if (isInWater) {
      return true;
    }
  }

  // if reached here, not in water
  return false; 
}
