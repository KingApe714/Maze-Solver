/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/MazeGame.js":
/*!*************************!*\
  !*** ./src/MazeGame.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _aStar_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./aStar.js */ \"./src/aStar.js\");\n\n\nclass Maze {\n    constructor(){\n        this.startMaze = this.startMaze.bind(this); \n    }\n\n    startMaze(){\n        this.buildMaze()\n    }\n    buildMaze() {\n        const testOuterDiv = document.querySelector(\".test-outer-div\")\n        const startButton = document.querySelector(\".start-button\")\n        const endButton = document.querySelector(\".end-button\")\n        const wallButton = document.querySelector(\".wall-button\")\n        const goButton = document.querySelector(\".go-button\")\n\n        testOuterDiv.style.position = \"relative\"\n\n        //tiles are the divs\n        //nodes are the nodes\n        //and the cells hold both the tiles and the nodes in an array length 2\n\n        let startSelected = false;\n        let endSelected = false;\n        let wallSelected = false;\n\n        let startTile, endTile;\n\n        startButton.addEventListener('click', () => {\n            startSelected = true;\n            endSelected = false;\n            wallSelected = false;\n        })\n        endButton.addEventListener('click', () => {\n            endSelected = true;\n            startSelected = false;\n            wallSelected = false\n        })\n        wallButton.addEventListener('click', () => {\n            wallSelected = true\n            startSelected = false;\n            endSelected = false;\n        })\n        \n        const grid = []\n        let start = ''\n        let end = ''\n        let wallCells = []\n        \n        let mouseDown = false\n        testOuterDiv.addEventListener(mouseDown, () => {\n            mouseDown = true;\n        })\n        for (let i = 0; i < 15; i++) {\n            let row = []\n            for (let j = 0; j < 20; j++) {\n                let tile = document.createElement('div')\n                tile.className = \"tile\";\n                tile.style.left = j * 45 + \"px\";\n                tile.style.top = i * 45 + \"px\";\n                // tile.innerHTML = `[${i}, ${j}]`\n                \n                let innerTile = document.createElement('div')\n                innerTile.className = \"innerTile\"\n\n                tile.addEventListener('click', () => {\n                    if (startSelected) {\n                        tile.style.backgroundColor = \"blue\"\n                        endSelected = false;\n                        if (start) {\n                            let [sX, sY] = start.split(',')\n                            grid[sX][sY][0].style.backgroundColor = \"red\"\n                            grid[sX][sY][1].startPoint = false;\n                        }\n                        grid[i][j][1].startPoint = true\n                        startTile = tile;\n                        start = `${i},${j}`\n                    } else if (endSelected) {\n                        tile.style.backgroundColor = \"yellow\"\n                        startSelected = false;\n                        if (end) {\n                            let [eX, eY] = end.split(',')\n                            grid[eX][eY][0].style.backgroundColor = \"red\"\n                            grid[eX][eY][1].endPoint = false;\n                        }\n                        grid[i][j][1].endPoint = true;\n                        endTile = tile;\n                        end = `${i},${j}`\n                    }\n                })\n\n                tile.addEventListener('mousedown', () => {\n                    mouseDown = true;\n                    if (wallSelected) wallHandler()\n                })\n                tile.addEventListener('mousemove', () => {\n                    if (mouseDown && wallSelected) {\n                        wallHandler()\n                    }\n                })\n                \n                const wallHandler = () => {\n                    tile.style.backgroundColor = \"purple\";\n                    grid[i][j][1].isWall = true;\n                    if (!wallCells.includes(grid[i][j])) {\n                        if ((startTile && tile !== startTile) && (endTile && tile !== endTile)) {\n                            wallCells.push(grid[i][j])\n                        }\n                    }\n                }\n\n                tile.addEventListener('mouseup', () => {\n                    mouseDown = false\n                })\n\n                row.push(tile)\n                testOuterDiv.appendChild(tile)\n            }\n            grid.push(row)\n        }\n        \n        (0,_aStar_js__WEBPACK_IMPORTED_MODULE_0__.setUpGrid)(grid)\n\n        goButton.addEventListener('click', () => {\n            let [sX, sY] = start.split(',')\n            let [eX, eY] = end.split(',')\n            startTile = grid[sX][sY]\n            endTile = grid[eX][eY]\n            ;(0,_aStar_js__WEBPACK_IMPORTED_MODULE_0__.aStar)(startTile, endTile, wallCells)\n        })\n\n        // console.log(grid)\n    }\n    \n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Maze);\n\n//# sourceURL=webpack:///./src/MazeGame.js?");

/***/ }),

/***/ "./src/aStar.js":
/*!**********************!*\
  !*** ./src/aStar.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"setUpGrid\": () => (/* binding */ setUpGrid),\n/* harmony export */   \"aStar\": () => (/* binding */ aStar)\n/* harmony export */ });\n\nfunction node(value, coordinates) {\n    this.parent = null;\n    this.neighbors = [];\n    this.g = null;\n    this.h = 0;\n    this.f = 0;\n    this.value = value;\n    this.coordinates = coordinates;\n    this.startPoint = false;\n    this.endPoint = false;\n    this.isWall = false;\n}\n\nconst setUpGrid = (grid) => {\n    //set up neighbor check\n    const nCheck = [\n        [-1, -1],\n        [-1, 0],\n        [-1, 1],\n        [1, -1],\n        [1, 0],\n        [1, 1],\n        [0, 1],\n        [0, -1]\n    ]\n    for (let i = 0; i < grid.length; i++) {\n        for (let j = 0; j < grid[0].length; j++) {\n            let arr = []\n            arr.push(grid[i][j])\n            arr.push(new node(grid[i][j].innerHTML, `${i},${j}`))\n            grid[i][j] = arr\n        }\n    }\n    for (let i = 0; i < grid.length; i++) {\n        for (let j = 0; j < grid[0].length; j++) {\n\n            //set up neighbors\n            nCheck.forEach(n => {\n                let x = n[0] + i;\n                let y = n[1] + j;\n                //handle edge cases\n                if (x >= 0 && x < grid.length && y >= 0 && y < grid[0].length) {\n                    grid[i][j][1].neighbors.push(grid[x][y])\n                }\n            })\n        }\n    }\n}\n\n//cells have both the node and the div in them\n//nodes are just the nodes by themselves\nconst aStar = (startCell, endCell, wallCells) => {\n    //node is in position 1\n    gSetter(startCell[1])\n    hSetter(endCell[1], startCell[1])\n\n    let checkCell = startCell;\n    let startNode = startCell[1];\n    let endNode = endCell[1];\n\n    let path = [];\n    let visitedCells = [];\n    let checkQueue = [checkCell];\n\n    visitedCells.push(startCell[1].coordinates)\n    path.push(startCell)\n    while (checkCell[1] !== endNode) {\n        checkQueue.sort((first, second) => {\n            if (first[1].f !== second[1].f) {\n                return first[1].f - second[1].f\n            } else {\n                return first[1].h - second[1].h\n            }\n        })\n\n        checkCell = checkQueue.shift()\n        checkCell[1].neighbors.forEach(n => {\n            if (!n[1].isWall) {\n                gSetter(n[1])\n                hSetter(endNode, n[1])\n            }\n\n            n[1].f = n[1].g + n[1].h;\n            n[0].innerHTML += `<br> g:${n[1].g} <br> h:${n[1].h} <br> f:${n[1].f}`\n\n            if (!visitedCells.includes(n[1].coordinates) && !checkQueue.includes(n) && !n[1].isWall) {\n                checkQueue.push(n)\n            }\n            if (!n[1].isWall) n[0].style.backgroundColor = \"cyan\";\n        })\n        if (!visitedCells.includes(checkCell[1].coordinates)) visitedCells.push(checkCell[1].coordinates)\n        path.push(checkCell);\n    }\n    path.forEach(cell => {\n        cell[0].style.backgroundColor = \"orange\"\n    })\n\n    highlightPath(startCell, endCell)\n}\n\nfunction highlightPath(startCell, endCell) {\n    let currentCell = endCell;\n    while (currentCell !== startCell) {\n        currentCell[0].style.backgroundColor = \"white\"\n\n        if (currentCell[0].innerHTML[currentCell[0].innerHTML.length - 1] == ']') currentCell[0].innerHTML += `g = ${currentCell[1].g}`\n\n        let cellCheck = null;\n        currentCell[1].neighbors.forEach(n => {\n            // console.log(cellCheck)\n            if (n[1].g !== null && !n[1].isWall && (cellCheck === null || cellCheck[1].g > n[1].g)) {\n                cellCheck = n\n            }\n        })\n        currentCell = cellCheck;\n    }\n    startCell[0].style.backgroundColor = \"white\"\n}\n\nfunction gSetter(node) {\n    let [nodeX, nodeY] = node.coordinates.split(',')\n\n    node.neighbors.forEach(n => {\n        let [nX, nY] = n[1].coordinates.split(',')\n\n        if (n[1].g === null) n[1].g = 0\n\n        if (nodeX === nX || nodeY === nY) {\n            if (!n[1].startPoint && (node.g + 10 < n[1].g || n[1].g === 0)) {\n                n[1].g = node.g + 10\n            }\n        } else if (nodeX !== nX && nodeY !== nY) {\n            if (!n[1].startPoint && (node.g + 14 < n[1].g || n[1].g === 0)) {\n                n[1].g = node.g + 14\n            }\n        }\n    })\n}\n\nfunction hSetter(endNode, node) {\n    let [endX, endY] = endNode.coordinates.split(',')\n    let [nodeX, nodeY] = node.coordinates.split(',')\n\n    let deltaX = Math.abs(endX - nodeX);\n    let deltaY = Math.abs(endY - nodeY);\n\n    let adj = Math.abs(deltaX - deltaY);\n    let diag = Math.min(deltaX, deltaY);\n\n    node.h = (adj * 10) + (diag * 14);\n}\n\n//# sourceURL=webpack:///./src/aStar.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _MazeGame_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./MazeGame.js */ \"./src/MazeGame.js\");\n //Handles all logic for your maze\n\ndocument.addEventListener(\"DOMContentLoaded\", ()=> {\n    const maze = new _MazeGame_js__WEBPACK_IMPORTED_MODULE_0__.default(); //maze is a class that exists inside of MazeGameLogic.js \n    \n    maze.startMaze(); \n})\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;