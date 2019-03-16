function Ai() {
  this.current = 0
  this.init = function () {
    // This method is called when AI is first initialized.
    console.log("START")
    this.restart()
  }

  this.restart = function () {
    // This method is called when the game is reset.
    console.log("RESET")
    this.current = 0
  }

  this.step = function (grid) {
    // This method is called on every update.
    // Return one of these integers to move tiles on the grid:
    // 0: up, 1: right, 2: down, 3: left

    // Parameter grid contains current state of the game as Tile objects stored in grid.cells.
    // Top left corner is at grid.cells[0][0], top right: grid.cells[3][0], bottom left: grid.cells[0][3], bottom right: grid.cells[3][3].
    // Tile objects have .value property which contains the value of the tile. If top left corner has tile with 2, grid.cells[0][0].value == 2.
    // Array will contain null if there is no tile in the slot (e.g. grid.cells[0][3] == null if bottom left corner doesn't have a tile).

    // Grid has 2 useful helper methods:
    // .copy()    - creates a copy of the grid and returns it.
    // .move(dir) - can be used to determine what is the next state of the grid going to be if moved to that direction.
    //              This changes the state of the grid object, so you should probably copy() the grid before using this.
    //              Naturally the modified state doesn't contain information about new tiles.
    //              Method returns true if you can move to that direction, false otherwise.

    // STRATEGY 1: Magic Number
    const current = magicNumber(grid)
    let minimum = current
    let nextMove = [0, 1, 2, 3].find(n => grid.copy().move(n))
    console.log("actual:", current)
    for (let mov = 0; mov < 4; mov++) {
      const newGrid = grid.copy()
      if (newGrid.move(mov)) {
        const count = magicNumber(newGrid)
        if (minimum > count) {
          minimum = count
          nextMove = mov
        }
      }
    }
    console.log("Moving", nextMove)
    return nextMove


    // STRATEGY 2: Corner
    // if (grid.copy().move(this.current)) {
    //   let n = this.current
    //   this.current = (this.current == 0) ? 1 : 0
    //   return n
    // } else {
    //   return [0, 1, 2, 3].find(n => grid.copy().move(n))
    // }
  }
}

function magicNumber(grid) {
  return countBlocks(grid) * (2 ** countValues(grid))
}

function countBlocks(grid) {
  let n = 0
  for (let x = 0; x < 4; x++) {
    for (let y = 0; y < 4; y++) {
      n += grid.cells[x][y] ? 1 : 0;
    }
  }
  return n
}

function countValues(grid) {
  let n = 0
  for (let x = 0; x < 4; x++) {
    for (let y = 0; y < 4; y++) {
      n += grid.cells[x][y] ? grid.cells[x][y].value : 0;
    }
  }
  return n
}