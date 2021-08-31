
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
            })
        }
    }
}

export const aStar = (startCell, endCell) => {
    //node is in position 1
    gSetter(startCell[1])
}

function gSetter(node) {
    let nodeX = node.coordinates[0]
    let nodeY = node.coordinates[2]

    node.neighbors.forEach(n => {
        //node is in position 1 of each n
        let nX = n[1].coordinates[0]
        let nY = n[1].coordinates[2]
        if (nodeX === nX || nodeY === nY) {
            if (node.g + 10 < n[1].g || n[1].g === 0) {
                n[1].g = node.g + 10
            }
        } else if (nodeX !== nX && nodeY !== nY) {
            if (node.g + 14 < n[1].g || n[1].g === 0) {
                n[1].g = node.g + 14
            }
        }
    })
}

function hSetter(endNode, node) {
    let endX = endNode.coordinates[0];
    let endY = endNode.coordinates[2];
    let nodeX = node.coordinates[0];
    let nodeY = node.coordinates[2];
    let deltaX = Math.abs(endX - nodeX);
    let deltaY = Math.abs(endY - nodeY);

    let adj = Math.abs(deltaX - deltaY);
    let diag = Math.min(deltaX, deltaY);

    node.h = (adj * 10) + (diag * 14);
}