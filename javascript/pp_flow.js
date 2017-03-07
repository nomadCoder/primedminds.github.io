// GLOBAL VARIABLES
var currentIndex = 0;
var TOTAL_NUM_SLIDES;
var urlParams = {};

var flow = [{descriptor: "PPV1", link: "zbfVO-JvW10"},
            {descriptor: "PPI1", link: "PPI1.html"},      // konig bridge interactive
            {descriptor: "PPV2", link: "F1ULIVqnkbc"},
            {descriptor: "PPI2", link: ""},
            {descriptor: "PPV3", link: "uvEQjJW1UzY"},
            {descriptor: "PPS3", link: "PPS3.html"},
]; 

// find the URL parameters
// i.e. http://website.com/page.html?param1=x&param2=y
//      returns param1 = x, param2 = y
(window.onpopstate = function () {
    var match,
        pl     = /\+/g,  // Regex for replacing addition symbol with a space
        search = /([^&=]+)=?([^&]*)/g,
        decode = function (s) { return decodeURIComponent(s.replace(pl, " ")); },
        query  = window.location.search.substring(1);

    urlParams = {};
    while (match = search.exec(query)) {
       urlParams[decode(match[1])] = decode(match[2]);
    }
})();


// go to the slide specified by the URL param
function goToSlide() {
    var found = false;
    // if already has slide param
    if ( urlParams["s"] != null) {
        // for safety, make sure index exists 
        var param = urlParams["s"];
        for (var i=0; i<flow.length; i++) {
            if ( param == flow[i].descriptor ) {
                currentIndex = i; 
                found = true;
            }
        }
    } else {
        // if there is no slide param
        currentIndex = 0;
    }
    if (!found) {
        currentIndex = 0;
    }
    window.history.pushState(urlParams, "", "?s=" + flow[currentIndex].descriptor);
    // cycleItems();
    showItem();
}

function showItem() {
    var descriptor = flow[currentIndex].descriptor;
    if (descriptor.indexOf("V") != -1) {
        loadVideo();
    } else if (descriptor.indexOf("I") != -1) {
        loadInteractive();
    }
}

// actually cycle the slides 
// function cycleItems() {
//     // hide all the slides 
//     var items = document.querySelectorAll(".slide");
//     for(var i=0; i<items.length; i++) {
//         items[i].style.display = 'none';
//     }

//     // get the string descriptor 
//     var descriptor = slides[currentIndex];

//     var show = ""; 

//     // see if it is a video (V), interactive (I), or slideshow (S)
//     if (descriptor.indexOf("V") != -1) {
//         // is video 
//         if ( currently_loaded["iframe0"] == descriptor ) {
//             show = "video0";
//         } else if ( currently_loaded["iframe1"] == descriptor) {
//             show = "video1";
//         } else {
//             // set the video link if it is not already loaded
//             show = "video" + loadVideo(currentIndex);
//         }
//     } else if (descriptor.indexOf("I") != -1) {
//         // is interactive
//         // start loading next video if not already loaded
//         if ( currently_loaded["iframe0"] != slides[currentIndex+1] &&
//               currently_loaded["iframe1"] != slides[currentIndex+1]) { 
//             loadVideo(currentIndex+1);
//         }

//         // display slide 
//         show = "interactive";
//         if (descriptor == "PPI1") {
//             $("#interactive").load(descriptor + ".html");
//             $("#interactive").removeClass("placeholder");
//             console.log('here, loading ' + descriptor + ".html");
//         } else {
//             $("#interactive").addClass("placeholder");
//         }
//     } else if (descriptor.indexOf("S") != -1) {
//         // temp 
//         show = "slideshow";
//         $("#slideshow").load(descriptor + ".html"); 

//     } else {
//         // not found
//         console.log("ERROR - type not found");
//     }

//     document.getElementById(show).style.display = 'inline-block';
//     updateArrows();
// }

// load the video onto the least recently used div
function loadVideo() {
    console.log("loading " + flow[currentIndex].link + " into iframe0");
    document.getElementById("iframe0").src = 
        "https://www.youtube.com/embed/" + flow[currentIndex].link + "?rel=0";
}

function loadInteractive() {
    if (flow[currentIndex].link == "") {
        loadPlaceholder();
    } else {
        console.log("loading " + flow[currentIndex].link);
        $("#body").load(flow[currentIndex].link);
        console.log(document.getElementById("body"));
    }
}

function loadPlaceholder() {
    $("#inside").addClass("placeholder");
}

function updateArrows() {
    if ( currentIndex == 0 ) {
        $('.left-arrow').hide();
    } else if (currentIndex >= TOTAL_NUM_SLIDES -1) {
        $('.right-arrow').hide();
    } else {
        $('.left-arrow').show();
        $('.right-arrow').show();
    }
}


// when the page loads
$(document).ready(function () {
//     // save length
    TOTAL_NUM_SLIDES = flow.length;

    // call this so that if url sent with a specific slide number, it will start at that slide
    goToSlide();

    updateArrows();

    $('.right-arrow').on('click', function() {
        slideChange(1);
    });

    $('.left-arrow').on('click', function() {
        slideChange(-1);
    });

    function slideChange(n) {
        // update current index
        var nextIndex = currentIndex + n; 
        console.log('slide change', nextIndex);
        if (nextIndex >= TOTAL_NUM_SLIDES) { 
            // stay on last page
            nextIndex = TOTAL_NUM_SLIDES - 1;
        } else if (nextIndex < 0) {
            // stay on first page
            nextIndex = 0;
        }

        var nextDescriptor = flow[nextIndex].descriptor; 
        if (nextDescriptor.indexOf("V") != -1) {
            // is video 
            window.location.href = "flow_video.html?s=" + nextDescriptor;
        } else if (nextDescriptor.indexOf("I") != -1) {
            // is interactive 
            if (nextDescriptor == "") {
                // placeholder
                // $("#main").addClass("container placeholder slide");     
                loadPlaceholder();  
            } else {
                window.location.href = "pp_flow.html?s=" + nextDescriptor;
            }
        } else if (nextDescriptor.indexOf("S") != -1) {
            
        }
    }
});
