
function node(value, coordinates) {
    this.parent = null;
    this.neighbors = [];
    this.g = 0;
    this.h = 0;
    this.f = 0;
    this.value = value;
    this.coordinates = coordinates;
    this.startPoint = false;
    this.endPoint = false;
    this.wall = false;
}

export const setUpGrid = (grid) => {
    //set up neighbor check
    let s = '';
    let e = '';
    const nCheck = [
        [-1, -1],
        [-1, 0],
        [-1, 1],
        [1, -1],
        [1, 0],
        [1, 1],
        [0, 1],
        [0, -1]
    ]
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[0].length; j++) {
            let arr = []
            arr.push(grid[i][j])
            arr.push(new node(grid[i][j].innerHTML, `${i},${j}`))
            grid[i][j] = arr
        }
    }
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[0].length; j++) {
            //set up neighbors
            nCheck.forEach(n => {
                let x = n[0] + i;
                let y = n[1] + j;
                //handle edge cases
                if (x >= 0 && x < grid.length && y >= 0 && y < grid[0].length) {
                    grid[i][j][1].neighbors.push(grid[x][y])
                }
                //testing
                if (grid[i][j][1].startPoint) {
                    console.log(`start = ${grid[i][j][1].coordinates}`)
                }
                if (grid[i][j][1].endPoint) {
                    console.log(`end = ${grid[i][j][1].coordinates}`)
                }
            })
        }
    }
}