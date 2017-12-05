function safeRatio1(top, bottom) {
  var res = 1;
  if(bottom !== 0) {
    res = top / bottom;
  }
  return res;

}

function safeRatio0(top, bottom) {
  var res = 0;
  if(bottom !== 0) {
    res = top / bottom;
  }
  return res;

}

function magnitude(x, y) {
  var len = Math.sqrt(x*x + y*y);
  return len;
}

function lerpLinear(A, t, B) {
  var res = A + t*(B - A);
  return res;
}

function lerpSineous01(A, t, B) {
  var tValue = Math.sin(t*PI/2);
  var res = A + tValue*(B - A);
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

function signOf(value) {
  var result = Math.sign(value);
  if(result === 0) {
    result = 1;
  }
  return result;
}

//the start and end are x y vectors for the two lines. 
function intersect(start, end, testStart, testEnd, lengthOfTestLine) {
  var result = {tValue: 0, hit: false};
  var thisLine = relativeVec(testEnd, testStart);
  var thisLineNormal = normalize(thisLine);
  var thisLineNormalPerp = perpClockwise(thisLineNormal);

  //
  var relP1 = relativeVec(start, testStart);
  var relP2 = relativeVec(end, testStart);
  var v1 = {x: dot(relP1, thisLineNormalPerp), y: dot(relP1, thisLineNormal)};
  var v2 = {x: dot(relP2, thisLineNormalPerp), y: dot(relP2, thisLineNormal)};

  var t = v1.x / (v1.x - v2.x);
  result.tValue = t;
  if(t > 0.0 && t < 1.0) {
    var yTest = lerpLinear(v1.y, t, v2.y);
    if(yTest > 0.0 && yTest < lengthOfTestLine) {
      result.hit = true;
    }
  }
  return result;
}

function roundToNearestTenth(value) {
  var res = Math.round(value * 100) / 100; //round value to nearst tenth
  return res;
}