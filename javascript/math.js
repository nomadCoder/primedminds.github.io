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

function roundToNearestTenth(value) {
  var res = Math.round(value * 100) / 100; //round value to nearst tenth
  return res;
}