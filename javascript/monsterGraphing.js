var graphDimXPercent = 0.99; //graph dim in X is 40% of canvas width
var graphDimYPercent = 0.99; //graph dim in Y is 80% of canvas width
var graphStartXPercent = 0.0; //graph starts in X at 50% of canvas width from left
var graphStartYPercent = 0.0; //graph starts in X at 10% of canvas width from __top__

var monImg0; //image of black monster
var monImg1; //image of red monster
var collideSound;

var monImgScale = 0.4; //image scale for the monsters

var runArmStretches = false;

var zoomScale = 1;
//for lerping zoom
var zoomBegin = zoomScale;
var zoomEnd = zoomScale;
var tZoomAt = -1;

var originX;
var originY;

var middleY;

var lines;

var secsPerFrame; //this is to grow the arms at a frame independent speed. 
var startingLength = 1; //starting length of arms before they grow

var fireBtn; //this is a dom object so we can add event listeners and change its value from fire! to stop

var growthRate = 500;

function getYOnGraph(posY) {
    return (getTransZoomScale()*(posY - middleY)) + middleY;
}

//This funciton draws our sprites with a rotation around the center of the image. 
function drawImg(img, rot, scale, posX, posY) {
  push();
  translate(posX, getYOnGraph(posY)); //where we want it on the sceen
  rotate(rot);
  translate(getTransZoomScale()*scale*(-img.width/2), getTransZoomScale()*scale*(-img.height/2)); //so it rotates around the center
  image(img, 0, 0, getTransZoomScale()*scale*img.width, getTransZoomScale()*scale*img.height);
  pop();

}

function getTransZoomScale() {
  var res = 1 / zoomScale;

  return res;

}

function drawLine(startPosX, startPosY, length, rot, colorR, colorG, colorB) {
  push();
  translate(startPosX, startPosY); //where we want it on the sceen
  rotate(rot);
  stroke(colorR, colorG, colorB);
  strokeWeight(clamp(0.7, 20, getTransZoomScale()*10));
  line(0, 0, getTransZoomScale()*length, 0);
  pop();
}

//we need this function since we store the direction not the endpoint, so we use cos/sin to work out the end point
function getEndPoint(ln, withZoom = true) {
  var res = {x: 0, y: 0};
  var x = ln.size*Math.cos(ln.radians)
  var y = ln.size*Math.sin(ln.radians)
  var startY = ln.startY;
  if(withZoom) {
    var scale = getTransZoomScale();
    x *= scale;
    y *= scale;
    startY = getYOnGraph(startY);
  }

  res.x = ln.startX + x;
  res.y = startY + y;
  
  return res;
}

function restartSettings() {
  runArmStretches = false;
  lines = [];
  fireBtn.value = "Fire!";
  zoomScale = 1;
  tZoomAt = -1;
  zoomEnd = zoomBegin = zoomScale;
}

function clampOnConditionWrapScreen(condition, newStX, newStY, index, previousLine, newLine, linesArray) {
  if(condition) {
    var lineInfo = {startX: newStX, startY: newStY, radians: previousLine.radians, size: startingLength, isGrowing: true};
    if(newLine.obj !== null) {
      //no need to push new line. we just ammend our previous new line. 
      newLine.obj.startY = lineInfo[index];
    } else {
      linesArray.push(lineInfo);  
      newLine.obj = linesArray[linesArray.length - 1];
    }
  }
}

//This is where we zoom out. 
function clampOnConditionZoomOut(condition ) {
  if(condition && tZoomAt < 0) {
    zoomEnd = zoomScale + (secsPerFrame*(growthRate*0.2));
    zoomBegin = zoomScale;
    tZoomAt = 0;
  }
}

function clampAndAddLine(ln, graphMinX, graphMaxX, graphMinY, graphMaxY) {

  var end0 = getEndPoint(ln, true);
  var newLine = { obj: null }; //act as a pointer to send down to funciton to modify. 
  clampOnConditionZoomOut((end0.x > graphMaxX));
  clampOnConditionZoomOut((end0.y > graphMaxY));
  clampOnConditionZoomOut((end0.x < graphMinX));
  clampOnConditionZoomOut((end0.y < graphMinY));
}


function getLengthOfLine(ln, newEndP) {
  var xLen = newEndP.x - ln.startX;
  var yLen = newEndP.y - ln.startY;
  //pythagoras theorem
  var len = magnitude(xLen, yLen);
  return len;

}

function magnitude(x, y) {
  var len = Math.sqrt(x*x + y*y);
  return len;
}

function lerpLinear(A, t, B) {
  var res = A + t*(B - A);
  return res;

}

function dot(v1, v2) {
  return (v1.x*v2.x + v1.y*v2.y);
}

function perpClockwise(v1) {
  return {x: v1.y, y: -v1.x};
}

function perpAntiClockwise(v1) {
  return {x: -v1.y, y: v1.x};
}

function normalize(res) { 
    var len = magnitude(res.x, res.y);
    res.x /= len;
    res.y /= len;
    return res;
}
function relativeVec(v1, v2) {
  var res = {x: v1.x - v2.x, y: v1.y - v2.y};
  return res;
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
    restartSettings();
  });

}

function setup() {
  var myCanvas = createCanvas(580, 480);
  //getFrameRate was giving back zero, so i just set sces per frame to be based on 60fps
  secsPerFrame = 1 / 60; 
  //load monter assets
  monImg0 = loadImage("assets/monsters/BlackNoArms.png");
  monImg1 = loadImage("assets/monsters/RedNoArms.png");
  collideSound = loadSound('assets/Explosion3.wav');
  //Add the canvas the the approptiate div
  myCanvas.parent('monster-stretch-graph');

  //get Fire button and attach action listener to it
  fireBtn = document.getElementById('monster-stretch-btn');
  fireBtn.addEventListener('click', function(){
    var tempRunArmStretches = !runArmStretches;
    restartSettings();
    runArmStretches = tempRunArmStretches;
    if(runArmStretches) {
      fireBtn.value = "Stop";
    } else {
      fireBtn.value = "Fire!";
    }
  });

  addEventListenersToSlider('monster0-m-value');
  addEventListenersToSlider('monster0-b-value');
  addEventListenersToSlider('monster1-m-value');
  addEventListenersToSlider('monster1-b-value');
}



function draw() {

  // Get the values from the sliders (range between 0 and 100). We divide by 100 to get a fraction to times by the graph height. 
  var mValueMon0 = document.getElementById('monster0-m-value').value;
  var bValueMon0 = document.getElementById('monster0-b-value').value;
  var mValueMon1 = document.getElementById('monster1-m-value').value;
  var bValueMon1 = document.getElementById('monster1-b-value').value;

  document.getElementById('monster0-m-function-value').innerHTML = mValueMon0;
  document.getElementById('monster0-b-function-value').innerHTML = bValueMon0;
  document.getElementById('monster1-m-function-value').innerHTML = mValueMon1;
  document.getElementById('monster1-b-function-value').innerHTML = bValueMon1;

  bValueMon0 = (bValueMon0 / 100) + 0.5;
  bValueMon1 = (bValueMon1 / 100) + 0.5;
  mValueMon0 = (mValueMon0 / 10);
  mValueMon1 = (mValueMon1 / 10);

  //This value is between 0 and 100 originally
  //var growthRate = 5*document.getElementById('monster-growth-factor').value;
  
  background(255);

  //Draw Graph X Y axis
  var minX = graphStartXPercent*width;
  var minY = graphStartYPercent*height;
  var graphWidth = graphDimXPercent*width;
  var graphHeight = graphDimYPercent*height;
  var maxX = minX + graphWidth;
  var maxY = minY + graphHeight;
  stroke(1);
  noFill();
  rect(minX, minY, graphWidth, graphHeight);

  var middleX = minX + 0.5*graphWidth;
  middleY = minY+ 0.5*graphHeight;

  //these are globals that we use in the render functions to scale the graph. 
  originX = middleX;
  originY = middleY;


  //Y-Axis
  line(middleX, minY, middleX, maxY);
  //X-Axis
  line(minX, middleY, maxX, middleY);
  //////

  //Calculate monsters positions
  var bottomOfGraphInY = (height - minY); 
  //the x value moves the monsters back off the graph line by half their width
  
  var monPos0 = {x: middleX, y: bottomOfGraphInY - (bValueMon0*graphHeight)};
  var monPos1 = {x: middleX, y: bottomOfGraphInY - (bValueMon1*graphHeight)};
  //can only rotate 45 degrees up and 45 degrees down
  var halfRange = Math.PI/4; 
  var rotMon0 = -mValueMon0*halfRange;
  var rotMon1 = -mValueMon1*halfRange;
  var lineRot0 = rotMon0;
  var lineRot1 = rotMon1;

  if(runArmStretches) {
    //if this is the first time, we set the initial line to go from. 
    
    if(lines.length === 0) {
      var startLen = 0.2*monImgScale*monImg0.width;
      lines.push({startX: middleX, startY: monPos0.y, radians: lineRot0 + PI, size: startLen, isGrowing: true, r: 0, g: 0, b: 0, patnerId: 1});
      lines.push({startX: middleX, startY: monPos0.y, radians: lineRot0, size: startLen, isGrowing: true, r: 0, g: 0, b: 0, patnerId: 0});
      lines.push({startX: middleX, startY: monPos1.y, radians: lineRot1 + PI, size: startLen, isGrowing: true, r: 255, g: 0, b: 0, patnerId: 3});
      lines.push({startX: middleX, startY: monPos1.y, radians: lineRot1, size: startLen, isGrowing: true, r: 255, g: 0, b: 0, patnerId: 2});
    }
    /////
    
    var lerpPeriod = 0.4;
    if(tZoomAt >= 0) {
      tZoomAt += secsPerFrame;
      //lerp time

      zoomScale = lerpLinear(zoomBegin, tZoomAt/lerpPeriod, zoomEnd);
      if((tZoomAt/lerpPeriod) > 1) {
        tZoomAt = -1;
      }

    }
    //grow the latest line
    //we know it will have at least one thing because we set it just before if it is empty. 
    for(var i = 0; i < lines.length; ++i) {
        var ln = lines[i];

        if(ln.isGrowing) {
          var growthThisFrame = secsPerFrame*growthRate;
          ln.size += growthThisFrame; 
          for(var j = 0; j < lines.length; ++j) {
            var lnTest = lines[j];
            if(j != i)  {
              //test vector
              var testEnd = getEndPoint(lnTest, false);
              var testStart = {x: lnTest.startX, y: lnTest.startY};
              var thisLine = relativeVec(testEnd, testStart);
              var thisLineNormal = normalize(thisLine);
              var thisLineNormalPerp = perpClockwise(thisLineNormal);

              //
              var relP1 = relativeVec({x: ln.startX, y: ln.startY}, testStart);
              var endP = getEndPoint(ln, false);
              var relP2 = relativeVec(endP, testStart);
              var v1 = {x: dot(relP1, thisLineNormalPerp), y: dot(relP1, thisLineNormal)};
              var v2 = {x: dot(relP2, thisLineNormalPerp), y: dot(relP2, thisLineNormal)};

              var t = v1.x / (v1.x - v2.x);
              if(t > 0.0 && t < 1.0) {
                var yTest = lerpLinear(v1.y, t, v2.y);
                if(yTest > 0.0 && yTest < lnTest.size) {
                  ln.isGrowing = false;
                  lines[ln.patnerId].isGrowing = false;
                  lnTest.isGrowing = false;
                  lines[lnTest.patnerId].isGrowing = false;
                  ln.size -= growthThisFrame; 
                  collideSound.play();
                  break;
                }
              }
            }
          }
        }
        clampAndAddLine(ln, minX, maxX, minY, maxY);

        drawLine(ln.startX, getYOnGraph(ln.startY), ln.size, ln.radians, ln.r, ln.g, ln.b)  
      }
  }

  //Draw monsters on top (after arms so they are on top)
  drawImg(monImg0, rotMon0, monImgScale, monPos0.x, monPos0.y);
  drawImg(monImg1, rotMon1, monImgScale, monPos1.x, monPos1.y);
}