// MAIN.JS

console.log("->main.js running");

$.getScript("/js/ltg.js", function() {
  
  console.log(" *LTG loaded successfully")
  LTG.initTiles()
  LTG.fillBorder();   
  LTG.fillCorners();
  LTG.drawTiles();
  LTG.drawLetter();
});

$(document).keydown(function(e) {
    switch(e.which) {
        case 37: // left
        LTG.leftPress();
        break;

        case 38: // up
        LTG.upPress();
        break;

        case 39: // right
        LTG.rightPress();
        break;

        case 40: // down
        LTG.downPress();
        break;

        default: return; // exit this handler for other keys
    }
    e.preventDefault(); // prevent the default action (scroll / move caret)
});

