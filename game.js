var Game = function() {
  this.set = {};

  var gamestateFromSet = function(set) {
    var gamestate = {};    


    for (var cell in set) {

      var a = neighboursOf(cell);
      a.forEach(function(n) {
        if (!gamestate[n]) gamestate[n] = 0
        gamestate[n] += 1        
      })
    };

    return gamestate;
  }

  var neighboursOf = function(cell) {        
    var cell = cell.split(','), x = parseInt(cell[0]), y = parseInt(cell[1]);
    return [[x-1, y-1], [x-1, y], [x-1, y+1], [x, y-1], [x, y+1], [x+1, y-1], [x+1, y], [x+1, y+1]]   
  }

  this.add = function(cell) {
    this.set[cell] = true;
  }

  this.isAlive = function(cell) {
    return this.set[cell];
  }

  this.tick = function() {
    nextGen = {};    

    var gamestate = gamestateFromSet(this.set);

    for (cell in gamestate) {      

      var count = gamestate[cell];      

      if (count == 3) { 
        nextGen[cell] = true;  
      }
      else if (count == 2 && this.set[cell]) { 
        nextGen[cell] = true; 
      }      
    }

    this.set = nextGen;
  }
}
