// GLOBAL VARIABLES
var currentIndex = 0;
var TOTAL_NUM_SLIDES;
var urlParams = {};

var slides = ["PPV1", "PPI1", "PPV2", "PPI2", "PPV3", "PPS3", "PPV4", "PPI4",
              "PPV5", "PPI5", "PPV6", "PPV6B", "PPI6", "PPV7", "PPI7",
              "PPV8", "PPI8", "PPV9", "PPI9", "PPV10", "PPI10", "PPV11",];

var links = ["zbfVO-JvW10", "", "F1ULIVqnkbc", "", "uvEQjJW1UzY", "", "97CunrfBqyQ", "",
             "sepeZGYTyk8", "", "JxOgqNtglas", "jR8OfQrjF5Q", "", "f79SjueqhoM", "",
             "1gV4Dclvg38", "", "nlGLZRmv8fw", "", "EofnBtT5Z14", "", "DGk6iJLl0AQ"];

var currently_loaded = [{"iframe0": slides[0]}, {"interactive": slides[1]}, {"iframe1": slides[2]}];
var next_iframe = 0;

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
    // if already has slide param
    if ( urlParams["s"] != null) {
        // for safety, make sure index exists 
        var param = urlParams["s"];
        if (slides.indexOf(param) == -1) {
            console.log("slide not found");
            // if it does not exist, just go to slide 0
            currentIndex = 0; 
        } else {
            currentIndex = slides.indexOf(param);
        }
    } else {
        // if there is no slide param
        currentIndex = 0;
    }
    window.history.pushState(urlParams, "", "?s=" + slides[currentIndex]);
    cycleItems();
}

// actually cycle the slides 
function cycleItems() {
    // hide all the slides 
    var items = document.querySelectorAll(".slide");
    for(var i=0; i<items.length; i++) {
        items[i].style.display = 'none';
    }

    // get the string descriptor 
    var descriptor = slides[currentIndex];

    var show = ""; 

    // see if it is a video (V), interactive (I), or slide (S)
    if (descriptor.indexOf("V") != -1) {
        // is video 
        if ( currently_loaded["iframe0"] == descriptor ) {
            show = "video0";
        } else if ( currently_loaded["iframe1"] == descriptor) {
            show = "video1";
        } else {
            // set the video link if it is not already loaded
            show = "video" + loadVideo(currentIndex);
        }
    } else if (descriptor.indexOf("I") != -1) {
        // is interactive
        // display slide 
        show = "interactive";
        // start loading next video 
        loadVideo(currentIndex+1);
    } else if (descriptor.indexOf("S") != -1) {
        // temp 
        show = "interactive";
    } else {
        // not found
        console.log("ERROR - type not found");
    }

    document.getElementById(show).style.display = 'inline-block';
    updateArrows();
}

// load the video onto the least recently used div
function loadVideo(index) {
    // console.log("loading " + slides[index] + " into iframe"+next_iframe);
    document.getElementById("iframe" + next_iframe).src = 
        "https://www.youtube.com/embed/" + links[index];
    currently_loaded["iframe" + next_iframe] = slides[index];
    var ret = next_iframe;
    next_iframe = (next_iframe+1)%2;    
    return ret;
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

// function onPlayerStateChange(event) {
//     if (event.data == YT.PlayerState.ENDED) {
//         console.log('ended')
//     }
// }


// when the page loads
$(document).ready(function () {
    // save length
    TOTAL_NUM_SLIDES = slides.length;

    // call this so that if url sent with a specific slide number, it will start at that slide
    goToSlide();

    $('.right-arrow').on('click', function() {
        slideChange(1);
    });

    $('.left-arrow').on('click', function() {
        slideChange(-1);
    });

    function slideChange(n) {
        currentIndex += n; 
        if (currentIndex >= TOTAL_NUM_SLIDES) { 
            // stay on last page
            currentIndex = TOTAL_NUM_SLIDES - 1;
        } else if (currentIndex < 0) {
            // stay on first page
            currentIndex = 0;
        }
        cycleItems();
        window.history.pushState(urlParams, "", "?s=" + slides[currentIndex]);
    }
});
