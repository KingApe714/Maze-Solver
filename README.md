# Maze-Solver
A mini game built using the A Star algorithm. Users are allowed to build walls, select a start point, and select an end point.
If the maze is solvable (meaning neither the start point or the end point are not encased by walls) then the algorithm
is run and it finds the most efficient route from start point to end point.

# Technologies

* Vanilla Javascript
* HTML/CSS

# Development

**A Star Aglorithm**

The algorithm uses a three values to determine the path from the start point to the end point: 
* g: the distance from the current cell and the cell brought to it by the algorithm
* h: the distance from the current cell to the end cell
* f: the sum of g and h which is used to determine which the next cell to inspect is going to be

Once it reaches the end node it determines the best possible path by choosing the path whose cells
use the lowest f value.

```javascript
export const aStar = (startCell, endCell) => {
    gSetter(startCell[1])
    hSetter(endCell[1], startCell[1])

    let checkCell = startCell;
    let startNode = startCell[1];
    let endNode = endCell[1];

    let path = [];
    let visitedCells = [];
    let checkQueue = [checkCell];

    visitedCells.push(startCell[1].coordinates)
    path.push(startCell)
    while (checkCell[1] !== endNode) {
        checkQueue.sort((first, second) => {
            if (first[1].f !== second[1].f) {
                return first[1].f - second[1].f
            } else {
                return first[1].h - second[1].h
            }
        })

        checkCell = checkQueue.shift()
        checkCell[1].neighbors.forEach(n => {
            if (!n[1].isWall) {
                gSetter(n[1])
                hSetter(endNode, n[1])
            }
            n[1].f = n[1].g + n[1].h;
            if (!visitedCells.includes(n[1].coordinates) && !checkQueue.includes(n) && !n[1].isWall) {
                checkQueue.push(n)
            }
            if (!n[1].isWall) {
                n[0].style.backgroundColor = "#68de7c";
            }
        })
        if (!visitedCells.includes(checkCell[1].coordinates)) visitedCells.push(checkCell[1].coordinates)
        path.push(checkCell);
    }
    path.forEach(cell => {
        cell[0].style.backgroundColor = "#1ed14b"
    })
    highlightPath(startCell, endCell)
}
```
**Build Walls**

Users freely builds the path that they want in order to challenge the algorithm. Place the start and end points wherever they
want, and build walls anywhere around them

![build wall image](https://user-images.githubusercontent.com/74022542/142084824-e859f9a1-5c91-412f-924c-5ea93ba35d4e.png)

**Shortest Path**

After the start point, end point, and the walls are built, the user then clicks on the run button notifying the project to run
the A-Star algorithm. The cells that are turned green are the cells that were checked but not chosen to be a part of the path.
The whitened cells make the path that show the shortest path.

![A-Star image](https://user-images.githubusercontent.com/74022542/142085297-1cc8e676-9834-4c67-914a-6e61edef8b78.png)
