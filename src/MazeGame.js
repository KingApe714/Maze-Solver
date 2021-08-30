


class Maze {
    constructor(){
        this.startMaze = this.startMaze.bind(this); 
    }

    startMaze(){
        this.buildMaze()
    }
    buildMaze() {
        const testOuterDiv = document.querySelector(".test-outer-div")
        // testOuterDiv.style.display = "flex"
        testOuterDiv.style.position = "relative"
        // testOuterDiv.style.width = "500px"
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
                console.log(cell.style.top)
            }
        }
    }

}

export default Maze;