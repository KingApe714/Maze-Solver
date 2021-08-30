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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _aStar_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./aStar.js */ \"./src/aStar.js\");\n\n\n\nclass Maze {\n    constructor(){\n        this.startMaze = this.startMaze.bind(this); \n    }\n\n    startMaze(){\n        this.buildMaze()\n    }\n    buildMaze() {\n        const testOuterDiv = document.querySelector(\".test-outer-div\")\n        const startButton = document.querySelector(\".start-button\")\n        const endButton = document.querySelector(\".end-button\")\n\n        let startSelected = false;\n        let endSelected = false;\n        startButton.addEventListener('click', () => {\n            startSelected = true;\n            endSelected = false;\n        })\n        endButton.addEventListener('click', () => {\n            endSelected = true;\n            startSelected = false;\n        })\n\n        testOuterDiv.style.position = \"relative\"\n        const grid = []\n        let start = ''\n        let end = ''\n        for (let i = 0; i < 10; i++) {\n            let row = []\n            for (let j = 0; j < 10; j++) {\n                let cell = document.createElement('div')\n                cell.style.position = \"absolute\"\n                cell.style.height = \"50px\";\n                cell.style.width = \"50px\";\n                cell.style.border = \"1px solid black\";\n                cell.style.backgroundColor = \"red\";\n                cell.style.left = j * 50 + \"px\";\n                cell.style.top = i * 50 + \"px\";\n                cell.innerHTML = `[${i}, ${j}]`\n\n                cell.addEventListener('click', () => {\n                    if (startSelected) {\n                        cell.style.backgroundColor = \"blue\"\n                        endSelected = false;\n                        if (start) {\n                            grid[parseInt(start[0])][parseInt(start[2])][0].style.backgroundColor = \"red\"\n                        }\n                        start = `${i},${j}`\n                    } else if (endSelected) {\n                        cell.style.backgroundColor = \"yellow\"\n                        startSelected = false;\n                        if (end) {\n                            grid[parseInt(end[0])][parseInt(end[2])][0].style.backgroundColor = \"red\"\n                        }\n                        end = `${i},${j}`\n                    }\n                })\n                row.push(cell)\n                testOuterDiv.appendChild(cell)\n            }\n            grid.push(row)\n        }\n        (0,_aStar_js__WEBPACK_IMPORTED_MODULE_0__.aStar)(grid, start, end)\n    }\n\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Maze);\n\n//# sourceURL=webpack:///./src/MazeGame.js?");

/***/ }),

/***/ "./src/aStar.js":
/*!**********************!*\
  !*** ./src/aStar.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"aStar\": () => (/* binding */ aStar)\n/* harmony export */ });\n\nfunction node(value, coordinates) {\n    this.parent = null;\n    this.neighbors = [];\n    this.g = 0;\n    this.h = 0;\n    this.f = 0;\n    this.value = value;\n    this.coordinates = coordinates;\n    this.startPoint = false;\n    this.endPoint = false;\n    this.wall = false;\n}\n\nconst aStar = (grid, startPoint, endPoint) => {\n    //set up neighbor check\n    const nCheck = [\n        [-1, -1],\n        [-1, 0],\n        [-1, 1],\n        [1, -1],\n        [1, 0],\n        [1, 1],\n        [0, 1],\n        [0, -1]\n    ]\n    for (let i = 0; i < grid.length; i++) {\n        for (let j = 0; j < grid[0].length; j++) {\n            console.log(`[${i},${j}] ${grid[i][j].innerHTML}`)\n            let arr = []\n            arr.push(grid[i][j])\n            arr.push(new node(grid[i][j].innerHTML, `${i},${j}`))\n            grid[i][j] = arr\n        }\n    }\n    for (let i = 0; i < grid.length; i++) {\n        for (let j = 0; j < grid[0].length; j++) {\n            //set up neighbors\n            nCheck.forEach(n => {\n                let x = n[0] + i;\n                let y = n[1] + j;\n                //handle edge cases\n                if (x >= 0 && x < grid.length && y >= 0 && y < grid[0].length) {\n                    grid[i][j][1].neighbors.push(grid[x][y])\n                }\n            })\n        }\n    }\n}\n\n//# sourceURL=webpack:///./src/aStar.js?");

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