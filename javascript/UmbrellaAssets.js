var umbrellas = new Image({
  url: "http://www.primedminds.com/assets/umbrellas/Umbrellas.png",
  height: 180,
  width: 300,
})
//groups ropes by connected umbrellas
var controlarrays = (input1) => {
  input1.forEach(thing => {
    thing.hide()
  })
}
  //make umbrellas clickable
var umbtwo = new Rectangle({
  x: -70,
  y: 50,
  height: 60,
  width: 60,
  brightness: 0
})
var umbfour = new Rectangle({
  x: 15,
  y: 25,
  height: 60,
  width: 60,
  brightness: 0
})
var umbsix = new Rectangle({
  x: 110,
  y: 50,
  height: 60,
  width: 60,
  brightness: 0
})
var umbone = new Rectangle({
  x: -100,
  y: -30,
  height: 60,
  width: 60,
  brightness: 0
})
var umbthree = new Rectangle({
  x: -20,
  y: -50,
  height: 60,
  width: 60,
  brightness: 0
})
var umbfive = new Rectangle({
  x: 85,
  y: -30,
  height: 60,
  width: 60,
  brightness: 0
})

//creates arrays to keep track of which umbrellas are connected
var one = []
var two = []
var three = []
var four = []
var five = []
var six = []


//ropes
var r1214 = new Image({
  url: "http://www.primedminds.com/assets/umbrellas/R1214.png",
  height: 180,
  width: 300,
})
var r1222 = new Image({
  url: "http://www.primedminds.com/assets/umbrellas/R1222.png",
  height: 180,
  width: 300,
})
var r1233 = new Image({
  url: "http://www.primedminds.com/assets/umbrellas/R1233.png",
  height: 180,
  width: 300,
})
var r1276 = new Image({
  url: "http://www.primedminds.com/assets/umbrellas/R1276.png",
  height: 180,
  width: 300,
})
var r1285 = new Image({
  url: "http://www.primedminds.com/assets/umbrellas/R1285.png",
  height: 180,
  width: 300,
})
var onetwo = [r1214, r1222, r1233, r1276, r1285]
var onetwotext = ["r1214", "r1222", "r1233", "r1276", "r1285"]
controlarrays(onetwo)

var r1318 = new Image({
  url: "http://www.primedminds.com/assets/umbrellas/R1318.png",
  height: 180,
  width: 300,
})
var r1327 = new Image({
  url: "http://www.primedminds.com/assets/umbrellas/R1327.png",
  height: 180,
  width: 300,
})
var r1335 = new Image({
  url: "http://www.primedminds.com/assets/umbrellas/R1335.png",
  height: 180,
  width: 300,
})
var r1344 = new Image({
  url: "http://www.primedminds.com/assets/umbrellas/R1344.png",
  height: 180,
  width: 300,
})
var r1356 = new Image({
  url: "http://www.primedminds.com/assets/umbrellas/R1356.png",
  height: 180,
  width: 300,
})
var onethree = [r1318, r1327, r1335, r1344, r1356]
var onethreetext = ["r1318", "r1327", "r1335", "r1344", "r1356"]
controlarrays(onethree)

var r1424 = new Image({
  url: "http://www.primedminds.com/assets/umbrellas/R1424.png",
  height: 180,
  width: 300,
})
var r1446 = new Image({
  url: "http://www.primedminds.com/assets/umbrellas/R1446.png",
  height: 180,
  width: 300,
})
var r1458 = new Image({
  url: "http://www.primedminds.com/assets/umbrellas/R1458.png",
  height: 180,
  width: 300,
})
var r1467 = new Image({
  url: "http://www.primedminds.com/assets/umbrellas/R1467.png",
  height: 180,
  width: 300,
})
var r1485 = new Image({
  url: "http://www.primedminds.com/assets/umbrellas/R1485.png",
  height: 180,
  width: 300,
})
var onefour = [r1424, r1446, r1458, r1467, r1485]
var onefourtext = ["r1424", "r1446", "r1458", "r1467", "r1485"]
controlarrays(onefour)

var r1515 = new Image({
  url: "http://www.primedminds.com/assets/umbrellas/R1515.png",
  height: 180,
  width: 300,
})
var r1526 = new Image({
  url: "http://www.primedminds.com/assets/umbrellas/R1526.png",
  height: 180,
  width: 300,
})
var r1537 = new Image({
  url: "http://www.primedminds.com/assets/umbrellas/R1537.png",
  height: 180,
  width: 300,
})
var r1571 = new Image({
  url: "http://www.primedminds.com/assets/umbrellas/R1571.png",
  height: 180,
  width: 300,
})
var onefive = [r1515, r1526, r1537, r1571]
var onefivetext = ["r1515", "r1526", "r1537", "r1571"]
controlarrays(onefive)

var r1665 = new Image({
  url: "http://www.primedminds.com/assets/umbrellas/R1665.png",
  height: 180,
  width: 300,
})
var r1687 = new Image({
  url: "http://www.primedminds.com/assets/umbrellas/R1687.png",
  height: 180,
  width: 300,
})
var onesix = [r1665, r1687]
var onesixtext = ["r1665", "r1687"]
controlarrays(onesix)

var r2348 = new Image({
  url: "http://www.primedminds.com/assets/umbrellas/R2348.png",
  height: 180,
  width: 300,
})
var r2351 = new Image({
  url: "http://www.primedminds.com/assets/umbrellas/R2351.png",
  height: 180,
  width: 300,
})
var r2358 = new Image({
  url: "http://www.primedminds.com/assets/umbrellas/R2358.png",
  height: 180,
  width: 300,
})
var r2367 = new Image({
  url: "http://www.primedminds.com/assets/umbrellas/R2367.png",
  height: 180,
  width: 300,
})
var r2376 = new Image({
  url: "http://www.primedminds.com/assets/umbrellas/R2376.png",
  height: 180,
  width: 300,
})
var twothree = [r2348, r2351, r2358, r2367, r2376]
var twothreetext = ["r2348", "r2351", "r2358", "r2367", "r2376"]
controlarrays(twothree)

var r2436 = new Image({
  url: "http://www.primedminds.com/assets/umbrellas/R2436.png",
  height: 180,
  width: 300,
})
var r2441 = new Image({
  url: "http://www.primedminds.com/assets/umbrellas/R2441.png",
  height: 180,
  width: 300,
})
var r2478 = new Image({
  url: "http://www.primedminds.com/assets/umbrellas/R2478.png",
  height: 180,
  width: 300,
})
var r2487 = new Image({
  url: "http://www.primedminds.com/assets/umbrellas/R2487.png",
  height: 180,
  width: 300,
})
var twofour = [r2436, r2441, r2478, r2487]
var twofourtext = ["r2436", "r2441", "r2478", "r2487"]
controlarrays(twofour)

var r2526 = new Image({
  url: "http://www.primedminds.com/assets/umbrellas/R2526.png",
  height: 180,
  width: 300,
})
var r2537 = new Image({
  url: "http://www.primedminds.com/assets/umbrellas/R2537.png",
  height: 180,
  width: 300,
})
var r2567 = new Image({
  url: "http://www.primedminds.com/assets/umbrellas/R2567.png",
  height: 180,
  width: 300,
})
var twofive = [r2526, r2537, r2567]
var twofivetext = ["r2526", "r2537", "r2567"]
controlarrays(twofive)

var r2612 = new Image({
  url: "http://www.primedminds.com/assets/umbrellas/R2612.png",
  height: 180,
  width: 300,
})
var r2666 = new Image({
  url: "http://www.primedminds.com/assets/umbrellas/R2666.png",
  height: 180,
  width: 300,
})
var r2678 = new Image({
  url: "http://www.primedminds.com/assets/umbrellas/R2678.png",
  height: 180,
  width: 300,
})
var r2681 = new Image({
  url: "http://www.primedminds.com/assets/umbrellas/R2681.png",
  height: 180,
  width: 300,
})
var twosix = [r2612, r2666, r2678, r2681]
var twosixtext = ["r2612", "r2666", "r2678", "r2681"]
controlarrays(twosix)

var r3418 = new Image({
  url: "http://www.primedminds.com/assets/umbrellas/R3418.png",
  height: 180,
  width: 300,
})
var r3423 = new Image({
  url: "http://www.primedminds.com/assets/umbrellas/R3423.png",
  height: 180,
  width: 300,
})
var r3424 = new Image({
  url: "http://www.primedminds.com/assets/umbrellas/R3424.png",
  height: 180,
  width: 300,
})
var r3445 = new Image({
  url: "http://www.primedminds.com/assets/umbrellas/R3445.png",
  height: 180,
  width: 300,
})
var r3476 = new Image({
  url: "http://www.primedminds.com/assets/umbrellas/R3476.png",
  height: 180,
  width: 300,
})
var threefour = [r3418, r3423, r3424, r3445, r3476]
var threefourtext = ["r3418", "r3423", "r3424", "r3445", "r3476"]
controlarrays(threefour)

var r3523 = new Image({
  url: "http://www.primedminds.com/assets/umbrellas/R3523.png",
  height: 180,
  width: 300,
})
var r3534 = new Image({
  url: "http://www.primedminds.com/assets/umbrellas/R3534.png",
  height: 180,
  width: 300,
})
var r3555 = new Image({
  url: "http://www.primedminds.com/assets/umbrellas/R3555.png",
  height: 180,
  width: 300,
})
var r3562 = new Image({
  url: "http://www.primedminds.com/assets/umbrellas/R3562.png",
  height: 180,
  width: 300,
})
var threefive = [r3523, r3534, r3555, r3562]
var threefivetext = ["r3523", "r3534", "r3555", "r3562"]
controlarrays(threefive)

var r3613 = new Image({
  url: "http://www.primedminds.com/assets/umbrellas/R3613.png",
  height: 180,
  width: 300,
})
var r3624 = new Image({
  url: "http://www.primedminds.com/assets/umbrellas/R3624.png",
  height: 180,
  width: 300,
})
var r3632 = new Image({
  url: "http://www.primedminds.com/assets/umbrellas/R3632.png",
  height: 180,
  width: 300,
})
var r3688 = new Image({
  url: "http://www.primedminds.com/assets/umbrellas/R3688.png",
  height: 180,
  width: 300,
})
var threesix = [r3613, r3624, r3632, r3688]
var threesixtext = ["r3613", "r3624", "r3632", "r3688"]
controlarrays(threesix)

var r4521 = new Image({
  url: "http://www.primedminds.com/assets/umbrellas/R4521.png",
  height: 180,
  width: 300,
})
var r4528 = new Image({
  url: "http://www.primedminds.com/assets/umbrellas/R4528.png",
  height: 180,
  width: 300,
})
var r4536 = new Image({
  url: "http://www.primedminds.com/assets/umbrellas/R4536.png",
  height: 180,
  width: 300,
})
var r4547 = new Image({
  url: "http://www.primedminds.com/assets/umbrellas/R4547.png",
  height: 180,
  width: 300,
})
var fourfive = [r4521, r4528, r4536, r4547]
var fourfivetext = ["r4521", "r4528", "r4536", "r4547"]
controlarrays(fourfive)

var r4618 = new Image({
  url: "http://www.primedminds.com/assets/umbrellas/R4618.png",
  height: 180,
  width: 300,
})
var r4626 = new Image({
  url: "http://www.primedminds.com/assets/umbrellas/R4626.png",
  height: 180,
  width: 300,
})
var r4633 = new Image({
  url: "http://www.primedminds.com/assets/umbrellas/R4633.png",
  height: 180,
  width: 300,
})
var r4681 = new Image({
  url: "http://www.primedminds.com/assets/umbrellas/R4681.png",
  height: 180,
  width: 300,
})
var r4688 = new Image({
  url: "http://www.primedminds.com/assets/umbrellas/R4688.png",
  height: 180,
  width: 300,
})
var foursix = [r4618, r4626, r4633, r4681, r4688]
var foursixtext = ["r4618", "r4626", "r4633", "r4681", "r4688"]
controlarrays(foursix)

var r5614 = new Image({
  url: "http://www.primedminds.com/assets/umbrellas/R5614.png",
  height: 180,
  width: 300,
})
var r5623 = new Image({
  url: "http://www.primedminds.com/assets/umbrellas/R5623.png",
  height: 180,
  width: 300,
})
var r5666 = new Image({
  url: "http://www.primedminds.com/assets/umbrellas/R5666.png",
  height: 180,
  width: 300,
})
var r5677 = new Image({
  url: "http://www.primedminds.com/assets/umbrellas/R5677.png",
  height: 180,
  width: 300,
})
var r5685 = new Image({
  url: "http://www.primedminds.com/assets/umbrellas/R5685.png",
  height: 180,
  width: 300,
})
var fivesix = [r5614, r5623, r5666, r5677, r5685]
var fivesixtext = ["r5614", "r5623", "r5666", "r5677", "r5685"]
controlarrays(fivesix)
