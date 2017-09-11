var graphDimXPercent = 0.8; //graph dim in X is 40% of canvas width
var graphDimYPercent = 0.8; //graph dim in Y is 80% of canvas width
var graphStartXPercent = 0.1; //graph starts in X at 50% of canvas width from left
var graphStartYPercent = 0.1; //graph starts in X at 10% of canvas width from __top__

var monImg0; //image of black monster
var monImg1; //image of red monster

var monImgScale = 0.4; //image scale for the monsters

var runArmStretches = false;

var lines0 = []; //this stores all the lines for black monster
var lines1 = []; //this stores all the lines for red monster

var secsPerFrame; //this is to grow the arms at a frame independent speed. 
var startingLength = 1; //starting length of arms before they grow

var fireBtn; //this is a dom object so we can add event listeners and change its value from fire! to stop

//This funciton draws our sprites with a rotation around the center of the image. 
function drawImg(img, rot, scale, posX, posY) {
  push();
  translate(posX, posY); //where we want it on the sceen
  rotate(rot);
  translate(-scale*img.width/2, -scale*img.height/2); //so it rotates around the center
  image(img, 0, 0, scale*img.width, scale*img.height);
  pop();

}

function drawLine(startPosX, startPosY, length, rot, colorR, colorG, colorB) {
  push();
  translate(startPosX, startPosY); //where we want it on the sceen
  rotate(rot);
  stroke(colorR, colorG, colorB);
  strokeWeight(10);
  line(0, 0, length, 0);
  pop();
}

//we need this function since we store the direction not the endpoint, so we use cos/sin to work out the end point
function getEndPoint(line) {
  var res = {x: 0, y: 0};
  res.x = line.startX + line.size*Math.cos(line.radians);
  res.y = line.startY + line.size*Math.sin(line.radians);
  return res;
}

function clampOnCondition(condition, newStX, newStY, index, previousLine, newLine, linesArray) {
  if(condition) {
    var lineInfo = {startX: newStX, startY: newStY, radians: previousLine.radians, size: startingLength};
    if(newLine.obj !== null) {
      //no need to push new line. we just ammend our previous new line. 
      newLine.obj.startY = lineInfo[index];
    } else {
      linesArray.push(lineInfo);  
      newLine.obj = linesArray[linesArray.length - 1];
    }
  }

}

function clampAndAddLine(line, linesArray, graphMinX, graphMaxX, graphMinY, graphMaxY) {

  var end0 = getEndPoint(line);
  var newLine = { obj: null }; //act as a pointer to send down to funciton to modify. 
  clampOnCondition((end0.x > graphMaxX), graphMinX, end0.y, 0, line, newLine, linesArray);
  clampOnCondition((end0.y > graphMaxY), end0.x, graphMinY, 1, line, newLine, linesArray);
  clampOnCondition((end0.x < graphMinX), graphMaxX, end0.y, 0, line, newLine, linesArray);
  clampOnCondition((end0.y < graphMinY), end0.x, graphMaxY, 1, line, newLine, linesArray);
}

function clamp(min, max, value) {
  var res = value;
  if(res < min) {
    res = min;
  }
  if(res > max) {
    res = max;
  }
  return res;

}

//this is to clear the lines (monster arms) when the user changes a parameter.
function addEventListenersToSlider(id) {
  document.getElementById(id).addEventListener('click', function() {
    runArmStretches = false;
    lines0 = [];
    lines1 = [];
    fireBtn.value = "Fire!";
  });

}

function setup() {
  var myCanvas = createCanvas(580, 480);
  //getFrameRate was giving back zero, so i just set sces per frame to be based on 60fps
  secsPerFrame = 1 / 60; 
  //load monter assets
  monImg0 = loadImage("assets/monsters/BlackNoArms.png");
  monImg1 = loadImage("assets/monsters/RedNoArms.png");
  //Add the canvas the the approptiate div
  myCanvas.parent('monster-stretch-graph');

  //get Fire button and attach action listener to it
  fireBtn = document.getElementById('monster-stretch-btn');
  fireBtn.addEventListener('click', function(){
    runArmStretches = !runArmStretches;
    if(runArmStretches) {
      fireBtn.value = "Stop";
    } else {
      fireBtn.value = "Fire!";
    }
    lines0 = [];
    lines1 = [];
  });

  addEventListenersToSlider('monster0-m-value');
  addEventListenersToSlider('monster0-b-value');
  addEventListenersToSlider('monster1-m-value');
  addEventListenersToSlider('monster1-b-value');
}

function draw() {

  // Get the values from the sliders (range between 0 and 100). We divide by 100 to get a fraction to times by the graph height. 
  var mValueMon0 = document.getElementById('monster0-m-value').value/100;
  var bValueMon0 = document.getElementById('monster0-b-value').value/100;
  var mValueMon1 = document.getElementById('monster1-m-value').value/100;
  var bValueMon1 = document.getElementById('monster1-b-value').value/100;

  //This value is between 0 and 100 originally
  var growthRate = 5*document.getElementById('monster-growth-factor').value;
  
  background(255);
  
  //Draw Graph X Y axis
  var minX = graphStartXPercent*width;
  var minY = graphStartYPercent*height;
  var graphWidth = graphDimXPercent*width;
  var graphHeight = graphDimYPercent*height;
  stroke(1);
  noFill();
  rect(minX, minY, graphWidth, graphHeight);
  //////

  //Calculate monsters positions
  var bottomOfGraphInY = (height - minY); 
  //the x value moves the monsters back off the graph line by half their width
  var monPos0 = {x: minX - (0.01*monImgScale*monImg0.width), y: bottomOfGraphInY - (bValueMon0*graphHeight)};
  var monPos1 = {x: minX - (0.01*monImgScale*monImg1.width), y: bottomOfGraphInY - (bValueMon1*graphHeight)};
  var rotMon0 = mValueMon0*Math.PI;
  var rotMon1 = mValueMon1*Math.PI;
  var lineRot0 = rotMon0;
  var lineRot1 = rotMon1;

  if(runArmStretches) {
    //if this is the first time we set the initial line to go from. 
    
    if(lines0.length === 0) {
      lines0.push({startX: minX, startY: monPos0.y, radians: lineRot0, size: 0.2*monImgScale*monImg0.width});
      lines1.push({startX: minX, startY: monPos1.y, radians: lineRot1, size: 0.2*monImgScale*monImg0.width});
    }
    /////
    
    //grow the latest line
    //we know it will have at least one thing because we set it just before if it is empty. 
    
    var l0 = lines0[lines0.length - 1];
    l0.size += secsPerFrame*growthRate; 
    var l1 = lines1[lines1.length - 1];
    l1.size += secsPerFrame*growthRate;
    //

    clampAndAddLine(l0, lines0, minX, minX + graphWidth, minY, minY + graphHeight, startingLength);
    clampAndAddLine(l1, lines1, minX, minX + graphWidth, minY, minY + graphHeight, startingLength);

    //Draw monster arms
    for(var i = 0; i < lines0.length; ++i) {
      var line = lines0[i];
      drawLine(line.startX, line.startY, line.size, line.radians, 0, 0, 0)  
    }
    for(var i = 0; i < lines1.length; ++i) {
      var line = lines1[i];
      drawLine(line.startX, line.startY, line.size, line.radians, 255, 0, 0)
    }
  }

  //Draw monsters on top (after arms so they are on top)
  drawImg(monImg0, rotMon0, monImgScale, monPos0.x, monPos0.y);
  drawImg(monImg1, rotMon1, monImgScale, monPos1.x, monPos1.y);

  
  
  

  if (mouseIsPressed) {
    fill(0);
  } else {
    fill(255);
  }
  //ellipse(mouseX, mouseY, 80, 80);
}