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
/* harmony import */ var _mapping_JsonMapper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./mapping/JsonMapper */ "./src/mapping/JsonMapper.ts");
/**
 * Programme de génération et completion de labyrinthe
 *
 * Notes:
 *
 * Quelques idées pour le type de data structure à utiliser pour les cases du labyrinthe:
 *
 */

var jsonMapper = new _mapping_JsonMapper__WEBPACK_IMPORTED_MODULE_0__.JsonMapper();
var htmlElements = {
    tableau: document.getElementById("tableauLabyrinthe"),
};
var labyrintheElementsTemplates = {
    case: '<td class="case %class%"></td>',
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
function getJsonDataFromAPI() {
    return fetch("http://localhost:3000/15")
        .then(function (response) { return response.json(); })
        .then(function (json) { return json; });
}
function main() {
    var data = getJsonDataFromAPI();
    data.then(function (json) {
        var labyrinthe = jsonMapper.toLabyrinthe(json["ex-0"], 15);
        displayLabyrinthe(labyrinthe);
    });
}
main();

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map