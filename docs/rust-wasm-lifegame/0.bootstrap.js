(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[0],{

/***/ "../wasm_tutorial.js":
/*!***************************!*\
  !*** ../wasm_tutorial.js ***!
  \***************************/
/*! exports provided: __wbg_random_acb9bafd226853d8, Universe, __wbindgen_throw */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__wbg_random_acb9bafd226853d8\", function() { return __wbg_random_acb9bafd226853d8; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Universe\", function() { return Universe; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__wbindgen_throw\", function() { return __wbindgen_throw; });\n/* harmony import */ var _wasm_tutorial_bg__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./wasm_tutorial_bg */ \"../wasm_tutorial_bg.wasm\");\n/* tslint:disable */\n\n\nfunction __wbg_random_acb9bafd226853d8() {\n    return Math.random();\n}\n\nfunction freeUniverse(ptr) {\n\n    _wasm_tutorial_bg__WEBPACK_IMPORTED_MODULE_0__[\"__wbg_universe_free\"](ptr);\n}\n/**\n*/\nclass Universe {\n\n    static __wrap(ptr) {\n        const obj = Object.create(Universe.prototype);\n        obj.ptr = ptr;\n\n        return obj;\n    }\n\n    free() {\n        const ptr = this.ptr;\n        this.ptr = 0;\n        freeUniverse(ptr);\n    }\n\n    /**\n    * @returns {Universe}\n    */\n    static new() {\n        return Universe.__wrap(_wasm_tutorial_bg__WEBPACK_IMPORTED_MODULE_0__[\"universe_new\"]());\n    }\n    /**\n    * @returns {void}\n    */\n    tick() {\n        return _wasm_tutorial_bg__WEBPACK_IMPORTED_MODULE_0__[\"universe_tick\"](this.ptr);\n    }\n    /**\n    * @returns {number}\n    */\n    width() {\n        return _wasm_tutorial_bg__WEBPACK_IMPORTED_MODULE_0__[\"universe_width\"](this.ptr);\n    }\n    /**\n    * @returns {number}\n    */\n    height() {\n        return _wasm_tutorial_bg__WEBPACK_IMPORTED_MODULE_0__[\"universe_height\"](this.ptr);\n    }\n    /**\n    * @returns {number}\n    */\n    cells() {\n        return _wasm_tutorial_bg__WEBPACK_IMPORTED_MODULE_0__[\"universe_cells\"](this.ptr);\n    }\n}\n\nlet cachedTextDecoder = new TextDecoder('utf-8');\n\nlet cachegetUint8Memory = null;\nfunction getUint8Memory() {\n    if (cachegetUint8Memory === null || cachegetUint8Memory.buffer !== _wasm_tutorial_bg__WEBPACK_IMPORTED_MODULE_0__[\"memory\"].buffer) {\n        cachegetUint8Memory = new Uint8Array(_wasm_tutorial_bg__WEBPACK_IMPORTED_MODULE_0__[\"memory\"].buffer);\n    }\n    return cachegetUint8Memory;\n}\n\nfunction getStringFromWasm(ptr, len) {\n    return cachedTextDecoder.decode(getUint8Memory().subarray(ptr, ptr + len));\n}\n\nfunction __wbindgen_throw(ptr, len) {\n    throw new Error(getStringFromWasm(ptr, len));\n}\n\n\n\n//# sourceURL=webpack:///../wasm_tutorial.js?");

/***/ }),

/***/ "../wasm_tutorial_bg.wasm":
/*!********************************!*\
  !*** ../wasm_tutorial_bg.wasm ***!
  \********************************/
/*! exports provided: memory, __wbg_universe_free, universe_new, universe_tick, universe_width, universe_height, universe_cells */
/***/ (function(module, exports, __webpack_require__) {

eval("\"use strict\";\n// Instantiate WebAssembly module\nvar wasmExports = __webpack_require__.w[module.i];\n__webpack_require__.r(exports);\n// export exports from WebAssembly module\nfor(var name in wasmExports) if(name != \"__webpack_init__\") exports[name] = wasmExports[name];\n// exec imports from WebAssembly module (for esm order)\n/* harmony import */ var m0 = __webpack_require__(/*! ./wasm_tutorial */ \"../wasm_tutorial.js\");\n\n\n// exec wasm module\nwasmExports[\"__webpack_init__\"]()\n\n//# sourceURL=webpack:///../wasm_tutorial_bg.wasm?");

/***/ }),

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var wasm_tutorial__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! wasm-tutorial */ \"../wasm_tutorial.js\");\n/* harmony import */ var wasm_tutorial_wasm_tutorial_bg__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! wasm-tutorial/wasm_tutorial_bg */ \"../wasm_tutorial_bg.wasm\");\n\n\n\nconst CELL_SIZE = 5;\n\nconst universe = wasm_tutorial__WEBPACK_IMPORTED_MODULE_0__[\"Universe\"].new();\nconst width = universe.width();\nconst height = universe.height();\nconst screen = document.getElementById('screen');\nscreen.height = (CELL_SIZE + 1) * height + 1;\nscreen.width = (CELL_SIZE + 1) * width + 1;\nconst ctx = screen.getContext('2d');\nlet genCount = 0;\nconst counter = document.getElementById('gen-count');\n\nfunction drawGrid() {\n    ctx.beginPath();\n    ctx.strokeStyle = '#cccccc';\n\n    // Vertical lines\n    for (let i = 0; i <= width; i++) {\n        ctx.moveTo(i * (CELL_SIZE + 1) + 1, 0);\n        ctx.lineTo(i * (CELL_SIZE + 1) + 1, (CELL_SIZE + 1) * height + 1);\n    }\n\n    // Horizontal lines\n    for (let i = 0; i <= height; i++) {\n        ctx.moveTo(0, i * (CELL_SIZE + 1) + 1);\n        ctx.lineTo((CELL_SIZE + 1) * width + 1, i * (CELL_SIZE + 1) + 1);\n    }\n\n    ctx.stroke();\n}\n\nfunction drawCells() {\n    const ptr = universe.cells();\n    // Devide by 8 since 1 bit represents 1 cell\n    const cells = new Uint8Array(wasm_tutorial_wasm_tutorial_bg__WEBPACK_IMPORTED_MODULE_1__[\"memory\"].buffer, ptr, (width * height) / 8);\n\n    ctx.beginPath();\n\n    for (let row = 0; row < height; row++) {\n        for (let col = 0; col < width; col++) {\n            const idx = row * width + col;\n            const byteIdx = Math.floor(idx / 8);\n            const mask = 1 << idx % 8;\n            const isDead = (cells[byteIdx] & mask) === mask;\n            ctx.fillStyle = isDead ? '#000000' : '#ffffff';\n            ctx.fillRect(col * (CELL_SIZE + 1) + 1, row * (CELL_SIZE + 1) + 1, CELL_SIZE, CELL_SIZE);\n        }\n    }\n\n    ctx.stroke();\n}\n\nfunction loop() {\n    universe.tick();\n    drawCells();\n    genCount++;\n    counter.textContent = genCount;\n\n    requestAnimationFrame(loop);\n}\n\n// Start\ndrawGrid();\nrequestAnimationFrame(loop);\n\n\n//# sourceURL=webpack:///./index.js?");

/***/ })

}]);