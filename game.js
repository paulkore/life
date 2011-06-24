var Cell = function(x,y) {
  this.x = x;
  this.y = y;

  this.neighbours = function() {    
    return [new Cell(x-1, y-1), new Cell(x-1, y), new Cell(x-1, y+1), new Cell(x, y-1), new Cell(x, y+1), new Cell(x+1, y-1), new Cell(x+1, y), new Cell(x+1, y+1)]   
  }
  this.coords = function() {
    return x + "x" + y;
  }
}

var Game = function() {
  
  this.set = [];

  var existsInSet = function(set, cell) {
    for (var i = set.length - 1; i >= 0; i--) {
      if (set[i].x == cell.x && set[i].y == cell.y) {
        return true
      }
    }; 
    return false
  }

  var gamestateFromSet = function(set) {
    var gamestate = {};    

    for (var i = set.length - 1; i >= 0; i--) {
      set[i].neighbours().forEach(function(n) {
        if (!gamestate[n.coords()])
          gamestate[n.coords()] = [0, n]
        gamestate[n.coords()][0] += 1        
      })
    };

    return gamestate;
  }

  this.add = function(cell) {
    if (existsInSet(this.set, cell))
      return 

    this.set.push(cell)    
  }

  this.tick = function() {
    lastgen = this.set;
    this.set = [];

    var gamestate = gamestateFromSet(lastgen);

    for (key in gamestate) {
      var value = gamestate[key];
      console.log(value);
      var count = value[0];
      var cell = value[1];

      if (count == 3) {
        this.add(cell);
      }
      else if (count == 2 && existsInSet(lastgen, cell)) {
        this.add(cell);
      }
    }
  }
}

game = new Game()

game.add(new Cell(1,2))
game.add(new Cell(2,3))
game.add(new Cell(3,1))
game.add(new Cell(3,2))
game.add(new Cell(3,3))

game.tick()
