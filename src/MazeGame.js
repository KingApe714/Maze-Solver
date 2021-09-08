import { setUpGrid, aStar } from './aStar.js'

class Maze {
    constructor(){
        this.startMaze = this.startMaze.bind(this); 
    }

    startMaze(){
        this.buildMaze()
    }
    buildMaze() {
        const testOuterDiv = document.querySelector(".test-outer-div")
        const startButton = document.querySelector(".start-button")
        const endButton = document.querySelector(".end-button")
        const wallButton = document.querySelector(".wall-button")
        const removeButton = document.querySelector(".remove-wall-button")
        const goButton = document.querySelector(".go-button")

        testOuterDiv.style.position = "relative"

        //tiles are the divs
        //nodes are the nodes
        //and the cells hold both the tiles and the nodes in an array length 2

        let startSelected = false;
        let endSelected = false;
        let wallSelected = false;
        let removeSelected = false

        let startTile, endTile;

        startButton.addEventListener('click', () => {
            startSelected = true;
            endSelected = false;
            wallSelected = false;
            removeSelected = false;
        })
        endButton.addEventListener('click', () => {
            endSelected = true;
            startSelected = false;
            wallSelected = false;
            removeSelected = false;
        })
        wallButton.addEventListener('click', () => {
            wallSelected = true
            removeSelected = false;
            startSelected = false;
            endSelected = false;
        })
        
        removeButton.addEventListener('click', () => {
            removeSelected = true;
            wallSelected = false;
            startSelected = false;
            endSelected = false;
        })

        const grid = []
        let start = ''
        let end = ''
        let wallCells = []
        
        let mouseDown = false
        testOuterDiv.addEventListener(mouseDown, () => {
            mouseDown = true;
        })
        for (let i = 0; i < 15; i++) {
            let row = []
            for (let j = 0; j < 20; j++) {
                let tile = document.createElement('div')
                tile.className = "tile";
                tile.style.left = j * 45 + "px";
                tile.style.top = i * 45 + "px";
                // tile.innerHTML = `[${i}, ${j}]`
                
                let innerTile = document.createElement('div')
                innerTile.className = "inner-tile"
                // innerTile.style.left = j * 45 + "px";
                // innerTile.style.top = i * 45 + "px";

                tile.addEventListener('click', () => {
                    if (startSelected) {
                        innerTile.style.backgroundColor = "blue"

                        tile.appendChild(innerTile)
                        
                        endSelected = false;
                        if (start) {
                            let [sX, sY] = start.split(',')
                            grid[sX][sY][0].style.backgroundColor = "red"
                            grid[sX][sY][0].removeChild(grid[sX][sY][0].lastElementChild)
                            grid[sX][sY][1].startPoint = false;
                        }
                        grid[i][j][1].startPoint = true
                        startTile = tile;
                        start = `${i},${j}`
                    } else if (endSelected) {
                        innerTile.style.backgroundColor = "yellow"

                        tile.appendChild(innerTile)

                        startSelected = false;
                        if (end) {
                            let [eX, eY] = end.split(',')
                            grid[eX][eY][0].removeChild(grid[sX][sY][0].lastElementChild)
                            grid[eX][eY][1].endPoint = false;
                        }
                        grid[i][j][1].endPoint = true;
                        endTile = tile;
                        end = `${i},${j}`
                    }
                })

                tile.addEventListener('mousedown', () => {
                    mouseDown = true;
                    if (wallSelected) {
                        wallHandler()
                    } else if (removeSelected) {
                        removeHandler()
                    }
                })
                tile.addEventListener('mousemove', () => {
                    if (mouseDown) {
                        if (wallSelected) {
                            wallHandler()
                        } else if (removeSelected) {
                            removeHandler()
                        }
                    }
                })
                
                const wallHandler = () => {
                    let innerTile = document.createElement('div')
                    innerTile.className = "inner-tile"
                    innerTile.style.left = j * 45 + "px";
                    innerTile.style.top = i * 45 + "px";
                    innerTile.style.backgroundColor = "purple";
                    if (!grid[i][j][0].hasChildNodes()) {
                        grid[i][j][0].appendChild(innerTile);
                        grid[i][j][1].isWall = true;
                    }
                    // if (!wallCells.includes(grid[i][j])) {
                    //     if ((startTile && tile !== startTile) && (endTile && tile !== endTile)) {
                    //         wallCells.push(grid[i][j]);
                    //     }
                    // }
                }

                const removeHandler = () => {
                    if (grid[i][j][0].hasChildNodes()) {
                        grid[i][j][0].removeChild(grid[i][j][0].lastElementChild)
                        grid[i][j][1].isWall = false;
                    }
                }

                tile.addEventListener('mouseup', () => {
                    mouseDown = false
                })

                row.push(tile)
                testOuterDiv.appendChild(tile)
            }
            grid.push(row)
        }
        
        setUpGrid(grid)

        goButton.addEventListener('click', () => {
            let [sX, sY] = start.split(',')
            let [eX, eY] = end.split(',')
            startTile = grid[sX][sY]
            endTile = grid[eX][eY]
            aStar(startTile, endTile, wallCells)
        })

        // console.log(grid)
    }
    
}

export default Maze;