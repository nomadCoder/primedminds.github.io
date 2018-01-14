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
  url: "https://s12.postimg.org/rwtr6d6yl/R1214.png",
  height: 180,
  width: 300,
})
var r1222 = new Image({
  url: "https://s18.postimg.org/rd5c0c7op/R1222.png",
  height: 180,
  width: 300,
})
var r1233 = new Image({
  url: "https://s24.postimg.org/4rvwwb6tx/R1233.png",
  height: 180,
  width: 300,
})
var r1276 = new Image({
  url: "https://s27.postimg.org/ldn3755v7/R1276.png",
  height: 180,
  width: 300,
})
var r1285 = new Image({
  url: "https://s7.postimg.org/ni6uq4eln/R1285.png",
  height: 180,
  width: 300,
})
var onetwo = [r1214, r1222, r1233, r1276, r1285]
var onetwotext = ["r1214", "r1222", "r1233", "r1276", "r1285"]
controlarrays(onetwo)

var r1318 = new Image({
  url: "https://s2.postimg.org/not7qcey1/R1318.png",
  height: 180,
  width: 300,
})
var r1327 = new Image({
  url: "https://s23.postimg.org/5imsewl23/R1327.png",
  height: 180,
  width: 300,
})
var r1335 = new Image({
  url: "https://s8.postimg.org/zcieqqlwl/R1335.png",
  height: 180,
  width: 300,
})
var r1344 = new Image({
  url: "https://s30.postimg.org/euklpbhr5/R1344.png",
  height: 180,
  width: 300,
})
var r1356 = new Image({
  url: "https://s22.postimg.org/8p0p3n1f5/R1356.png",
  height: 180,
  width: 300,
})
var onethree = [r1318, r1327, r1335, r1344, r1356]
var onethreetext = ["r1318", "r1327", "r1335", "r1344", "r1356"]
controlarrays(onethree)

var r1424 = new Image({
  url: "https://s15.postimg.org/781ua314b/R1424.png",
  height: 180,
  width: 300,
})
var r1446 = new Image({
  url: "https://s13.postimg.org/7z0q8oddj/R1446.png",
  height: 180,
  width: 300,
})
var r1458 = new Image({
  url: "https://s4.postimg.org/n3aw55igd/R1458.png",
  height: 180,
  width: 300,
})
var r1467 = new Image({
  url: "https://s24.postimg.org/4yxm9rwd1/R1467.png",
  height: 180,
  width: 300,
})
var r1485 = new Image({
  url: "https://s23.postimg.org/b313ifosr/R1485.png",
  height: 180,
  width: 300,
})
var onefour = [r1424, r1446, r1458, r1467, r1485]
var onefourtext = ["r1424", "r1446", "r1458", "r1467", "r1485"]
controlarrays(onefour)

var r1515 = new Image({
  url: "https://s18.postimg.org/cp6ib4vfd/R1515.png",
  height: 180,
  width: 300,
})
var r1526 = new Image({
  url: "https://s13.postimg.org/y7macsx7r/R1526.png",
  height: 180,
  width: 300,
})
var r1537 = new Image({
  url: "https://s10.postimg.org/c4vgh2cix/R1537.png",
  height: 180,
  width: 300,
})
var r1571 = new Image({
  url: "https://s15.postimg.org/69i64zdwr/R1571.png",
  height: 180,
  width: 300,
})
var onefive = [r1515, r1526, r1537, r1571]
var onefivetext = ["r1515", "r1526", "r1537", "r1571"]
controlarrays(onefive)

var r1665 = new Image({
  url: "https://s2.postimg.org/4w1xxfc7d/R1665.png",
  height: 180,
  width: 300,
})
var r1687 = new Image({
  url: "https://s3.postimg.org/qju0ul00j/R1687.png",
  height: 180,
  width: 300,
})
var onesix = [r1665, r1687]
var onesixtext = ["r1665", "r1687"]
controlarrays(onesix)

var r2348 = new Image({
  url: "https://s29.postimg.org/i8xmx3pif/R2348.png",
  height: 180,
  width: 300,
})
var r2351 = new Image({
  url: "https://s13.postimg.org/5qvjw9md3/R2351.png",
  height: 180,
  width: 300,
})
var r2358 = new Image({
  url: "https://s4.postimg.org/wpstse9cd/R2358.png",
  height: 180,
  width: 300,
})
var r2367 = new Image({
  url: "https://s21.postimg.org/apoixlu13/R2367.png",
  height: 180,
  width: 300,
})
var r2376 = new Image({
  url: "https://s22.postimg.org/q6e4idyjl/R2376.png",
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
var twofour = [r2436]
var twofourtext = ["r2436"]
controlarrays(twofour)

var r2526 = new Image({
  url: "http://www.primedminds.com/assets/umbrellas/R2526.png",
  height: 180,
  width: 300,
})
var twofive = [r2526]
var twofivetext = ["r2526"]
controlarrays(twofive)

var r2612 = new Image({
  url: "http://www.primedminds.com/assets/umbrellas/R2612.png",
  height: 180,
  width: 300,
})
var twosix = [r2612]
var twosixtext = ["r2612"]
controlarrays(twosix)

var r3418 = new Image({
  url: "http://www.primedminds.com/assets/umbrellas/R3418.png",
  height: 180,
  width: 300,
})
var threefour = [r3418]
var threefourtext = ["r3418"]
controlarrays(threefour)

var r3523 = new Image({
  url: "http://www.primedminds.com/assets/umbrellas/R3523.png",
  height: 180,
  width: 300,
})
var threefive = [r3523]
var threefivetext = ["r3523"]
controlarrays(threefive)

var r3613 = new Image({
  url: "http://www.primedminds.com/assets/umbrellas/R3613.png",
  height: 180,
  width: 300,
})
var threesix = [r3613]
var threesixtext = ["r3613"]
controlarrays(threesix)

var r4521 = new Image({
  url: "http://www.primedminds.com/assets/umbrellas/R4521.png",
  height: 180,
  width: 300,
})
var fourfive = [r4521]
var fourfivetext = ["r4521"]
controlarrays(fourfive)

var r4618 = new Image({
  url: "http://www.primedminds.com/assets/umbrellas/R4618.png",
  height: 180,
  width: 300,
})
var foursix = [r4618]
var foursixtext = ["r4618"]
controlarrays(foursix)

var r5614 = new Image({
  url: "http://www.primedminds.com/assets/umbrellas/R5614.png",
  height: 180,
  width: 300,
})
var fivesix = [r5614]
var fivesixtext = ["r5614"]
controlarrays(fivesix)
