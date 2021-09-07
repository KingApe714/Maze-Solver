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
        const goButton = document.querySelector(".go-button")

        testOuterDiv.style.position = "relative"

        //tiles are the divs
        //nodes are the nodes
        //and the cells hold both the tiles and the nodes in an array lenth 2

        let startSelected = false;
        let endSelected = false;
        let wallSelected = false;

        let startTile, endTile;

        startButton.addEventListener('click', () => {
            startSelected = true;
            endSelected = false;
            wallSelected = false;
        })
        endButton.addEventListener('click', () => {
            endSelected = true;
            startSelected = false;
            wallSelected = false
        })
        wallButton.addEventListener('click', () => {
            wallSelected = true
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
        for (let i = 0; i < 10; i++) {
            let row = []
            for (let j = 0; j < 10; j++) {
                let tile = document.createElement('div')
                tile.className = "tile";
                tile.style.left = j * 50 + "px";
                tile.style.top = i * 50 + "px";
                tile.innerHTML = `[${i}, ${j}]`
                
                tile.addEventListener('click', () => {
                    if (startSelected) {
                        tile.style.backgroundColor = "blue"
                        endSelected = false;
                        if (start) {
                            grid[parseInt(start[0])][parseInt(start[2])][0].style.backgroundColor = "red"
                            grid[parseInt(start[0])][parseInt(start[2])][1].startPoint = false;
                        }
                        grid[i][j][1].startPoint = true
                        startTile = tile;
                        start = `${i},${j}`
                    } else if (endSelected) {
                        tile.style.backgroundColor = "yellow"
                        startSelected = false;
                        if (end) {
                            grid[parseInt(end[0])][parseInt(end[2])][0].style.backgroundColor = "red"
                            grid[parseInt(end[0])][parseInt(end[2])][1].endPoint = false;
                        }
                        grid[i][j][1].endPoint = true;
                        endTile = tile;
                        end = `${i},${j}`
                    }
                })

                tile.addEventListener('mousedown', () => {
                    mouseDown = true;
                    if (wallSelected) wallHandler()
                })
                tile.addEventListener('mousemove', () => {
                    if (mouseDown && wallSelected) {
                        wallHandler()
                    }
                })
                
                const wallHandler = () => {
                    tile.style.backgroundColor = "purple";
                    grid[i][j][1].isWall = true;
                    if (!wallCells.includes(grid[i][j])) {
                        if ((startTile && tile !== startTile) && (endTile && tile !== endTile)) {
                            wallCells.push(grid[i][j])
                        }
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
            startTile = grid[parseInt(start[0])][parseInt(start[2])]
            endTile = grid[parseInt(end[0])][parseInt(end[2])]
            aStar(startTile, endTile, wallCells)
        })

        console.log(grid)
    }
    
}

export default Maze;