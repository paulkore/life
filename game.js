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

  this.addCell = function(cell) {
    this.set[cell] = true;
  }

  this.addShape = function(shape, offset_x, offset_y) {
	if (!offset_x)
		offset_x = 0;
		
	if (!offset_y)
		offset_y = 0;
	
	for(var y = 0; y < shape.length; y++) {
		var row_y = shape[y];
		for(var x = 0; x < row_y.length; x++) {
			if (row_y[x] === 1) {
				var cell_x = offset_x + x;
				var cell_y = offset_y + y;
				this.addCell([cell_x, cell_y]);
			}					
		}
	}
	
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
