$(function() {
    $("body").click(function(e) {
        if (e.target.id == "right_arrow") {
          // current hack
          window.location.href = "flow_video.html?s=PPV2";
        } else if (e.target.id == "left_arrow") {
          window.location.href = "flow_video.html?s=PPV1";
        } else if (e.target.id == "canvas") { 
           draw();
        } else { 
           //alert("Outside div");
        }
    });
})
