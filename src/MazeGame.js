


class Maze {
    constructor(){
        this.startMaze = this.startMaze.bind(this); 
    }

    startMaze(){
        // starts all the logic you can start manipulating the dom in side of here
        // console.log("Starting maze here " ); 
        const testOuterDiv = document.querySelector(".test-outer-div")
        const testDiv = document.createElement('div');
        testDiv.className = "testDiv"
        testDiv.style.backgroundColor = "green";
        testDiv.style.width = "100px";
        testDiv.style.height = "100px";
        testDiv.innerHTML = "Hello RYAN THIS IS WORKING";
        console.log(testDiv.style)

        testOuterDiv.innerHTML = "SOMETHING!! ELSE"
        testOuterDiv.appendChild(testDiv)
        
        console.log(testOuterDiv.children)
    }

}

export default Maze;