
function node(value, coordinates) {
    this.parent = null;
    this.neighbors = [];
    this.g = 0;
    this.h = 0;
    this.f = 0;
    this.value = value;
    this.coordinates = coordinates;
}

export const aStar = (grid) => {
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[0].length; j++) {
            console.log(`[${i},${j}] ${grid[i][j].innerHTML}`)
            let arr = []
            arr.push(grid[i][j])
            arr.push(new node(grid[i][j].innerHTML, `${i},${j}`))
            arr[1].neighbors.push()
            grid[i][j] = arr
        }
    }


}