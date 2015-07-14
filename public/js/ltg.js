// LTG.JS

console.log("->ltg.js running");

//Self-Executing Anonymous Func: Part 2 (Public & Private) 
(function( LTG, $, undefined ) { 

  //Private Property 
  var max = 11;


  var grid = [];
 
  //Public Property
  LTG.author = 'chadmg';
 
  
  //Public Method

  LTG.initTiles = function() {
    var xi, yi;
    for(xi = 0; xi < max; xi++){
      grid[xi] = [];
      for(yi = 0; yi < max; yi++){
        var item = {
          type: 'e'
        };
        grid[xi][yi] = item;
      }
    }
  };

  LTG.drawTiles = function() {
    
    var gr = $("#gr");
    gr.html('');
    var xi, yi;
    for(xi = 0; xi < max; xi++){
      for(yi = 0; yi < max; yi++){
        var item = grid[xi][yi];
        if(item.type != 'e'){
          gr.html(gr.html()+blHTML(xi,yi, item.type));
        }
      }
    }
    console.log(grid);
  };

  LTG.fillBorder = function() {
    var xi, yi;
    /*
    for(xi = 0; xi < max; xi++){
      for(yi = 0; yi < max; yi++){
        if(xi == 0 || yi == 0 || xi == max-1 || yi == max-1){
          grid[xi][yi].type = 'b';
        }
      }
    }*/
    
    for(xi = 0, yi = 0; xi < max; xi++){
      grid[xi][yi].type = 'b';
    }
    for(xi = 0, yi = 0; yi < max; yi++){
      grid[xi][yi].type = 'b';
    }
    for(xi = 0, yi = max-1; xi < max; xi++){
      grid[xi][yi].type = 'b';
    }
    for(xi = max-1, yi = 0; yi < max; yi++){
      grid[xi][yi].type = 'b';
    }
  };

  LTG.fillCorners = function() {
    var acc = {};
    acc[1+'x'+1] = true;
    grid[1][1].type = 'b';
    acc[(max-2)+'x'+1] = true;
    grid[max-2][1].type = 'b';
    acc[1+'x'+(max-2)] = true;
    grid[1][max-2].type = 'b';
    acc[(max-2)+'x'+(max-2)] = true;
    grid[max-2][max-2].type = 'b';
    
    var xi, maxi = max-2;
    for(xi = 0; xi < maxi*maxi/2; xi++){
      
      var len = Object.keys(acc).length;
      if(len == 0){
        
        break;
      }
      var ind = rando(len);
      var key = Object.keys(acc)[ind];
      
      var neighbors = getNeighbors(key);
      if(neighbors.length == 0){
        xi = xi - 1;
        delete acc[key];
      }
      else{
        console.log(neighbors);
        console.log(neighbors.length);
        ind = rando(neighbors.length);
        
        key = neighbors[ind];
        console.log(key);
        acc[key] = true;
        var keyArr = key.split('x');
        var x = parseInt(keyArr[0]);
        var y = parseInt(keyArr[1]);
        grid[x][y].type = 'b';
      }
    }
  };

  LTG.drawLetter = function() {
    var gr = $("#gr");
    var spot = getSpot();
    console.log("spot:");
    console.log(spot);
    if(Object.keys(spot).length == 0){
      console.log("NO MORE AVAILABLE SPOTS"); 
    }
    else{
      var type = 'l';
      grid[spot.x][spot.y].type = type;
      gr.html(gr.html()+blHTML(spot.x,spot.y, type));
    }
  };


  LTG.upPress = function() {
    var xi, yi;
    for(xi = 1, yi = 1; xi < max-1; xi++){
      for(yi = 1; yi < max-1; yi++){
        var itemf = grid[xi][yi];
      }
    }
  };

  LTG.rightPress = function() {

  };

  LTG.downPress = function() {

  };

  LTG.leftPress = function() {

  };

  //Private Methods
  function blHTML(x,y,cls) {
    return "<div class='bl pos-"+x+"-"+y+" "+cls+"'></div>";
  };

  //not safe, could run forever, need set of empty spots
  function getSpot() {
    var gr = $("#gr");
    var xi, yi;
    var pos = [];
    for(xi = 0; xi < max; xi++){
      for(yi = 0; yi < max; yi++){
        var item = {};

        if(grid[xi][yi].type == 'e'){

          pos.push({ x: xi, y: yi });
        }
      }
    }
    console.log(pos);
    if(pos.length == 0){
      return {};
    }
    else {
      return pos[rando(pos.length)];
    }
  };

  // returns a random int->( 0 <= output < input )
  function rando(i) {
    var rand = Math.floor(Math.random()*1000);
    return rand % i;
  };
 
  function getNeighbors(key){
    var keyArr = key.split('x');
    var x = parseInt(keyArr[0]);
    var y = parseInt(keyArr[1]);
    var output = [];
    if(x != 1){
      if(grid[(x-1)][y].type == 'e'){
        output.push((x-1)+'x'+y);
      }
    }
    if(x != max-2){
      if(grid[(x+1)][y].type == 'e'){
        output.push((x+1)+'x'+y);
      }
    }
    if(y != 1){
      if(grid[x][(y-1)].type == 'e'){
        output.push(x+'x'+(y-1));
      }
    }
    if(y != max-2){
      if(grid[x][(y+1)].type == 'e'){
        output.push(x+'x'+(y+1));
      }
    }
    return output;
  };
  
 
}( window.LTG = window.LTG || {}, jQuery ));
 
//Public Properties 
//console.log( lettergrid.ingredient ); //Bacon Strips
 

 
//Adding a Public Property 
//lettergrid.quantity = "12"; 
//console.log( lettergrid.quantity ); //12
 
//Adding New Functionality to the lettergrid 
/*
(function( lettergrid, $, undefined ) { 
  //Private Property 
  var amountOfGrease = "1 Cup";
 
  //Public Method
  lettergrid.toString = function() {
    console.log( lettergrid.quantity + ' ' +
                 lettergrid.ingredient + ' & ' +
                 amountOfGrease + ' of Grease' );
    console.log( isHot ? 'Hot' : 'Cold' );
  };
}( window.lettergrid = window.lettergrid || {}, jQuery ));

*/
/* 
try { 
  //12 Bacon Strips & 1 Cup of Grease 
  lettergrid.toString(); //Throws Exception 
} catch( e ) { 
  console.log( e.message ); 
  //isHot is not defined 
}
*/