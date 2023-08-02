/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

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
    toLabyrinth(json, size) {
        const _size = {
            width: size,
            height: size,
        };
        const cases = [];
        for (let i = 0; i < json.length; i++) {
            cases.push(this.toSquare(json[i]));
        }
        return new _model_Labyrinth__WEBPACK_IMPORTED_MODULE_1__.Labyrinth(_size, cases);
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

/***/ "./src/mapping/LabyrinthSolver.ts":
/*!****************************************!*\
  !*** ./src/mapping/LabyrinthSolver.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   LabyrinthSolver: () => (/* binding */ LabyrinthSolver)
/* harmony export */ });
/* harmony import */ var _model_Position__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../model/Position */ "./src/model/Position.ts");
/* harmony import */ var _utils_Logger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/Logger */ "./src/utils/Logger.ts");


class AdjacentSquares {
}
/*
The solver needs to return a stack of moves to play for the view to use.
The idea is that if we have a stack like this :
[
    entrance,
    square1,
    ..2,
    ..3,
    ..4,
    ..5,
    ..,
    exit
]
The view can then process this stack as needed for animations/coloring/maybe timeline and such
*/
class LabyrinthSolver {
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
            left: (((square.posX - 1) % labXLength) + labXLength) % labXLength
        };
        const positions = {
            top: new _model_Position__WEBPACK_IMPORTED_MODULE_0__.Position(square.posX, offsets.top),
            bottom: new _model_Position__WEBPACK_IMPORTED_MODULE_0__.Position(square.posX, offsets.bottom),
            right: new _model_Position__WEBPACK_IMPORTED_MODULE_0__.Position(offsets.right, square.posY),
            left: new _model_Position__WEBPACK_IMPORTED_MODULE_0__.Position(offsets.left, square.posY),
        };
        const adjacentSquares = squaresList.filter((square_) => {
            return (square_.getPosition().equals(positions.top) ||
                square_.getPosition().equals(positions.right) ||
                square_.getPosition().equals(positions.bottom) ||
                square_.getPosition().equals(positions.left));
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
        const adjacentSquares = new AdjacentSquares;
        squaresList.map((square_) => {
            square_.getPosition().equals(positions.top) ? adjacentSquares.top = square_ : undefined;
            square_.getPosition().equals(positions.right) ? adjacentSquares.right = square_ : undefined;
            square_.getPosition().equals(positions.bottom) ? adjacentSquares.bottom = square_ : undefined;
            square_.getPosition().equals(positions.left) ? adjacentSquares.left = square_ : undefined;
        });
        return adjacentSquares;
    }
    getPossibleMovesInAdjacentSquares(square, adjacent) {
        const possibleMoves = [];
        if (adjacent.top) {
            !(square.walls.top || adjacent.top.walls.bottom) && !adjacent.top.isVisited() ? possibleMoves.push(adjacent.top) : null;
        }
        if (adjacent.right) {
            !(square.walls.right || adjacent.right.walls.left) && !adjacent.right.isVisited() ? possibleMoves.push(adjacent.right) : null;
        }
        if (adjacent.bottom) {
            !(square.walls.bottom || adjacent.bottom.walls.top) && !adjacent.bottom.isVisited() ? possibleMoves.push(adjacent.bottom) : null;
        }
        if (adjacent.left) {
            !(square.walls.left || adjacent.left.walls.right) && !adjacent.left.isVisited() ? possibleMoves.push(adjacent.left) : null;
        }
        return possibleMoves;
    }
    solve(labyrinth) {
        _utils_Logger__WEBPACK_IMPORTED_MODULE_1__.Logger.info("Solving labyrinth", labyrinth);
        const stack = [];
        const entrance = labyrinth.find((square) => square.entrance);
        _utils_Logger__WEBPACK_IMPORTED_MODULE_1__.Logger.info("Entrance", entrance);
        if (!entrance) {
            throw new Error("No entrance found");
        }
        // Find entrance square
        stack.push(entrance);
        // Call recursive
        return this.solveRec(stack, labyrinth);
    }
    solveRec(stack, labyrinth) {
        // Sets as visited
        const square = stack[stack.length - 1];
        _utils_Logger__WEBPACK_IMPORTED_MODULE_1__.Logger.info("Visiting", square);
        square.visit();
        // If no possible moves, dead-end, removes itself from the stack, return; see later for 'win condition'
        const possibleMoves = this.getPossibleMovesInAdjacentSquares(square, this.findAdjacentSquaresTo(square, labyrinth));
        if (square.exit) {
            _utils_Logger__WEBPACK_IMPORTED_MODULE_1__.Logger.info("Found exit");
            return stack;
        }
        if (possibleMoves.length == 0) {
            _utils_Logger__WEBPACK_IMPORTED_MODULE_1__.Logger.info("Met dead-end", square);
            stack.pop();
            return stack;
        }
        // Push the move(s) to the stack and recurse
        possibleMoves.forEach(move => {
            stack.push(move);
            return this.solveRec(stack, labyrinth);
        });
        if (stack[stack.length - 1].exit) {
            return stack;
        }
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
    constructor(size, squares) {
        this.size = size;
        this.squares = squares;
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
    getLabyrinthOfSize(size) {
        return __awaiter(this, void 0, void 0, function* () {
            const json = yield this.getListOfLabyrinthsOfSizeFromAPI(size);
            return this.jsonMapper.toLabyrinth(json["ex-0"], size);
        });
    }
    getAllLabyrinthsOfSize(size) {
        return __awaiter(this, void 0, void 0, function* () {
            const json = yield this.getListOfLabyrinthsOfSizeFromAPI(size);
            const labyrinthes = {};
            for (const key in json) {
                labyrinthes[key] = this.jsonMapper.toLabyrinth(json[key], size);
            }
            return labyrinthes;
        });
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
/* harmony import */ var _mapping_LabyrinthSolver__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./mapping/LabyrinthSolver */ "./src/mapping/LabyrinthSolver.ts");
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
const labyrinthSolver = new _mapping_LabyrinthSolver__WEBPACK_IMPORTED_MODULE_3__.LabyrinthSolver();
// Variables
let labyrinths;
let selectedLabyrinth;
// Constants
const htmlElements = {
    table: document.getElementById("labyrinthTable"),
    selectSize: document.getElementById("sizeSelect"),
    choixLabyrinthe: document.getElementById("labyrinthSelect"),
    runSolverButton: document.getElementById("runSolver"),
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
function populateSquaresHTMLMap(squares) {
    _utils_Logger__WEBPACK_IMPORTED_MODULE_2__.Logger.log("Populating casesHTMLMap ...");
    squares.forEach((square) => {
        const squareElement = document.createElement("td");
        squareElement.id = square.getId();
        squareElement.classList.add("square");
        squareElement.classList.add("box");
        squareElement.addEventListener("click", onCaseClick);
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
    selectedLabyrinth = labyrinthe;
    populateSquaresHTMLMap(labyrinthe.squares);
    displayLabyrinth(labyrinthe);
}
function onClickRunSolver($event) {
    var _a;
    if (selectedLabyrinth) {
        (_a = labyrinthSolver.solve(selectedLabyrinth.squares)) === null || _a === void 0 ? void 0 : _a.forEach((square) => {
            squaresHTMLMap[square.getId()].classList.add("solution");
        });
    }
}
// Change background color of the clicked case
function onCaseClick($event) {
    const target = $event.target;
    target.classList.toggle("red");
}
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const sizes = 25;
        htmlElements.selectSize.addEventListener("change", onSelectSizeChange);
        htmlElements.choixLabyrinthe.addEventListener("change", onSelectLabyrinthChange);
        htmlElements.runSolverButton.addEventListener("click", onClickRunSolver);
        for (let i = 2; i < sizes; i++) {
            const option = document.createElement("option");
            option.value = (i + 1).toString();
            option.innerText = (i + 1).toString();
            htmlElements.selectSize.appendChild(option);
        }
        htmlElements.selectSize.dispatchEvent(new Event("change"));
    });
}
main();

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map