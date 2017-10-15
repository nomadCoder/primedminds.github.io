var graphDimXPercent = 0.8; //graph dim in X is 40% of canvas width
var graphDimYPercent = 0.8; //graph dim in Y is 80% of canvas width
var graphStartXPercent = 0.1; //graph starts in X at 50% of canvas width from left
var graphStartYPercent = 0.1; //graph starts in X at 10% of canvas width from __top__

var monImg0Stretched = {img: 0, scale: 0.1}; //image of black monster
var monImg1Stretched = {img: 0, scale: 0.1}; //image of red monster
var monImg0Relaxed = {img: 0, scale: 0.1}; //image of black monster
var monImg1Relaxed = {img: 0, scale: 0.2}; //image of red monster
var monImg0Arms = {img: 0, scale: 0.1}; //image of red monster
var monImg1Arms = {img: 0, scale: 0.1}; //image of red monster 

var collideSound;
var rollOffSound;

var monImgScale = 0.1; //image scale for the monsters

var runArmStretches = false;

var zoomScale = 1;
var preStretchZoom = 1;
//for lerping zoom
var zoomBegin = zoomScale;
var zoomEnd = zoomScale;
var tZoomAt = -1;

//All these parameters are used when the two monsters equal the same Y and are overlapping. 
//If this happens we make one monster move and roll off the other. 
var tYScale = -1;
var yStart = 0;
var yEnd = 0;
var parameterIndex;
var periodYScale = 0.1; // over 0.3 seconds
var rotStart = 0;
var rotEnd = 0;

var allowMonstersToOverlap = false;
/////////////

var originX;
var originY;

var middleX;
var middleY;
var graphHeight;
var graphWidth;

var lines;

var useTextValues; 

var secsPerFrame; //this is to grow the arms at a frame independent speed. 
var startingLength = 1; //starting length of arms before they grow

var fireBtn; //this is a dom object so we can add event listeners and change its value from fire! to stop

var growthRate = 500;

var worldUnitsToPixels;

var lastBValue0 = 0;
var lastBValue1 = 0;

var lerpValueToFitSlider = [false, false, false, false];

var parameters = [0, 2, 0, -2];

var tempParameters = [{fireBtn: null,  slider: null, index: 0, that: null, isNew: false}, 
                        {fireBtn: null,  slider: null, index: 0, that: null, isNew: false}, 
                        {fireBtn: null,  slider: null, index: 0, that: null, isNew: false}, 
                        {fireBtn: null,  slider: null, index: 0, that: null, isNew: false}];
var parametersValid = [true, true, true, true];

var mMon0Elm;
var bMon0Elm;
var mMon1Elm;
var bMon1Elm;

var mMon0ElmSl;
var bMon0ElmSl;
var mMon1ElmSl;
var bMon1ElmSl;

function alterMaxMinValue(elm, value, increment, index) {
  var beginPercent = (value - parseFloat(elm.min)) / (parseFloat(elm.max) - parseFloat(elm.min));
  value = parseFloat(value);

  //expand slider when you are at the edge of it - POSITIVE 
  var upperValue = value + increment + 1;
  if(value >= parseFloat(elm.max)) {
      elm.max = upperValue;
  }

  //retract slider so it doesn't stay really big when you go back in - POSITIVE
  var offset = 10;
  if((value) < parseFloat(elm.max) - offset) {
    //elm.max = parseFloat(elm.max) - offset - 1; 
    elm.max = upperValue;
  }

  //expand slider when you are at the edge of it - NEGATIVE 
  var lowerValue = value - increment;
  if(value <= parseFloat(elm.min)) {
      elm.min = lowerValue;
      
  }
  //retract slider so it doesn't stay really big when you go back in - NEGATIVE
  if((value) > parseFloat(elm.min) + offset) {
      //elm.min = parseFloat(elm.min) + offset - 1; 
      elm.min = lowerValue;

  }

  if(value >= 0) {
    elm.min = -1*parseFloat(elm.max);
  } else {
    elm.max = -1*parseFloat(elm.min);
  }
  
  //make more slider more specific between -10 and 10
  if(parseFloat(elm.value) > -10 && parseFloat(elm.value) < 10) {
    elm.step = 0.1;
  } else  {
    elm.step = 1;
  }

  if(elm.min > -10) {
    elm.min = -10
  }

  if(elm.max < 10) {
    elm.max = 10
  }

  var newValue = value;
  if (lerpValueToFitSlider[index]) {
    newValue = lerpLinear(parseFloat(elm.min), beginPercent, parseFloat(elm.max)); //find new value so the slider doesn't move position
    newValue = roundToNearestTenth(newValue)
  }
  return newValue;
}

function getYOnGraph(posInWorldY) {
    var posOnGraphY = (getTransZoomScale()*(posInWorldY - middleY)) + middleY;
    return posOnGraphY;
}

function GetScaleForYOnGraph(posOnGraphY, posInWorldY) {
  var res =  (posInWorldY - middleY) / (posOnGraphY - middleY);
  return res;
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

function drawImgSized(img, rot, sizeX, sizeY, posX, posY) {
  push();
  translate(posX, getYOnGraph(posY)); //where we want it on the sceen
  rotate(rot);
  translate(getTransZoomScale()*(-sizeX/2), getTransZoomScale()*(-sizeY/2)); //so it rotates around the center
  image(img, 0, 0, getTransZoomScale()*sizeX, getTransZoomScale()*sizeY);
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
  strokeWeight(clamp(0.7, 20, monImgScale*getTransZoomScale()*10));
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

function restartSettings(toggle, btnElm) {
  if(toggle) {
    runArmStretches = !runArmStretches;
  }

  lines = [];

  if(runArmStretches) {
    fireBtn.value = "Relax";
    preStretchZoom = zoomScale;
    btnElm.style.backgroundColor = '#ffe900';
    zoomBegin = zoomScale;
    zoomEnd = preStretchZoom;
    tZoomAt = 0;
  } else {
    fireBtn.value = "Stretch!";
    btnElm.style.backgroundColor = '#DC2222';
  }  
}

// function clampOnConditionWrapScreen(condition, newStX, newStY, index, previousLine, newLine, linesArray) {
//   if(condition) {
//     var lineInfo = {startX: newStX, startY: newStY, radians: previousLine.radians, size: startingLength, isGrowing: true};
//     if(newLine.obj !== null) {
//       //no need to push new line. we just ammend our previous new line. 
//       newLine.obj.startY = lineInfo[index];
//     } else {
//       linesArray.push(lineInfo);  
//       newLine.obj = linesArray[linesArray.length - 1];
//     }
//   }
// }

function conditionZoom(condition, YInWorld, offsetOnGraph) {
  if(!!condition && tZoomAt < 0) {
    tZoomAt = 0;
    
    zoomBegin = zoomScale;

    zoomEnd = GetScaleForYOnGraph(middleY + offsetOnGraph, YInWorld);

    if(zoomEnd < 1) {
      zoomEnd = 1;
    }
  }
}

function clampAndAddLine(ln, graphMinX, graphMaxX, graphMinY, graphMaxY) {
  var end0 = getEndPoint(ln, true);
  var newLine = { obj: null }; //act as a pointer to send down to funciton to modify. 
  //get Endpoint in world space
  var worldP = getEndPoint(ln, false);
  var yInWorld = worldP.y;
  var xInWorld = worldP.x;

  var offsetX = Math.sign(xInWorld - middleX) * 0.4 * graphWidth;
  var offsetY = Math.sign(yInWorld - middleY) * 0.4 * graphHeight;
  conditionZoom((end0.x > graphMaxX), xInWorld, offsetX);
  conditionZoom((end0.x < graphMinX), xInWorld, offsetX);
  conditionZoom((end0.y > graphMaxY), yInWorld, offsetY);
  conditionZoom((end0.y < graphMinY), yInWorld, offsetY);
}


function getLengthOfLine(ln, newEndP) {
  var xLen = newEndP.x - ln.startX;
  var yLen = newEndP.y - ln.startY;
  //pythagoras theorem
  var len = magnitude(xLen, yLen);
  return len;

}

function initiateInputValue(fireBtn, index, slider, that) {
  if(isFinite(parseInt(that.value))) {
    parametersValid[index] = true;
    preStretchZoom = zoomScale;
    restartSettings(false, fireBtn);
    parameters[index] = roundToNearestTenth(parseFloat(that.value));
    if(parameters[index] >= parseFloat(slider.max)) {
      slider.max = parameters[index] + 1;
      slider.min = -1*parseFloat(slider.max);
    }
    if(parameters[index] <= parseFloat(slider.min)) {
      slider.min = parameters[index] - 1;
      slider.max = -1*parseFloat(slider.min);
    }
  }
}

function addEventListenersToInput(id, fireBtn, index, sliderId) {
  var slider = document.getElementById(sliderId);
  document.getElementById(id).addEventListener('input', function() {
    lerpValueToFitSlider[index] = false;
    parametersValid[index] = false;
    //if(isFinite(parseInt(this.value))) {
      //initiateInputValue(fireBtn, index, slider, this);
      var temp = tempParameters[index];
      temp.isNew = true;
      temp.fireBtn = fireBtn;
      temp.slider = slider;
      temp.index = index;
      temp.that = this;
      
      // temp.value = roundToNearestTenth(parseFloat(this.value));
      // if(temp.value >= parseFloat(slider.max)) {
      //   temp.max = temp.value + 1;
      //   temp.min = -1*parseFloat(slider.max);
      // }
      // if(temp.value <= parseFloat(slider.min)) {
      //   temp.min = temp.value - 1;
      //   temp.max = -1*parseFloat(slider.min);
      // }
    // } else {
    //   parametersValid[index] = false;
    // }
  });

}
//this is to clear the lines (monster arms) when the user changes a parameter.
function addEventListenersToSlider(id, fireBtn, index) {
  document.getElementById(id).addEventListener('input', function() {
    preStretchZoom = zoomScale;
    restartSettings(false, fireBtn);
    parameters[index] = roundToNearestTenth(parseFloat(this.value));
    allowMonstersToOverlap = true;
    lerpValueToFitSlider[index] = true;
  });

  document.getElementById(id).addEventListener('change', function() {
    allowMonstersToOverlap = false;
    lerpValueToFitSlider[index] = false;
  });

}

function getInputValue(parameterIndex, defaultValue) {
  var result = defaultValue;
  if(parametersValid[parameterIndex]) {
    result = parameters[parameterIndex];
  }
  return result;
}

function setup() {
  var factor = 1.4;
  var myCanvas = createCanvas(factor*580, factor*480);
  //getFrameRate was giving back zero, so i just set sces per frame to be based on 60fps
  secsPerFrame = 1 / 60; 
  //load monter assets
  monImg0Relaxed.img = loadImage("assets/monsters/BlackStretch0.png");
  monImg1Relaxed.img = loadImage("assets/monsters/RedStretch0.png");

  monImg0Stretched.img = loadImage("assets/monsters/BlackNoArms.png");
  monImg1Stretched.img = loadImage("assets/monsters/RedNoArms.png");

  monImg0Arms.img = loadImage("assets/monsters/RedArms.png");
  monImg1Arms.img = loadImage("assets/monsters/OrangeArms.png");

  collideSound = loadSound('assets/Explosion3.wav');

  rollOffSound = loadSound('assets/rollOff.wav');
  //Add the canvas the the approptiate div
  myCanvas.parent('monster-stretch-graph');

  var halfGraphHeight = 0.5*graphDimYPercent*height;
  graphHeight = graphDimYPercent*height;
  graphWidth = graphDimXPercent*width;
  worldUnitsToPixels = halfGraphHeight / parseFloat(document.getElementById('monster0-b-value').max);

  //get Fire button and attach action listener to it
  fireBtn = document.getElementById('monster-stretch-btn');
  fireBtn.addEventListener('click', function(){
    restartSettings(true, this);
  });

  addEventListenersToInput('monster0-m-function-value', fireBtn, 0, 'monster0-m-value');
  addEventListenersToInput('monster0-b-function-value', fireBtn, 1, 'monster0-b-value');
  addEventListenersToInput('monster1-m-function-value', fireBtn, 2, 'monster1-m-value');
  addEventListenersToInput('monster1-b-function-value', fireBtn, 3, 'monster1-b-value');

  addEventListenersToSlider('monster0-m-value', fireBtn, 0);
  addEventListenersToSlider('monster0-b-value', fireBtn, 1);
  addEventListenersToSlider('monster1-m-value', fireBtn, 2);
  addEventListenersToSlider('monster1-b-value', fireBtn, 3);

  var submitElm = document.getElementById('submit-values');

  submitElm.addEventListener('submit', function(evt) {
    evt.preventDefault();
    for(var i = 0; i < tempParameters.length; ++i) {
      var temp = tempParameters[i];
      if(temp.isNew) {
          initiateInputValue(temp.fireBtn, temp.index, temp.slider, temp.that);
          temp.isNew = false;
          parametersValid[temp.index] = true;
      }
    }
    return false;
  });

  mMon0Elm = document.getElementById('monster0-m-function-value');
  bMon0Elm = document.getElementById('monster0-b-function-value');
  mMon1Elm = document.getElementById('monster1-m-function-value');
  bMon1Elm = document.getElementById('monster1-b-function-value');

  mMon0ElmSl = document.getElementById('monster0-m-value');
  bMon0ElmSl = document.getElementById('monster0-b-value');
  mMon1ElmSl = document.getElementById('monster1-m-value');
  bMon1ElmSl = document.getElementById('monster1-b-value');
}

function draw() {

  var minX = graphStartXPercent*width;
  var minY = graphStartYPercent*height;
  var maxX = minX + graphWidth;
  var maxY = minY + graphHeight;

  // Get the values from the sliders (range between 0 and 100). We divide by 100 to get a fraction to times by the graph height. 

  parameters[0] = alterMaxMinValue (mMon0ElmSl, parameters[0], 1, 0);
  parameters[1] = alterMaxMinValue (bMon0ElmSl, parameters[1], 1, 1);
  parameters[2] = alterMaxMinValue (mMon1ElmSl, parameters[2], 1, 2);
  parameters[3] = alterMaxMinValue (bMon1ElmSl, parameters[3], 1, 3);

  mMon0Elm.value = getInputValue(0, mMon0Elm.value);
  bMon0Elm.value = getInputValue(1, bMon0Elm.value);
  mMon1Elm.value = getInputValue(2, mMon1Elm.value);
  bMon1Elm.value = getInputValue(3, bMon1Elm.value);

  mMon0ElmSl.value = parameters[0];
  bMon0ElmSl.value = parameters[1];
  mMon1ElmSl.value = parameters[2];
  bMon1ElmSl.value = parameters[3];

  var mValueMon0 = parameters[0];
  var bValueMon0 = parameters[1];
  var mValueMon1 = parameters[2];
  var bValueMon1 = parameters[3];

  var tempRotation = 0;
  if(tYScale >= 0) {
    tYScale += secsPerFrame;
    parameters[parameterIndex] = lerpLinear(yStart, tYScale / periodYScale, yEnd);
    tempRotation = lerpLinear(rotStart, tYScale / periodYScale, rotEnd);
    if((tYScale / periodYScale) >= 1) {
      tYScale = -1;
      tempRotation = rotEnd;
      parameters[parameterIndex] = yEnd;
    }
  } else if(!allowMonstersToOverlap) {
    var incrementY = -1;
    if(bValueMon0 == bValueMon1) {
      rollOffSound.play();
      if(lastBValue0 === bValueMon0) {
        //bValueMon1 += Math.sign(bValueMon1)*incrementY; 
        //parameters[3] = bValueMon1;
        tYScale = 0;
        yStart = parameters[3];
        yEnd = bValueMon1 + Math.sign(bValueMon1)*incrementY; 
        parameterIndex = 3;
        rotationAt = -Math.atan2(mValueMon1, 1); 
        rotEnd = rotStart + 2*PI;
        monIndex = 1;
      } else if(lastBValue1 === bValueMon1) {
        // bValueMon0 += Math.sign(bValueMon0)*incrementY; 
        // parameters[1] = bValueMon0;
        tYScale = 0;
        yStart = parameters[1];
        yEnd = bValueMon0 + Math.sign(bValueMon0)*incrementY; 
        parameterIndex = 1;
        rotStart = -Math.atan2(mValueMon0, 1); 
        rotEnd = rotStart + 2*PI;
        monIndex = 0;
      } else {
        //alert("invalid case");
      }
    }
    lastBValue0 = bValueMon0;
    lastBValue1 = bValueMon1;

  }
  
  //we times by negative since the y-axis is flipped
  bValueMon0 = -bValueMon0 * worldUnitsToPixels;
  bValueMon1 = -bValueMon1 * worldUnitsToPixels;

  //This value is between 0 and 100 originally
  //var growthRate = 5*document.getElementById('monster-growth-factor').value;
  
  background(255);

  //Draw Graph X Y axis
  
  stroke(1);
  noFill();
  //Draw outline around graph
  //rect(minX, minY, graphWidth, graphHeight);

  middleX = minX + 0.5*graphWidth;
  middleY = minY+ 0.5*graphHeight;

  //these are globals that we use in the render functions to scale the graph. 
  originX = middleX;
  originY = middleY;


  //Y-Axis
  line(middleX, minY, middleX, maxY);
  //X-Axis
  line(minX, middleY, maxX, middleY);
  //////

  //the x value moves the monsters back off the graph line by half their width
  var monPos0 = {x: middleX, y: bValueMon0 + middleY};
  var monPos1 = {x: middleX, y: bValueMon1 + middleY};
  var rotMon0 = -Math.atan2(mValueMon0, 1); 
  var rotMon1 = -Math.atan2(mValueMon1, 1); 
  var lineRot0 = rotMon0;
  var lineRot1 = rotMon1;

  //This is us zoomin out and in
    var lerpPeriod = 0.2;//clamp(0, 0.2, (safeRatio1(1,  Math.abs(zoomEnd - zoomBegin))));
    if(tZoomAt >= 0) {
      tZoomAt += secsPerFrame;
      //console.log(zoomEnd);
      if((tZoomAt / lerpPeriod) > 1.0) {
        tZoomAt = lerpPeriod;
      }
      //lerp time

      zoomScale = lerpSineous01(zoomBegin, safeRatio0(tZoomAt, lerpPeriod), zoomEnd);
      if((tZoomAt/lerpPeriod) >= 1) {
        tZoomAt = -1;
      }
    }
  //
  var monImg0 = monImg0Relaxed;
  var monImg1 = monImg1Relaxed;
  if(runArmStretches) {
    //if this is the first time, we set the initial line to go from. 
    monImg0 = monImg0Stretched;
    monImg1 = monImg1Stretched;

    if(lines.length === 0) {

      var startLen = 0.2*monImgScale*monImg0.img.width;
      lines.push({startX: middleX, startY: monPos0.y, radians: lineRot0 + PI, size: startLen, isGrowing: true, r: 0, g: 0, b: 0, patnerId: 1, monImageIndex: 0});
      lines.push({startX: middleX, startY: monPos0.y, radians: lineRot0, size: startLen, isGrowing: true, r: 0, g: 0, b: 0, patnerId: 0, monImageIndex: 0});
      lines.push({startX: middleX, startY: monPos1.y, radians: lineRot1 + PI, size: startLen, isGrowing: true, r: 255, g: 0, b: 0, patnerId: 3, monImageIndex: 1});
      lines.push({startX: middleX, startY: monPos1.y, radians: lineRot1, size: startLen, isGrowing: true, r: 255, g: 0, b: 0, patnerId: 2, monImageIndex: 1});
    }
    /////
    
    //grow the latest line
    //we know it will have at least one thing because we set it just before if it is empty. 
    var lineIdsDrawn = [];
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
                  ln.size += t*growthThisFrame;
                  collideSound.play();
                  break;
                }
              }
            }
          }
        }

        clampAndAddLine(ln, minX, maxX, minY, maxY);
        if(lineIdsDrawn.indexOf(i) < 0) {
          var imgToDraw = monImg1Arms;
          if(ln.monImageIndex === 0) {
            imgToDraw = monImg0Arms;
          }
          drawImgSized(imgToDraw.img, ln.radians, 2*ln.size, imgToDraw.scale*imgToDraw.img.height, ln.startX, ln.startY);
        }
        //drawLine(ln.startX, getYOnGraph(ln.startY), ln.size, ln.radians, ln.r, ln.g, ln.b)  
        lineIdsDrawn.push(ln.patnerId);
      }
  } else { //not running simulation
    var mon0Y = getYOnGraph(monPos0.y);
    var mon1Y = getYOnGraph(monPos1.y);

    var largestYInWorld = bValueMon0;
    if(Math.abs(bValueMon0) < Math.abs(bValueMon1)) {
      largestYInWorld = bValueMon1;
    }
    var signOfLargestY = Math.sign(largestYInWorld);
    largestYInWorld += middleY;

    var halfGraphHeight = 0.5 * graphHeight;

    var innerBoundsOffset = 0.4 * halfGraphHeight; 
    var upperY = innerBoundsOffset;
    var lowerY = -innerBoundsOffset;
    var shouldZoomIn = bValueMon0 < upperY && bValueMon0 > lowerY && bValueMon1 < upperY && bValueMon1 > lowerY;
    conditionZoom(shouldZoomIn, largestYInWorld, signOfLargestY*innerBoundsOffset);

    if(!shouldZoomIn) {
      var shouldZoomOut = bValueMon0 > maxY || bValueMon0 < minY || bValueMon1 > maxY || bValueMon1 < minY;
      conditionZoom(shouldZoomOut, largestYInWorld, signOfLargestY*0.8*halfGraphHeight);
    }
    
  }

  if (tYScale >= 0) {
    if(monIndex === 0) {
      rotMon0 = tempRotation;
    } else {
      rotMon1 = tempRotation;
    }
  }
  //Draw monsters on top (after arms so they are on top)
  drawImg(monImg0.img, rotMon0, monImg0.scale, monPos0.x, monPos0.y);
  drawImg(monImg1.img, rotMon1, monImg1.scale, monPos1.x, monPos1.y);
}