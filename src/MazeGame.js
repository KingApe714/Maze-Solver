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
                let cell = document.createElement('div')
                cell.className = "cell";
                cell.style.left = j * 50 + "px";
                cell.style.top = i * 50 + "px";
                cell.innerHTML = `[${i}, ${j}]`
                
                cell.addEventListener('click', () => {
                    if (startSelected) {
                        cell.style.backgroundColor = "blue"
                        endSelected = false;
                        if (start) {
                            grid[parseInt(start[0])][parseInt(start[2])][0].style.backgroundColor = "red"
                            grid[parseInt(start[0])][parseInt(start[2])][1].startPoint = false;
                        }
                        grid[i][j][1].startPoint = true
                        startCell = cell;
                        start = `${i},${j}`
                    } else if (endSelected) {
                        cell.style.backgroundColor = "yellow"
                        startSelected = false;
                        if (end) {
                            grid[parseInt(end[0])][parseInt(end[2])][0].style.backgroundColor = "red"
                            grid[parseInt(end[0])][parseInt(end[2])][1].endPoint = false;
                        }
                        grid[i][j][1].endPoint = true;
                        endCell = cell;
                        end = `${i},${j}`
                    }
                })

                cell.addEventListener('mousedown', () => {
                    mouseDown = true;
                    wallHandler()
                })
                cell.addEventListener('mousemove', () => {
                    console.log(mouseDown)
                    if (mouseDown) {
                        wallHandler()
                    }
                })
                
                const wallHandler = () => {
                    cell.style.backgroundColor = "purple";
                    grid[i][j][1].isWall = true;
                    if (!wallCells.includes(grid[i][j])) {
                        if ((startCell && cell !== startCell) && (endCell && cell !== endCell)) {
                            wallCells.push(grid[i][j])
                        }
                    }
                }

                cell.addEventListener('mouseup', () => {
                    mouseDown = false
                })

                row.push(cell)
                testOuterDiv.appendChild(cell)
            }
            grid.push(row)
        }
        
        setUpGrid(grid)
        let startCell, endCell;

        goButton.addEventListener('click', () => {
            startCell = grid[parseInt(start[0])][parseInt(start[2])]
            endCell = grid[parseInt(end[0])][parseInt(end[2])]
            aStar(startCell, endCell, wallCells)
        })
    }
    
}

export default Maze;