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
        testOuterDiv.style.position = "relative"
        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 10; j++) {
                let cell = document.createElement('div')
                cell.style.position = "absolute"
                cell.style.height = "50px";
                cell.style.width = "50px";
                cell.style.border = "1px solid black";
                cell.style.backgroundColor = "red";
                cell.style.left = j * 50 + "px";
                cell.style.top = i * 50 + "px";
                testOuterDiv.appendChild(cell)
            }
        }

        aStar(testOuterDiv)
    }

}

export default Maze;