import { aStar } from './aStar.js'


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
                cell.style.position = "absolute"
                cell.style.height = "50px";
                cell.style.width = "50px";
                cell.style.border = "1px solid black";
                cell.style.backgroundColor = "red";
                cell.style.left = j * 50 + "px";
                cell.style.top = i * 50 + "px";
                cell.innerHTML = `[${i}, ${j}]`

                cell.addEventListener('click', () => {
                    if (startSelected) {
                        cell.style.backgroundColor = "blue"
                        startSelected = false;
                        if (start) {
                            grid[parseInt(start[0])][parseInt(start[2])][0].style.backgroundColor = "red"
                        }
                        start = `${i},${j}`
                    } else if (endSelected) {
                        cell.style.backgroundColor = "yellow"
                        endSelected = false;
                        if (end) {
                            grid[parseInt(end[0])][parseInt(end[2])][0].style.backgroundColor = "red"
                        }
                        end = `${i},${j}`
                    }
                })
                row.push(cell)
                testOuterDiv.appendChild(cell)
            }
            grid.push(row)
        }

        let startPoint = null
        let endPoint = null
        aStar(grid, startPoint, endPoint)
    }

}

export default Maze;