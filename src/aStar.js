

export const aStar = (grid) => {
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[0].length; j++) {
            console.log(`[${i},${j}] ${grid[i][j].innerHTML}`)
        }
    }
}