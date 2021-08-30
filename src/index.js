console.log("webpaoeuoeuoeuck works"); 


import Maze from './MazeGame.js'; //Handles all logic for your maze

document.addEventListener("DOMContentLoaded", ()=> {
    const maze = new Maze(); //maze is a class that exists inside of MazeGameLogic.js 
    const testOuterDiv = document.querySelector(".test-outer-div")
    const testDiv = document.createElement('div');
    testDiv.style.backgroundColor = "green";
    testDiv.style.width = "100px";
    testDiv.style.height = "100px";
    testDiv.innerHTML = "Hello RYAN THIS IS WORKING";
    console.log(testDiv)
    // testOuterDiv.innerHTML = "SOMETHING!!"
    // testOuterDiv.appendChild(testDiv)
    testOuterDiv.appendChild(testDiv)
    console.log(testOuterDiv.children)
    maze.startMaze(); 
    console.log("DOM is loaded"); 
})