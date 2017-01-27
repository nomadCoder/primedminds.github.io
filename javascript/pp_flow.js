// GLOBAL VARIABLES
var currentIndex = 0;
var TOTAL_NUM_SLIDES;
var urlParams = {};

var slides = ["PPV1", "PPI1", "PPV2", "PPI2", "PPV3", "PPS3", "PPV4", "PPI4",
              "PPV5", "PPI5", "PPV6", "PPV6B", "PPI6", "PPV7", "PPI7",
              "PPV8", "PPI8", "PPV9", "PPI9", "PPV10", "PPI10", "PPV11"];

// find the URL parameters
// i.e. http://website.com/index.html?param1=x&param2=y
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


function changeSlide() {
    // if already has slide param
    if ( urlParams["s"] != null) {
        // for safety, make sure index exists 
        var numSlides = document.querySelectorAll(".slide").length-1;
        var param = urlParams["s"];
        if (slides.indexOf(param) == -1) {
            console.log('slide not found');
            // if it does not exist, just go to slide 0
            currentIndex = 0; 
        } else {
            currentIndex = slides.indexOf(param);
        }
        cycleItems();
    }
    window.history.pushState(urlParams, "", "?s=" + slides[currentIndex]);
}

// actually cycle the slides 
function cycleItems() {
    // get all slides 
    var items = document.querySelectorAll(".slide");
    var item = document.getElementsByClassName('slide')[currentIndex];
    for(var i=0; i<items.length; i++) {
        items[i].style.display = 'none';
    }
    item.style.display = 'inline-block';

    updateArrows();
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
    TOTAL_NUM_SLIDES = document.querySelectorAll(".slide").length;

    // call this so that if url sent with a specific slide number, it will start at that slide
    changeSlide();
    //slider
    var items = $('#main .slide');

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

    $('.right-arrow').on('click', function() {
        slideChange(1);
    });

    $('.left-arrow').on('click', function() {
        slideChange(-1);
    });
});
