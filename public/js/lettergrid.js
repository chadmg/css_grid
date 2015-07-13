console.log("->lettergrid.js running");

//Self-Executing Anonymous Func: Part 2 (Public & Private) 
(function( lettergrid, $, undefined ) { 

  //Private Property 
  var max = 32;


  lettergrid.grid = [];
 
  //Public Property
  lettergrid.ingredient = 'Bacon Strips';
 
  
  //Public Method
  lettergrid.drawTiles = function(check) {
    
    var gr = $("#gr");
    var xi, yi;
    for(xi = 0; xi < max; xi++){
      lettergrid.grid[xi] = []
      for(yi = 0; yi < max; yi++){
        var item = {};
        check(xi,yi,item);
        if(item.type != "none"){
          gr.html(gr.html()+blHTML(xi,yi, item.type));
          lettergrid.grid[xi][yi] = {
            type: item.type,
          };
        }
      }
    }
  };

  lettergrid.drawBorder = function() {
    lettergrid.drawTiles(function(x,y,item){
      if(x == 0 || y == 0 || x == max-1 || y == max-1){
        item.type = "border";
      }
      else{
        item.type = "none"
      }
    });
  };

  lettergrid.drawCorners = function() {
    var acc = {};
    acc[0+'x'+0] = true;
    acc[(max-3)+'x'+0] = true;
    acc[0+'x'+(max-3)] = true;
    acc[(max-3)+'x'+(max-3)] = true;
    
    var x, y, maxi = max-2;
    for(x = 0; x < 80; x++){
      var size = Object.keys(acc).length;
      var rand = Math.floor(Math.random()*1000);
      var ind = rand % size;
      var key = Object.keys(acc)[ind];
      
      addNeighbor(acc, key);
      console.log("Size: "+size);

    }
    lettergrid.drawTiles(function(x,y,item){
      if(acc[(x-1)+'x'+(y-1)]){
        item.type = "border";
      }
      else{
        item.type = "none";
      }
    });
  };

  //Private Method
  function blHTML(x,y,cls) {
    return "<div class='bl pos-"+x+"-"+y+" "+cls+"'></div>";
  };
 
  function addNeighbor(acc,key){
    console.log("ADDING NEIGHBOR");
    var keyArr = key.split('x');
    var x = parseInt(keyArr[0]);
    var y = parseInt(keyArr[1]);
    console.log("x: "+x + " y: "+y);
    var pos = {};
    if(x != 0){
      if(acc[(x-1)+'x'+y]){
        //do nothing
      }
      else{
        pos[(x-1)+'x'+y] = true;
      }
    }
    if(x != max-3){
      if(acc[(x+1)+'x'+y]){
        //do nothing
      }
      else{
        pos[(x+1)+'x'+y] = true;
      }
    }
    if(y != 0){
      if(acc[x+'x'+(y-1)]){
        //do nothing
      }
      else{
        pos[x+'x'+(y-1)] = true;
      }
    }
    if(y != max-3){
      if(acc[x+'x'+(y+1)]){
        //do nothing
      }
      else{
        pos[x+'x'+(y+1)] = true;
      }
    }

    var rand = Math.floor(Math.random()*1000)%Object.keys(pos).length;

    acc[Object.keys(pos)[rand]] = true;
    console.log(Object.keys(pos)[rand]);
  }
  
 
}( window.lettergrid = window.lettergrid || {}, jQuery ));
 
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