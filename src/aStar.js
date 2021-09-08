
function node(value, coordinates) {
    this.parent = null;
    this.neighbors = [];
    this.g = null;
    this.h = 0;
    this.f = 0;
    this.value = value;
    this.coordinates = coordinates;
    this.startPoint = false;
    this.endPoint = false;
    this.isWall = false;
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

//cells have both the node and the div in them
//nodes are just the nodes by themselves
export const aStar = (startCell, endCell, wallCells) => {
    //node is in position 1
    gSetter(startCell[1])
    hSetter(endCell[1], startCell[1])

    let checkCell = startCell;
    let startNode = startCell[1];
    let endNode = endCell[1];

    let path = [];
    let visitedCells = [];
    let checkQueue = [checkCell];
    
    let count = 0

    visitedCells.push(startCell[1].coordinates)
    path.push(startCell)
    while (checkCell[1] !== endNode && count !== 30) {

        // console.log(`count = ${count}`)

        checkQueue.sort((first, second) => {
            if (first[1].f !== second[1].f) {
                return first[1].f - second[1].f
            } else {
                return first[1].h - second[1].h
            }
        })

        checkCell = checkQueue.shift()
        checkCell[1].neighbors.forEach(n => {
            if (!n[1].isWall) {
                gSetter(n[1])
                hSetter(endNode, n[1])
            }
            // console.log(`${n[1].coordinates}.h = ${n[1].h}`)
            n[1].f = n[1].g + n[1].h;
            n[0].innerHTML += `<br> g:${n[1].g} <br> h:${n[1].h} <br> f:${n[1].f}`
            if (!visitedCells.includes(n[1].coordinates) && !checkQueue.includes(n) && !n[1].isWall) {
                checkQueue.push(n)
            }
            if (!n[1].isWall) n[0].style.backgroundColor = "cyan";
        })
        if (!visitedCells.includes(checkCell[1].coordinates)) visitedCells.push(checkCell[1].coordinates)
        path.push(checkCell);

        count++
        // console.log(count)
    }
    path.forEach(cell => {
        // console.log(cell[1].coordinates)
        cell[0].style.backgroundColor = "orange"
    })

    highlightPath(startCell, endCell)
}

function highlightPath(startCell, endCell) {
    let currentCell = endCell;
    let count = 0
    while (currentCell !== startCell && count !== 30) {
        currentCell[0].style.backgroundColor = "white"

        if (currentCell[0].innerHTML[currentCell[0].innerHTML.length - 1] == ']') currentCell[0].innerHTML += `g = ${currentCell[1].g}`

        let cellCheck = null;
        currentCell[1].neighbors.forEach(n => {
            // console.log(cellCheck)
            if (n[1].g !== null && !n[1].isWall && (cellCheck === null || cellCheck[1].g > n[1].g)) {
                cellCheck = n
            }
        })
        currentCell = cellCheck;

        count++

    }
    startCell[0].style.backgroundColor = "white"
}

function gSetter(node) {
    // console.log(`${node.coordinates} = ${node}`)
    // let nodeX = node.coordinates[0]
    // let nodeY = node.coordinates[2]

    let [nodeX, nodeY] = node.coordinates.split(',')

    node.neighbors.forEach(n => {
        //node is in position 1 of each n
        // let nX = n[1].coordinates[0]
        // let nY = n[1].coordinates[2]

        let [nX, nY] = n[1].coordinates.split(',')

        if (n[1].g === null) n[1].g = 0

        if (nodeX === nX || nodeY === nY) {
            if (!n[1].startPoint && (node.g + 10 < n[1].g || n[1].g === 0)) {
                n[1].g = node.g + 10
            }
        } else if (nodeX !== nX && nodeY !== nY) {
            if (!n[1].startPoint && (node.g + 14 < n[1].g || n[1].g === 0)) {
                n[1].g = node.g + 14
            }
        }
    })
}

function hSetter(endNode, node) {
    // let endX = endNode.coordinates[0];
    // let endY = endNode.coordinates[2];

    let [endX, endY] = endNode.coordinates.split(',')
    // let nodeX = node.coordinates[0];
    // let nodeY = node.coordinates[2];

    // console.log(endX)
    // console.log(endY)
    
    let [nodeX, nodeY] = node.coordinates.split(',')

    // console.log(node.value)
    // console.log(parseInt(nodeX))

    let deltaX = Math.abs(endX - nodeX);
    let deltaY = Math.abs(endY - nodeY);

    // console.log(deltaX)

    let adj = Math.abs(deltaX - deltaY);
    let diag = Math.min(deltaX, deltaY);

    node.h = (adj * 10) + (diag * 14);

    // console.log(node.h)
}