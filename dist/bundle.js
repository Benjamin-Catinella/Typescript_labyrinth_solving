/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

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

/***/ "./src/model/Case.ts":
/*!***************************!*\
  !*** ./src/model/Case.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Case: () => (/* binding */ Case)
/* harmony export */ });
var Case = /** @class */ (function () {
    function Case(posX, posY, walls, exit, entrance) {
        this.posX = posX;
        this.posY = posY;
        this.walls = walls;
        this.exit = exit;
        this.entrance = entrance;
    }
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
/**
 * Programme de génération et completion de labyrinthe
 *
 * Notes:
 *
 * Quelques idées pour le type de data structure à utiliser pour les cases du labyrinthe:
 *
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

var labyrintheService = new _service_LabyrintheService__WEBPACK_IMPORTED_MODULE_0__.LabyrintheService();
var labyrinthes;
var htmlElements = {
    tableau: document.getElementById("tableauLabyrinthe"),
    selectTaille: document.getElementById("tailleLabyrinthe"),
    choixLabyrinthe: document.getElementById("choixLabyrinthe"),
};
var labyrintheElementsTemplates = {
    case: '<td class="case box %class%"></td>',
};
function getClassesFromCase(case_) {
    var classes = [];
    classes.push(case_.walls.top ? "mur-haut" : "");
    classes.push(case_.walls.right ? "mur-droit" : "");
    classes.push(case_.walls.bottom ? "mur-bas" : "");
    classes.push(case_.walls.left ? "mur-gauche" : "");
    classes.push(case_.exit ? "sortie" : "");
    classes.push(case_.entrance ? "entree" : "");
    return classes.join(" ");
}
function displayLabyrinthe(labyrinthe) {
    var size = labyrinthe.size;
    var cases = labyrinthe.cases;
    var html = "<table>";
    for (var i = 0; i < size.height; i++) {
        html += "<tr>";
        for (var j = 0; j < size.width; j++) {
            var index = i * size.width + j;
            var case_ = cases[index];
            html += labyrintheElementsTemplates.case.replace("%class%", getClassesFromCase(case_));
        }
        html += "</tr>";
    }
    html += "</table>";
    htmlElements.tableau.innerHTML = html;
}
function onSelectLabyrintheChange($event) {
}
function onSelectTailleChange($event) {
    var target = $event.target;
    var size = parseInt(target.value);
    labyrintheService.getAllLabyrinthesOfSize(size).then(function (labs) {
        labyrinthes = labs;
        displayLabyrinthe(labyrinthes["ex-1"]);
    });
}
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var sizes, i, option;
        return __generator(this, function (_a) {
            sizes = 25;
            htmlElements.selectTaille.addEventListener("change", onSelectTailleChange);
            htmlElements.choixLabyrinthe.addEventListener("change", onSelectLabyrintheChange);
            for (i = 2; i < sizes; i++) {
                option = document.createElement("option");
                option.value = (i + 1).toString();
                option.innerText = (i + 1).toString();
                htmlElements.selectTaille.appendChild(option);
            }
            labyrintheService.getLabyrintheOfSize(25).then(function (labyrinthe) {
                displayLabyrinthe(labyrinthe);
            });
            return [2 /*return*/];
        });
    });
}
main();

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map