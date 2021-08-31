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
        const goButton = document.querySelector(".go-button")

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

        testOuterDiv.style.position = "relative"
        const grid = []
        let start = ''
        let end = ''
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
            aStar(startCell, endCell)
        })
    }
    
}

export default Maze;