


class Maze {
    constructor(){
        this.startMaze = this.startMaze.bind(this); 
    }

    startMaze(){
        // starts all the logic you can start manipulating the dom in side of here
        console.log("Starting maze here " ); 
        const testOuterDiv = document.querySelector(".test-outer-div")
    const testDiv = document.createElement('div');
    
    testDiv.innerHTML = "Hello RYAN THIS IS WORKING";
    testOuterDiv.appendChild(testDiv)
    testOuterDiv.innerHTML = "SOMETHING!!"
    maze.startMaze(); 
    }

}

export default Maze;