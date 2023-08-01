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
var CssMapper = /** @class */ (function () {
    function CssMapper() {
    }
    CssMapper.prototype.getClassesFromCase = function (case_) {
        var classes = [];
        classes.push(case_.walls.top ? "mur-haut" : "");
        classes.push(case_.walls.right ? "mur-droit" : "");
        classes.push(case_.walls.bottom ? "mur-bas" : "");
        classes.push(case_.walls.left ? "mur-gauche" : "");
        classes.push(case_.exit ? "sortie" : "");
        classes.push(case_.entrance ? "entree" : "");
        return classes;
    };
    return CssMapper;
}());



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
/* harmony import */ var _model_Case__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../model/Case */ "./src/model/Case.ts");
/* harmony import */ var _model_Labyrinthe__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../model/Labyrinthe */ "./src/model/Labyrinthe.ts");


var JsonMapper = /** @class */ (function () {
    function JsonMapper() {
    }
    JsonMapper.prototype.toLabyrinthe = function (json, size) {
        var _size = {
            width: size,
            height: size,
        };
        var cases = [];
        for (var i = 0; i < json.length; i++) {
            cases.push(this.toCase(json[i]));
        }
        return new _model_Labyrinthe__WEBPACK_IMPORTED_MODULE_1__.Labyrinthe(_size, cases);
    };
    JsonMapper.prototype.toCase = function (json) {
        var entrance = json.entrance ? true : false;
        var exit = json.exit ? true : false;
        var walls = {
            top: json.walls[0],
            right: json.walls[1],
            bottom: json.walls[2],
            left: json.walls[3],
        };
        return new _model_Case__WEBPACK_IMPORTED_MODULE_0__.Case(json.posX, json.posY, walls, exit, entrance);
    };
    return JsonMapper;
}());



/***/ }),

/***/ "./src/mapping/NodeCaseMapper.ts":
/*!***************************************!*\
  !*** ./src/mapping/NodeCaseMapper.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   NodeCaseMapper: () => (/* binding */ NodeCaseMapper)
/* harmony export */ });
/* harmony import */ var _model_Position__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../model/Position */ "./src/model/Position.ts");
/* harmony import */ var _utils_Logger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/Logger */ "./src/utils/Logger.ts");


var NodeCaseMapper = /** @class */ (function () {
    function NodeCaseMapper() {
    }
    NodeCaseMapper.prototype.findAdjacentCasesTo = function (case_, casesList) {
        _utils_Logger__WEBPACK_IMPORTED_MODULE_1__.Logger.info(case_);
        _utils_Logger__WEBPACK_IMPORTED_MODULE_1__.Logger.info(casesList);
        // Trouver la case dans la liste par rapport à sa position (pas forcément, on s'en fout de sa position)
        // Définir la taille du tableau en prenant l'index maximal de chaque côtés (ou passer carrément la taille du labyrinthe)
        var labXLength = casesList.map(function (c) { return c.posX; }).reduce(function (a, b) { return Math.max(a, b); }) + 1;
        var labYLength = casesList.map(function (c) { return c.posY; }).reduce(function (a, b) { return Math.max(a, b); }) + 1;
        var offsets = {
            top: (((case_.posY + 1) % labYLength) + labYLength) % labYLength,
            right: (((case_.posX + 1) % labXLength) + labXLength) % labXLength,
            bottom: (((case_.posY - 1) % labYLength) + labYLength) % labYLength,
            left: (((case_.posX - 1) % labXLength) + labXLength) % labXLength
        };
        var positions = {
            top: new _model_Position__WEBPACK_IMPORTED_MODULE_0__.Position(case_.posX, offsets.top),
            bottom: new _model_Position__WEBPACK_IMPORTED_MODULE_0__.Position(case_.posX, offsets.bottom),
            right: new _model_Position__WEBPACK_IMPORTED_MODULE_0__.Position(offsets.right, case_.posY),
            left: new _model_Position__WEBPACK_IMPORTED_MODULE_0__.Position(offsets.left, case_.posY),
        };
        _utils_Logger__WEBPACK_IMPORTED_MODULE_1__.Logger.info(offsets);
        _utils_Logger__WEBPACK_IMPORTED_MODULE_1__.Logger.info(positions);
        // Trouver les cases ayant un index vertical et horizontal de +1 -1 % tailleDuTableau pour loop
        var adjacentCases = casesList.filter(function (c) {
            return (c.getPosition().equals(positions.top) ||
                c.getPosition().equals(positions.right) ||
                c.getPosition().equals(positions.bottom) ||
                c.getPosition().equals(positions.left));
        });
        _utils_Logger__WEBPACK_IMPORTED_MODULE_1__.Logger.info('adjacentCases:', adjacentCases);
        // Retour
        return adjacentCases;
    };
    return NodeCaseMapper;
}());



/***/ }),

/***/ "./src/model/Case.ts":
/*!***************************!*\
  !*** ./src/model/Case.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Case: () => (/* binding */ Case)
/* harmony export */ });
/* harmony import */ var _Position__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Position */ "./src/model/Position.ts");

var Case = /** @class */ (function () {
    function Case(posX, posY, walls, exit, entrance) {
        this.posX = posX;
        this.posY = posY;
        this.walls = walls;
        this.exit = exit;
        this.entrance = entrance;
    }
    Case.prototype.getPosition = function () {
        return new _Position__WEBPACK_IMPORTED_MODULE_0__.Position(this.posX, this.posY);
    };
    Case.prototype.getId = function () {
        return "".concat(this.posX, "-").concat(this.posY);
    };
    return Case;
}());



/***/ }),

/***/ "./src/model/Labyrinthe.ts":
/*!*********************************!*\
  !*** ./src/model/Labyrinthe.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Labyrinthe: () => (/* binding */ Labyrinthe)
/* harmony export */ });
var Labyrinthe = /** @class */ (function () {
    function Labyrinthe(size, cases) {
        this.size = size;
        this.cases = cases;
    }
    return Labyrinthe;
}());



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
var Position = /** @class */ (function () {
    function Position(x, y) {
        this.x = x;
        this.y = y;
    }
    Position.prototype.equals = function (position) {
        return this.x == position.x && this.y == position.y;
    };
    return Position;
}());



/***/ }),

/***/ "./src/service/LabyrintheService.ts":
/*!******************************************!*\
  !*** ./src/service/LabyrintheService.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   LabyrintheService: () => (/* binding */ LabyrintheService)
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
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};

var LabyrintheService = /** @class */ (function () {
    function LabyrintheService() {
        this.jsonMapper = new _mapping_JsonMapper__WEBPACK_IMPORTED_MODULE_0__.JsonMapper();
    }
    LabyrintheService.prototype.getListOfLabyrintheOfSizeFromAPI = function (size) {
        return __awaiter(this, void 0, void 0, function () {
            var url;
            return __generator(this, function (_a) {
                url = "http://localhost:3000/".concat(size);
                return [2 /*return*/, fetch(url).then(function (response) { return response.json(); })];
            });
        });
    };
    LabyrintheService.prototype.getLabyrintheOfSize = function (size) {
        return __awaiter(this, void 0, void 0, function () {
            var json;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getListOfLabyrintheOfSizeFromAPI(size)];
                    case 1:
                        json = _a.sent();
                        return [2 /*return*/, this.jsonMapper.toLabyrinthe(json["ex-1"], size)];
                }
            });
        });
    };
    LabyrintheService.prototype.getAllLabyrinthesOfSize = function (size) {
        return __awaiter(this, void 0, void 0, function () {
            var json, labyrinthes, key;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getListOfLabyrintheOfSizeFromAPI(size)];
                    case 1:
                        json = _a.sent();
                        labyrinthes = {};
                        for (key in json) {
                            labyrinthes[key] = this.jsonMapper.toLabyrinthe(json[key], size);
                        }
                        return [2 /*return*/, labyrinthes];
                }
            });
        });
    };
    return LabyrintheService;
}());



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
var __spreadArray = (undefined && undefined.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var Logger = /** @class */ (function () {
    function Logger() {
    }
    Logger.log = function () {
        var message = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            message[_i] = arguments[_i];
        }
        console.log.apply(console, __spreadArray([this.logPrefix], message, false));
    };
    Logger.info = function () {
        var message = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            message[_i] = arguments[_i];
        }
        console.info.apply(console, __spreadArray([this.infoPrefix], message, false));
    };
    Logger.warn = function () {
        var message = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            message[_i] = arguments[_i];
        }
        console.warn.apply(console, __spreadArray([this.warnPrefix], message, false));
    };
    Logger.error = function () {
        var message = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            message[_i] = arguments[_i];
        }
        console.error.apply(console, __spreadArray([this.errorPrefix], message, false));
    };
    Logger.logPrefix = "[LOG-".concat(new Date().toLocaleTimeString(), "]");
    Logger.infoPrefix = "[INFO-".concat(new Date().toLocaleTimeString(), "]");
    Logger.warnPrefix = "[WARN-".concat(new Date().toLocaleTimeString(), "]");
    Logger.errorPrefix = "[ERROR-".concat(new Date().toLocaleTimeString(), "]");
    return Logger;
}());


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
/* harmony import */ var _service_LabyrintheService__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./service/LabyrintheService */ "./src/service/LabyrintheService.ts");
/* harmony import */ var _mapping_CssMapper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./mapping/CssMapper */ "./src/mapping/CssMapper.ts");
/* harmony import */ var _mapping_NodeCaseMapper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./mapping/NodeCaseMapper */ "./src/mapping/NodeCaseMapper.ts");
/* harmony import */ var _utils_Logger__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils/Logger */ "./src/utils/Logger.ts");
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
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};




// Services
var labyrintheService = new _service_LabyrintheService__WEBPACK_IMPORTED_MODULE_0__.LabyrintheService();
var cssMapper = new _mapping_CssMapper__WEBPACK_IMPORTED_MODULE_1__.CssMapper();
var nodeCaseMapper = new _mapping_NodeCaseMapper__WEBPACK_IMPORTED_MODULE_2__.NodeCaseMapper();
// Variables
var labyrinthes;
// Constants
var htmlElements = {
    tableau: document.getElementById("tableauLabyrinthe"),
    selectTaille: document.getElementById("tailleLabyrinthe"),
    choixLabyrinthe: document.getElementById("choixLabyrinthe"),
};
var casesHTMLMap = {};
// Dom manipulation functions
function displayLabyrinthe(labyrinthe) {
    var size = labyrinthe.size;
    var cases = labyrinthe.cases;
    // Empty the table
    htmlElements.tableau.innerHTML = "";
    for (var i = 0; i < size.height; i++) {
        var row = document.createElement("tr");
        for (var j = 0; j < size.width; j++) {
            var index = i * size.width + j;
            var case_ = cases[index];
            row.appendChild(casesHTMLMap[case_.getId()]);
        }
        htmlElements.tableau.appendChild(row);
    }
}
function fillSelectLabyrinthe() {
    htmlElements.choixLabyrinthe.innerHTML = "";
    var keys = Object.keys(labyrinthes);
    keys.forEach(function (key) {
        var option = document.createElement("option");
        option.value = key;
        option.innerText = key;
        htmlElements.choixLabyrinthe.appendChild(option);
    });
}
function populateCasesHTMLMap(cases) {
    _utils_Logger__WEBPACK_IMPORTED_MODULE_3__.Logger.log("Populating casesHTMLMap ...");
    cases.forEach(function (case_) {
        var caseElement = document.createElement("td");
        caseElement.id = case_.getId();
        caseElement.classList.add("case");
        caseElement.classList.add("box");
        caseElement.addEventListener("click", onCaseClick);
        cssMapper.getClassesFromCase(case_).forEach(function (cssClass) {
            cssClass != "" ? caseElement.classList.add(cssClass) : null;
        });
        _utils_Logger__WEBPACK_IMPORTED_MODULE_3__.Logger.log("Adding caseElement", caseElement, "to casesHTMLMap");
        casesHTMLMap[case_.getId()] = caseElement;
    });
    _utils_Logger__WEBPACK_IMPORTED_MODULE_3__.Logger.log("Finished populating caseHTMLMap : ", casesHTMLMap);
}
// Event handlers
function onSelectTailleChange($event) {
    var target = $event.target;
    var size = parseInt(target.value);
    labyrintheService.getAllLabyrinthesOfSize(size).then(function (labs) {
        _utils_Logger__WEBPACK_IMPORTED_MODULE_3__.Logger.info("Labyrinthes", labs);
        labyrinthes = labs;
        fillSelectLabyrinthe();
        htmlElements.choixLabyrinthe.dispatchEvent(new Event("change"));
    });
}
function onSelectLabyrintheChange($event) {
    var target = $event.target;
    var labyrinthe = labyrinthes[target.value];
    populateCasesHTMLMap(labyrinthe.cases);
    displayLabyrinthe(labyrinthe);
}
function treeSolver() {
    /**
     * Convertir le labyrinth en graphe
     * Partir de la première node
     * Si la node est la sortie, finir et remonter nombre de pas
     * Si la node a déjà été visitée, remonter 0
     * Si la node est un cul de sac, remonter 0
     * Passer à la node suivante
     */
}
function treeSolverRecursive() {
}
// Change background color of the clicked case
function onCaseClick($event) {
    var target = $event.target;
    target.classList.toggle("red");
}
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var sizes, i, option;
        return __generator(this, function (_a) {
            sizes = 25;
            htmlElements.selectTaille.addEventListener("change", onSelectTailleChange);
            // Trigger the event (select size 3 by default)
            htmlElements.choixLabyrinthe.addEventListener("change", onSelectLabyrintheChange);
            for (i = 2; i < sizes; i++) {
                option = document.createElement("option");
                option.value = (i + 1).toString();
                option.innerText = (i + 1).toString();
                htmlElements.selectTaille.appendChild(option);
            }
            htmlElements.selectTaille.dispatchEvent(new Event("change"));
            return [2 /*return*/];
        });
    });
}
main();

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map