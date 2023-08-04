/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/algorithm/LabyrinthSolver.ts":
/*!******************************************!*\
  !*** ./src/algorithm/LabyrinthSolver.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   LabyrinthSolver: () => (/* binding */ LabyrinthSolver)
/* harmony export */ });
/* harmony import */ var _model_Position__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../model/Position */ "./src/model/Position.ts");
/* harmony import */ var _utils_Logger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/Logger */ "./src/utils/Logger.ts");
/* harmony import */ var _service_StepService__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../service/StepService */ "./src/service/StepService.ts");



class AdjacentSquares {
}
/*
    The solver needs to return a detailed stack of steps taken to solve the labyrinth
    The Step class should contain the following information:
    - The square where the step was taken
    - What action was taken, visit or backtracking, or both

    */
class LabyrinthSolver {
    constructor() {
        this.debug = false;
        this.stepService = _service_StepService__WEBPACK_IMPORTED_MODULE_2__.StepService.getInstance();
    }
    /**
     * Finds the adjacent squares to the given square looping around the labyrinth (top, right, bottom, left)
     * @param square
     * @param squaresList
     * @returns
     */
    findAdjacentSquaresToLooparound(square, squaresList) {
        const labXLength = squaresList.map((c) => c.posX).reduce((a, b) => Math.max(a, b)) + 1;
        const labYLength = squaresList.map((c) => c.posY).reduce((a, b) => Math.max(a, b)) + 1;
        const offsets = {
            top: (((square.posY + 1) % labYLength) + labYLength) % labYLength,
            right: (((square.posX + 1) % labXLength) + labXLength) % labXLength,
            bottom: (((square.posY - 1) % labYLength) + labYLength) % labYLength,
            left: (((square.posX - 1) % labXLength) + labXLength) % labXLength,
        };
        const positions = {
            top: new _model_Position__WEBPACK_IMPORTED_MODULE_0__.Position(square.posX, offsets.top),
            bottom: new _model_Position__WEBPACK_IMPORTED_MODULE_0__.Position(square.posX, offsets.bottom),
            right: new _model_Position__WEBPACK_IMPORTED_MODULE_0__.Position(offsets.right, square.posY),
            left: new _model_Position__WEBPACK_IMPORTED_MODULE_0__.Position(offsets.left, square.posY),
        };
        const adjacentSquares = new AdjacentSquares();
        squaresList.map((square_) => {
            square_.getPosition().equals(positions.top)
                ? (adjacentSquares.top = square_)
                : undefined;
            square_.getPosition().equals(positions.right)
                ? (adjacentSquares.right = square_)
                : undefined;
            square_.getPosition().equals(positions.bottom)
                ? (adjacentSquares.bottom = square_)
                : undefined;
            square_.getPosition().equals(positions.left)
                ? (adjacentSquares.left = square_)
                : undefined;
        });
        return adjacentSquares;
    }
    /**
     * Finds all the adjacent squares to the given square (top, right, bottom, left)
     * @param square
     * @param squaresList
     * @returns
     */
    findAdjacentSquaresTo(square, squaresList) {
        const positions = {
            top: new _model_Position__WEBPACK_IMPORTED_MODULE_0__.Position(square.posX - 1, square.posY),
            bottom: new _model_Position__WEBPACK_IMPORTED_MODULE_0__.Position(square.posX + 1, square.posY),
            right: new _model_Position__WEBPACK_IMPORTED_MODULE_0__.Position(square.posX, square.posY + 1),
            left: new _model_Position__WEBPACK_IMPORTED_MODULE_0__.Position(square.posX, square.posY - 1),
        };
        const adjacentSquares = new AdjacentSquares();
        squaresList.map((square_) => {
            square_.getPosition().equals(positions.top)
                ? (adjacentSquares.top = square_)
                : undefined;
            square_.getPosition().equals(positions.right)
                ? (adjacentSquares.right = square_)
                : undefined;
            square_.getPosition().equals(positions.bottom)
                ? (adjacentSquares.bottom = square_)
                : undefined;
            square_.getPosition().equals(positions.left)
                ? (adjacentSquares.left = square_)
                : undefined;
        });
        return adjacentSquares;
    }
    getPossibleMoves(square, squaresList) {
        const possibleMoves = [];
        const adjacent = this.findAdjacentSquaresTo(square, squaresList);
        if (adjacent.top) {
            !(square.walls.top || adjacent.top.walls.bottom) &&
                !adjacent.top.isVisited()
                ? possibleMoves.push(adjacent.top)
                : null;
        }
        if (adjacent.right) {
            !(square.walls.right || adjacent.right.walls.left) &&
                !adjacent.right.isVisited()
                ? possibleMoves.push(adjacent.right)
                : null;
        }
        if (adjacent.bottom) {
            !(square.walls.bottom || adjacent.bottom.walls.top) &&
                !adjacent.bottom.isVisited()
                ? possibleMoves.push(adjacent.bottom)
                : null;
        }
        if (adjacent.left) {
            !(square.walls.left || adjacent.left.walls.right) &&
                !adjacent.left.isVisited()
                ? possibleMoves.push(adjacent.left)
                : null;
        }
        return possibleMoves;
    }
    DFS(labyrinth) {
        _utils_Logger__WEBPACK_IMPORTED_MODULE_1__.Logger.info("Solving labyrinth using DFS", labyrinth);
        const stack = [];
        // Find entrance square
        const entrance = labyrinth.squares.find((square) => square.entrance);
        if (!entrance) {
            throw new Error("No entrance found");
        }
        stack.push(entrance);
        // Call recursive
        return this.DFS_rec(stack, labyrinth, 0);
    }
    DFS_rec(stack, labyrinth, count) {
        var _a, _b;
        const currentSquare = stack[stack.length - 1];
        const squarehtml = document.getElementById(currentSquare.getId());
        if (this.debug)
            if (squarehtml)
                squarehtml.innerHTML = count.toString();
        count++; // Debug only
        if (!currentSquare.isVisited()) {
            currentSquare.visit();
            // this.stepService.labyrinthSteps[labyrinth.id].push(new Step(currentSquare, StepAction.VISIT, count));
        }
        if (currentSquare.exit) {
            return stack;
        }
        const possibleMoves = this.getPossibleMoves(currentSquare, labyrinth.squares);
        if (possibleMoves.length == 0) {
            stack.pop();
            return stack;
        }
        for (const move of possibleMoves) {
            stack.push(move);
            const newStack = this.DFS_rec(stack, labyrinth, count);
            // Pruned path
            if (newStack.length == 0) {
                if (this.debug)
                    (_a = document.getElementById(move.getId())) === null || _a === void 0 ? void 0 : _a.classList.add("purple"); // Debug only
                // this.stepService.labyrinthSteps[labyrinth.id].push(new Step(currentSquare, StepAction.BACKTRACK, count));
                stack.pop();
            }
            // Found exit
            else if (newStack[newStack.length - 1].exit) {
                return newStack;
            }
            // Is a dead end
            if (this.debug)
                (_b = document.getElementById(move.getId())) === null || _b === void 0 ? void 0 : _b.classList.add("red"); // Debug only
        }
        // Didn't find any path
        return [];
    }
    BFS(labyrinth) {
        _utils_Logger__WEBPACK_IMPORTED_MODULE_1__.Logger.info("Solving labyrinth using BFS", labyrinth);
        // Find entrance square
        const entrance = labyrinth.squares.find((square) => square.entrance);
        if (!entrance) {
            throw new Error("No entrance found");
        }
        // Call iterative function
        return this.BFS_it(labyrinth, entrance);
    }
    BFS_it(labyrinth, entrance) {
        var _a;
        const queue = [];
        const path = [];
        let count = 0;
        entrance.visit();
        queue.push(entrance);
        while (queue.length > 0) {
            const current = queue.shift();
            const neighbours = this.getPossibleMoves(current, labyrinth.squares);
            for (let neighbour of neighbours) {
                if (this.debug)
                    document.getElementById(neighbour.getId()).innerHTML = count.toString(); // Debug only
                count++;
                neighbour.setParent(current);
                if (!neighbour.isVisited()) {
                    neighbour.visit();
                    if (neighbour.exit) {
                        _utils_Logger__WEBPACK_IMPORTED_MODULE_1__.Logger.info("Found exit", neighbour);
                        while (neighbour.getParent()) {
                            path.push(neighbour);
                            neighbour = neighbour.getParent();
                        }
                        return path;
                    }
                    queue.push(neighbour);
                    if (this.debug)
                        (_a = document.getElementById(neighbour.getId())) === null || _a === void 0 ? void 0 : _a.classList.add("purple"); // Debug only
                }
            }
        }
    }
}


/***/ }),

/***/ "./src/mapping/CssMapper.ts":
/*!**********************************!*\
  !*** ./src/mapping/CssMapper.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CssMapper: () => (/* binding */ CssMapper)
/* harmony export */ });
class CssMapper {
    getClassesFromSquare(square) {
        const classes = [];
        classes.push(square.walls.top ? "wall-top" : "");
        classes.push(square.walls.right ? "wall-right" : "");
        classes.push(square.walls.bottom ? "wall-down" : "");
        classes.push(square.walls.left ? "wall-left" : "");
        classes.push(square.exit ? "exit" : "");
        classes.push(square.entrance ? "entrance" : "");
        return classes;
    }
}


/***/ }),

/***/ "./src/mapping/JsonMapper.ts":
/*!***********************************!*\
  !*** ./src/mapping/JsonMapper.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   JsonMapper: () => (/* binding */ JsonMapper)
/* harmony export */ });
/* harmony import */ var _model_Square__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../model/Square */ "./src/model/Square.ts");
/* harmony import */ var _model_Labyrinth__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../model/Labyrinth */ "./src/model/Labyrinth.ts");


class JsonMapper {
    toLabyrinth(json, size, id) {
        const _size = {
            width: size,
            height: size,
        };
        const cases = [];
        for (let i = 0; i < json.length; i++) {
            cases.push(this.toSquare(json[i]));
        }
        return new _model_Labyrinth__WEBPACK_IMPORTED_MODULE_1__.Labyrinth(id, _size, cases);
    }
    toSquare(json) {
        const entrance = json.entrance ? true : false;
        const exit = json.exit ? true : false;
        const walls = {
            top: json.walls[0],
            right: json.walls[1],
            bottom: json.walls[2],
            left: json.walls[3],
        };
        return new _model_Square__WEBPACK_IMPORTED_MODULE_0__.Square(json.posX, json.posY, walls, exit, entrance);
    }
}


/***/ }),

/***/ "./src/model/Labyrinth.ts":
/*!********************************!*\
  !*** ./src/model/Labyrinth.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Labyrinth: () => (/* binding */ Labyrinth)
/* harmony export */ });
class Labyrinth {
    constructor(id, size, squares) {
        this.id = id;
        this.size = size;
        this.squares = squares;
    }
    reset() {
        this.squares.forEach(square => {
            square.visited = false;
        });
    }
}


/***/ }),

/***/ "./src/model/Position.ts":
/*!*******************************!*\
  !*** ./src/model/Position.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Position: () => (/* binding */ Position)
/* harmony export */ });
class Position {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    equals(position) {
        return this.x == position.x && this.y == position.y;
    }
}


/***/ }),

/***/ "./src/model/Square.ts":
/*!*****************************!*\
  !*** ./src/model/Square.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Square: () => (/* binding */ Square)
/* harmony export */ });
/* harmony import */ var _Position__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Position */ "./src/model/Position.ts");

class Square {
    constructor(posX, posY, walls, exit, entrance) {
        this.visited = false;
        this.posX = posX;
        this.posY = posY;
        this.walls = walls;
        this.exit = exit;
        this.entrance = entrance;
    }
    getPosition() {
        return new _Position__WEBPACK_IMPORTED_MODULE_0__.Position(this.posX, this.posY);
    }
    getId() {
        return `${this.posX}-${this.posY}`;
    }
    isVisited() {
        return this.visited;
    }
    visit() {
        this.visited = true;
    }
    setParent(parent) {
        this.parent = parent;
        return this;
    }
    getParent() {
        return this.parent;
    }
}


/***/ }),

/***/ "./src/service/LabyrinthService.ts":
/*!*****************************************!*\
  !*** ./src/service/LabyrinthService.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   LabyrinthService: () => (/* binding */ LabyrinthService)
/* harmony export */ });
/* harmony import */ var _mapping_JsonMapper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../mapping/JsonMapper */ "./src/mapping/JsonMapper.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};

class LabyrinthService {
    constructor() {
        this.jsonMapper = new _mapping_JsonMapper__WEBPACK_IMPORTED_MODULE_0__.JsonMapper();
    }
    getListOfLabyrinthsOfSizeFromAPI(size) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `http://localhost:3000/${size}`;
            return fetch(url).then((response) => response.json());
        });
    }
    getAllLabyrinthsOfSize(size) {
        return __awaiter(this, void 0, void 0, function* () {
            const json = yield this.getListOfLabyrinthsOfSizeFromAPI(size);
            const labyrinthes = {};
            for (const key in json) {
                labyrinthes[key] = this.jsonMapper.toLabyrinth(json[key], size, key);
            }
            return labyrinthes;
        });
    }
}


/***/ }),

/***/ "./src/service/StepService.ts":
/*!************************************!*\
  !*** ./src/service/StepService.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   StepService: () => (/* binding */ StepService)
/* harmony export */ });
class StepService {
    constructor() {
        this.labyrinthSteps = {};
    }
    static getInstance() {
        if (!StepService.self) {
            StepService.self = new StepService();
        }
        return StepService.self;
    }
}


/***/ }),

/***/ "./src/utils/Logger.ts":
/*!*****************************!*\
  !*** ./src/utils/Logger.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Logger: () => (/* binding */ Logger)
/* harmony export */ });
class Logger {
    static log(...message) {
        console.log(this.logPrefix, ...message);
    }
    static info(...message) {
        console.info(this.infoPrefix, ...message);
    }
    static warn(...message) {
        console.warn(this.warnPrefix, ...message);
    }
    static error(...message) {
        console.error(this.errorPrefix, ...message);
    }
}
Logger.logPrefix = `[LOG-${new Date().toLocaleTimeString()}]`;
Logger.infoPrefix = `[INFO-${new Date().toLocaleTimeString()}]`;
Logger.warnPrefix = `[WARN-${new Date().toLocaleTimeString()}]`;
Logger.errorPrefix = `[ERROR-${new Date().toLocaleTimeString()}]`;


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
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _service_LabyrinthService__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./service/LabyrinthService */ "./src/service/LabyrinthService.ts");
/* harmony import */ var _mapping_CssMapper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./mapping/CssMapper */ "./src/mapping/CssMapper.ts");
/* harmony import */ var _utils_Logger__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils/Logger */ "./src/utils/Logger.ts");
/* harmony import */ var _algorithm_LabyrinthSolver__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./algorithm/LabyrinthSolver */ "./src/algorithm/LabyrinthSolver.ts");
/**
 * Projet de parcours de labyrinthes
 */
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};




// Services
const labyrinthService = new _service_LabyrinthService__WEBPACK_IMPORTED_MODULE_0__.LabyrinthService();
const cssMapper = new _mapping_CssMapper__WEBPACK_IMPORTED_MODULE_1__.CssMapper();
const labyrinthSolver = new _algorithm_LabyrinthSolver__WEBPACK_IMPORTED_MODULE_3__.LabyrinthSolver();
// Variables
let labyrinths;
let selectedLabyrinth;
// Constants
const htmlElements = {
    table: document.getElementById("labyrinthTable"),
    selectSize: document.getElementById("sizeSelect"),
    choixLabyrinthe: document.getElementById("labyrinthSelect"),
    runBFSButton: document.getElementById("runBFS"),
    runDFSButton: document.getElementById("runDFS"),
    debugCheckbox: document.getElementById("debugCheckbox"),
    resetButton: document.getElementById("resetButton"),
};
const squaresHTMLMap = {};
// Dom manipulation functions
function displayLabyrinth(labyrinth) {
    const size = labyrinth.size;
    const squares = labyrinth.squares;
    // Empty the table
    htmlElements.table.innerHTML = "";
    for (let i = 0; i < size.height; i++) {
        const row = document.createElement("tr");
        for (let j = 0; j < size.width; j++) {
            const index = i * size.width + j;
            const square = squares[index];
            row.appendChild(squaresHTMLMap[square.getId()]);
        }
        htmlElements.table.appendChild(row);
    }
}
function fillSelectLabyrinth() {
    htmlElements.choixLabyrinthe.innerHTML = "";
    const keys = Object.keys(labyrinths);
    keys.forEach((key) => {
        const option = document.createElement("option");
        option.value = key;
        option.innerText = key;
        htmlElements.choixLabyrinthe.appendChild(option);
    });
}
function resetLabyrinth() {
    selectedLabyrinth === null || selectedLabyrinth === void 0 ? void 0 : selectedLabyrinth.reset();
    const keys = Object.keys(squaresHTMLMap);
    keys.forEach((key) => {
        squaresHTMLMap[key].classList.remove("solution");
        squaresHTMLMap[key].classList.remove("purple");
        squaresHTMLMap[key].classList.remove("red");
        squaresHTMLMap[key].innerHTML = "";
    });
}
function populateSquaresHTMLMap(squares) {
    _utils_Logger__WEBPACK_IMPORTED_MODULE_2__.Logger.log("Populating casesHTMLMap ...");
    squares.forEach((square) => {
        const squareElement = document.createElement("td");
        squareElement.id = square.getId();
        squareElement.classList.add("square");
        squareElement.classList.add("box");
        squareElement.addEventListener("click", onSquareClick);
        cssMapper.getClassesFromSquare(square).forEach((cssClass) => {
            cssClass != "" ? squareElement.classList.add(cssClass) : null;
        });
        _utils_Logger__WEBPACK_IMPORTED_MODULE_2__.Logger.log("Adding caseElement", squareElement, "to squaresHTMLMap");
        squaresHTMLMap[square.getId()] = squareElement;
    });
    _utils_Logger__WEBPACK_IMPORTED_MODULE_2__.Logger.log("Finished populating caseHTMLMap : ", squaresHTMLMap);
}
// Event handlers
function onSelectSizeChange($event) {
    const target = $event.target;
    const size = parseInt(target.value);
    labyrinthService.getAllLabyrinthsOfSize(size).then((labs) => {
        labyrinths = labs;
        fillSelectLabyrinth();
        htmlElements.choixLabyrinthe.dispatchEvent(new Event("change"));
    });
}
function onSelectLabyrinthChange($event) {
    const target = $event.target;
    const labyrinthe = labyrinths[target.value];
    resetLabyrinth();
    selectedLabyrinth = labyrinthe;
    populateSquaresHTMLMap(labyrinthe.squares);
    displayLabyrinth(labyrinthe);
}
function onClickBFS($event) {
    var _a;
    if (selectedLabyrinth) {
        resetLabyrinth();
        (_a = labyrinthSolver.BFS(selectedLabyrinth)) === null || _a === void 0 ? void 0 : _a.forEach((square) => {
            const squareElement = squaresHTMLMap[square.getId()];
            if (!squareElement.classList.contains("exit") &&
                !squareElement.classList.contains("entrance")) {
                squareElement.classList.add("solution");
            }
        });
    }
}
function onClickDFS($event) {
    var _a;
    if (selectedLabyrinth) {
        resetLabyrinth();
        (_a = labyrinthSolver.DFS(selectedLabyrinth)) === null || _a === void 0 ? void 0 : _a.forEach((square) => {
            const squareElement = squaresHTMLMap[square.getId()];
            if (!squareElement.classList.contains("exit") &&
                !squareElement.classList.contains("entrance")) {
                squareElement.classList.add("solution");
            }
        });
    }
}
function onCheckboxChange($event) {
    labyrinthSolver.debug = $event.target.checked;
}
// Change background color of the clicked case
function onSquareClick($event) {
    const target = $event.target;
    target.classList.toggle("red");
}
function init() {
    return __awaiter(this, void 0, void 0, function* () {
        const sizes = 25;
        // Init dom elements
        htmlElements.selectSize.addEventListener("change", onSelectSizeChange);
        htmlElements.choixLabyrinthe.addEventListener("change", onSelectLabyrinthChange);
        htmlElements.runBFSButton.addEventListener("click", onClickBFS);
        htmlElements.runDFSButton.addEventListener("click", onClickDFS);
        htmlElements.debugCheckbox.addEventListener("change", onCheckboxChange);
        htmlElements.resetButton.addEventListener("click", resetLabyrinth);
        for (let i = 2; i < sizes; i++) {
            const option = document.createElement("option");
            option.value = (i + 1).toString();
            option.innerText = (i + 1).toString();
            htmlElements.selectSize.appendChild(option);
        }
        htmlElements.selectSize.dispatchEvent(new Event("change"));
        labyrinthSolver.debug = htmlElements.debugCheckbox.checked;
    });
}
init();

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map