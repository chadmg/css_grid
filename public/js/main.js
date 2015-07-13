console.log("->main.js running");
$.getScript("/js/lettergrid.js", function() {
  
  console.log(" *lettergrid loaded successfully")
  lettergrid.drawBorder();   
  lettergrid.drawCorners();
});

