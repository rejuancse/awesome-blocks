/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/grid-block/edit.js"
/*!********************************!*\
  !*** ./src/grid-block/edit.js ***!
  \********************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Edit)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__);

/**
 * WordPress Dependencies
 */





/**
 * Edit Component
 */
function Edit({
  attributes,
  setAttributes,
  clientId
}) {
  const {
    columns = 3,
    columnsTablet = 2,
    columnsMobile = 1,
    rowGap = 20,
    columnGap = 20,
    align = 'left',
    verticalAlign = 'top',
    gridAutoFlow = 'row'
  } = attributes;
  const blockProps = (0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.useBlockProps)();

  // Get the number of inner blocks
  const {
    innerBlockCount
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_2__.useSelect)(select => {
    const {
      getBlockCount
    } = select('core/block-editor');
    return {
      innerBlockCount: getBlockCount(clientId)
    };
  }, [clientId]);
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.InspectorControls, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.TabPanel, {
    tabs: [{
      name: 'layout',
      title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Layout', 'awesome-blocks'),
      className: 'ab-grid-layout-tab'
    }, {
      name: 'style',
      title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Style', 'awesome-blocks'),
      className: 'ab-grid-style-tab'
    }]
  }, tab => {
    if ('layout' === tab.name) {
      return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.PanelBody, {
        title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Grid Columns', 'awesome-blocks'),
        initialOpen: true
      }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.PanelRow, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.RangeControl, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Desktop Columns', 'awesome-blocks'),
        value: columns,
        onChange: value => setAttributes({
          columns: value
        }),
        min: 1,
        max: 6,
        help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Number of columns on desktop screens (1024px and above)', 'awesome-blocks')
      })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.PanelRow, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.RangeControl, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Tablet Columns', 'awesome-blocks'),
        value: columnsTablet,
        onChange: value => setAttributes({
          columnsTablet: value
        }),
        min: 1,
        max: 4,
        help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Number of columns on tablet screens (768px to 1023px)', 'awesome-blocks')
      })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.PanelRow, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.RangeControl, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Mobile Columns', 'awesome-blocks'),
        value: columnsMobile,
        onChange: value => setAttributes({
          columnsMobile: value
        }),
        min: 1,
        max: 3,
        help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Number of columns on mobile screens (up to 767px)', 'awesome-blocks')
      }))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.PanelBody, {
        title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Grid Gaps', 'awesome-blocks'),
        initialOpen: false
      }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.RangeControl, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Column Gap', 'awesome-blocks'),
        value: columnGap,
        onChange: value => setAttributes({
          columnGap: value
        }),
        min: 0,
        max: 100,
        help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Space between grid columns (px)', 'awesome-blocks')
      }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.RangeControl, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Row Gap', 'awesome-blocks'),
        value: rowGap,
        onChange: value => setAttributes({
          rowGap: value
        }),
        min: 0,
        max: 100,
        help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Space between grid rows (px)', 'awesome-blocks')
      })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.PanelBody, {
        title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Grid Settings', 'awesome-blocks'),
        initialOpen: false
      }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.SelectControl, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Grid Auto Flow', 'awesome-blocks'),
        value: gridAutoFlow,
        options: [{
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Row', 'awesome-blocks'),
          value: 'row'
        }, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Column', 'awesome-blocks'),
          value: 'column'
        }, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Row Dense', 'awesome-blocks'),
          value: 'row dense'
        }, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Column Dense', 'awesome-blocks'),
          value: 'column dense'
        }],
        onChange: value => setAttributes({
          gridAutoFlow: value
        }),
        help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Controls how auto-placed items get inserted in the grid', 'awesome-blocks')
      })));
    }
    if ('style' === tab.name) {
      return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.PanelBody, {
        title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Alignment', 'awesome-blocks'),
        initialOpen: true
      }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.SelectControl, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Horizontal Alignment', 'awesome-blocks'),
        value: align,
        options: [{
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Left', 'awesome-blocks'),
          value: 'left'
        }, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Center', 'awesome-blocks'),
          value: 'center'
        }, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Right', 'awesome-blocks'),
          value: 'right'
        }, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Space Between', 'awesome-blocks'),
          value: 'space-between'
        }],
        onChange: value => setAttributes({
          align: value
        })
      }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.SelectControl, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Vertical Alignment', 'awesome-blocks'),
        value: verticalAlign,
        options: [{
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Top', 'awesome-blocks'),
          value: 'top'
        }, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Middle', 'awesome-blocks'),
          value: 'middle'
        }, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Bottom', 'awesome-blocks'),
          value: 'bottom'
        }],
        onChange: value => setAttributes({
          verticalAlign: value
        })
      })));
    }
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    ...blockProps
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: `ab-grid-container ab-grid-columns-desktop-${columns} ab-grid-columns-tablet-${columnsTablet} ab-grid-columns-mobile-${columnsMobile}`,
    style: {
      display: 'grid',
      gridTemplateColumns: `repeat(${columns}, 1fr)`,
      gap: `${rowGap}px ${columnGap}px`,
      justifyContent: align,
      alignContent: verticalAlign === 'middle' ? 'center' : verticalAlign,
      gridAutoFlow: gridAutoFlow
    }
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.InnerBlocks, {
    allowedBlocks: ['*'],
    template: [['core/paragraph', {
      content: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Grid Item', 'awesome-blocks')
    }]],
    orientation: "horizontal"
  }))));
}

/***/ },

/***/ "./src/grid-block/index.js"
/*!*********************************!*\
  !*** ./src/grid-block/index.js ***!
  \*********************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _block_json__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./block.json */ "./src/grid-block/block.json");
/* harmony import */ var _edit__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./edit */ "./src/grid-block/edit.js");
/* harmony import */ var _save__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./save */ "./src/grid-block/save.js");
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./style.scss */ "./src/grid-block/style.scss");
/* harmony import */ var _editor_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./editor.scss */ "./src/grid-block/editor.scss");
/**
 * WordPress Dependencies
 */



/**
 * Internal Dependencies
 */




/**
 * Styles - WordPress webpack will process these
 */



/**
 * Register Block
 */
(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_1__.registerBlockType)(_block_json__WEBPACK_IMPORTED_MODULE_2__.name, {
  ..._block_json__WEBPACK_IMPORTED_MODULE_2__,
  title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Awesome Grid Block', 'awesome-blocks'),
  description: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Create responsive grid layouts with customizable columns and gaps', 'awesome-blocks'),
  edit: _edit__WEBPACK_IMPORTED_MODULE_3__["default"],
  save: _save__WEBPACK_IMPORTED_MODULE_4__["default"]
});

/***/ },

/***/ "./src/grid-block/save.js"
/*!********************************!*\
  !*** ./src/grid-block/save.js ***!
  \********************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Save)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__);

/**
 * WordPress Dependencies
 */



/**
 * Save Component - Dynamic block, returns null
 */
function Save({
  attributes
}) {
  const {
    columns = 3,
    columnsTablet = 2,
    columnsMobile = 1,
    rowGap = 20,
    columnGap = 20,
    align = 'left',
    verticalAlign = 'top',
    gridAutoFlow = 'row'
  } = attributes;
  const blockProps = _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.useBlockProps.save();
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    ...blockProps
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: `ab-grid-container ab-grid-columns-desktop-${columns} ab-grid-columns-tablet-${columnsTablet} ab-grid-columns-mobile-${columnsMobile}`,
    style: {
      display: 'grid',
      gridTemplateColumns: `repeat(${columns}, 1fr)`,
      gap: `${rowGap}px ${columnGap}px`,
      justifyContent: align,
      alignContent: verticalAlign === 'middle' ? 'center' : verticalAlign,
      gridAutoFlow: gridAutoFlow
    }
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.InnerBlocks.Content, null)));
}

/***/ },

/***/ "./src/grid-block/editor.scss"
/*!************************************!*\
  !*** ./src/grid-block/editor.scss ***!
  \************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ },

/***/ "./src/grid-block/style.scss"
/*!***********************************!*\
  !*** ./src/grid-block/style.scss ***!
  \***********************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ },

/***/ "react"
/*!************************!*\
  !*** external "React" ***!
  \************************/
(module) {

module.exports = window["React"];

/***/ },

/***/ "@wordpress/block-editor"
/*!*************************************!*\
  !*** external ["wp","blockEditor"] ***!
  \*************************************/
(module) {

module.exports = window["wp"]["blockEditor"];

/***/ },

/***/ "@wordpress/blocks"
/*!********************************!*\
  !*** external ["wp","blocks"] ***!
  \********************************/
(module) {

module.exports = window["wp"]["blocks"];

/***/ },

/***/ "@wordpress/components"
/*!************************************!*\
  !*** external ["wp","components"] ***!
  \************************************/
(module) {

module.exports = window["wp"]["components"];

/***/ },

/***/ "@wordpress/data"
/*!******************************!*\
  !*** external ["wp","data"] ***!
  \******************************/
(module) {

module.exports = window["wp"]["data"];

/***/ },

/***/ "@wordpress/i18n"
/*!******************************!*\
  !*** external ["wp","i18n"] ***!
  \******************************/
(module) {

module.exports = window["wp"]["i18n"];

/***/ },

/***/ "./src/grid-block/block.json"
/*!***********************************!*\
  !*** ./src/grid-block/block.json ***!
  \***********************************/
(module) {

module.exports = /*#__PURE__*/JSON.parse('{"apiVersion":2,"name":"awesome/grid-block","title":"Grid Block","category":"awesome-block","icon":"grid-view","description":"Create responsive grid layouts with customizable columns and gaps","keywords":["grid","layout","columns","rows"],"attributes":{"columns":{"type":"number","default":3},"columnsTablet":{"type":"number","default":2},"columnsMobile":{"type":"number","default":1},"rowGap":{"type":"number","default":20},"columnGap":{"type":"number","default":20},"align":{"type":"string","default":"left"},"verticalAlign":{"type":"string","default":"top"},"gridAutoFlow":{"type":"string","default":"row"}},"supports":{"align":["wide","full"],"html":false,"multiple":true},"editorScript":"file:./index.js","style":"file:./style-index.css"}');

/***/ }

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
/******/ 		if (!(moduleId in __webpack_modules__)) {
/******/ 			delete __webpack_module_cache__[moduleId];
/******/ 			var e = new Error("Cannot find module '" + moduleId + "'");
/******/ 			e.code = 'MODULE_NOT_FOUND';
/******/ 			throw e;
/******/ 		}
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
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
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"grid-block/index": 0,
/******/ 			"grid-block/style-index": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = globalThis["webpackChunkawesome_blocks"] = globalThis["webpackChunkawesome_blocks"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["grid-block/style-index"], () => (__webpack_require__("./src/grid-block/index.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=index.js.map