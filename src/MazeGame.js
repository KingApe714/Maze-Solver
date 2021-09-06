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

        let startSelected = false;
        let endSelected = false;

        let startTile, endTile;
        
        startButton.addEventListener('click', () => {
            startSelected = true;
            endSelected = false;
        })
        endButton.addEventListener('click', () => {
            endSelected = true;
            startSelected = false;
        })
        wallButton.addEventListener('click', () => {
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
                    wallHandler()
                })
                tile.addEventListener('mousemove', () => {
                    console.log(mouseDown)
                    if (mouseDown) {
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
    }
    
}

export default Maze;