/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/count-down/edit.js"
/*!********************************!*\
  !*** ./src/count-down/edit.js ***!
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
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_4__);

/**
 * WordPress Dependencies
 */






/**
 * Edit Component
 */
function Edit({
  attributes,
  setAttributes
}) {
  const {
    title = 'Special Offer Ends In:',
    targetDate = '',
    expiredMessage = 'This offer has expired!',
    showTitle = true,
    cardAlignment = 'center',
    boxBgColor = '#667eea',
    textColor = '#141414',
    labelColor = '#e0e7ff',
    expiredBgColor = '#ef4444'
  } = attributes;
  const blockProps = (0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.useBlockProps)();
  const [timeLeft, setTimeLeft] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.useState)({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [isExpired, setIsExpired] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.useState)(false);

  // Calculate countdown
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.useEffect)(() => {
    if (!targetDate) {
      setIsExpired(false);
      setTimeLeft({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
      });
      return;
    }
    const calculateTimeLeft = () => {
      const difference = new Date(targetDate).getTime() - new Date().getTime();
      if (difference <= 0) {
        setIsExpired(true);
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0
        });
        return;
      }
      setIsExpired(false);
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor(difference / (1000 * 60 * 60) % 24);
      const minutes = Math.floor(difference / 1000 / 60 % 60);
      const seconds = Math.floor(difference / 1000 % 60);
      setTimeLeft({
        days,
        hours,
        minutes,
        seconds
      });
    };
    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.InspectorControls, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.PanelBody, {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Content Settings', 'zepblocks'),
    initialOpen: true
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.TextControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Title', 'zepblocks'),
    value: title,
    onChange: value => setAttributes({
      title: value
    }),
    help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Leave empty to hide title', 'zepblocks')
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.TextControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Target Date & Time', 'zepblocks'),
    type: "datetime-local",
    value: targetDate,
    onChange: value => setAttributes({
      targetDate: value
    }),
    help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Select when the countdown should end', 'zepblocks')
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.TextControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Expired Message', 'zepblocks'),
    value: expiredMessage,
    onChange: value => setAttributes({
      expiredMessage: value
    }),
    help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Message to show when countdown reaches zero', 'zepblocks')
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.ToggleControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Show Title', 'zepblocks'),
    checked: showTitle,
    onChange: () => setAttributes({
      showTitle: !showTitle
    })
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.PanelBody, {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Style Settings', 'zepblocks'),
    initialOpen: false
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    style: {
      marginBottom: '15px'
    }
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
    style: {
      display: 'block',
      marginBottom: '5px',
      fontWeight: '500'
    }
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Box Background Color', 'zepblocks')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    type: "color",
    value: boxBgColor,
    onChange: e => setAttributes({
      boxBgColor: e.target.value
    }),
    style: {
      width: '100%',
      height: '40px',
      border: '1px solid #ddd',
      borderRadius: '4px',
      cursor: 'pointer'
    }
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    style: {
      marginBottom: '15px'
    }
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
    style: {
      display: 'block',
      marginBottom: '5px',
      fontWeight: '500'
    }
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Text Color', 'zepblocks')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    type: "color",
    value: textColor,
    onChange: e => setAttributes({
      textColor: e.target.value
    }),
    style: {
      width: '100%',
      height: '40px',
      border: '1px solid #ddd',
      borderRadius: '4px',
      cursor: 'pointer'
    }
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    style: {
      marginBottom: '15px'
    }
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
    style: {
      display: 'block',
      marginBottom: '5px',
      fontWeight: '500'
    }
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Label Color', 'zepblocks')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    type: "color",
    value: labelColor,
    onChange: e => setAttributes({
      labelColor: e.target.value
    }),
    style: {
      width: '100%',
      height: '40px',
      border: '1px solid #ddd',
      borderRadius: '4px',
      cursor: 'pointer'
    }
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    style: {
      marginBottom: '15px'
    }
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
    style: {
      display: 'block',
      marginBottom: '5px',
      fontWeight: '500'
    }
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Expired Background Color', 'zepblocks')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    type: "color",
    value: expiredBgColor,
    onChange: e => setAttributes({
      expiredBgColor: e.target.value
    }),
    style: {
      width: '100%',
      height: '40px',
      border: '1px solid #ddd',
      borderRadius: '4px',
      cursor: 'pointer'
    }
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.SelectControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Alignment', 'zepblocks'),
    value: cardAlignment,
    options: [{
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Left', 'zepblocks'),
      value: 'left'
    }, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Center', 'zepblocks'),
      value: 'center'
    }, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Right', 'zepblocks'),
      value: 'right'
    }],
    onChange: value => setAttributes({
      cardAlignment: value
    })
  }))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    ...blockProps
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: `cd-wrap cd-align-${cardAlignment}`
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "cd-card"
  }, showTitle && title && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "cd-title",
    style: {
      color: textColor
    }
  }, title), isExpired ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "cd-expired",
    style: {
      background: expiredBgColor,
      color: textColor
    }
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "cd-expired-icon"
  }, "\u26A0\uFE0F"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "cd-expired-message"
  }, expiredMessage)) : (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "cd-countdown"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "cd-box",
    style: {
      background: boxBgColor,
      color: textColor
    }
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "cd-number"
  }, String(timeLeft.days).padStart(2, '0')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "cd-label",
    style: {
      color: labelColor
    }
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Days', 'zepblocks'))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "cd-separator",
    style: {
      color: textColor
    }
  }, ":"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "cd-box",
    style: {
      background: boxBgColor,
      color: textColor
    }
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "cd-number"
  }, String(timeLeft.hours).padStart(2, '0')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "cd-label",
    style: {
      color: labelColor
    }
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Hours', 'zepblocks'))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "cd-separator",
    style: {
      color: textColor
    }
  }, ":"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "cd-box",
    style: {
      background: boxBgColor,
      color: textColor
    }
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "cd-number"
  }, String(timeLeft.minutes).padStart(2, '0')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "cd-label",
    style: {
      color: labelColor
    }
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Minutes', 'zepblocks'))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "cd-separator",
    style: {
      color: textColor
    }
  }, ":"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "cd-box",
    style: {
      background: boxBgColor,
      color: textColor
    }
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "cd-number"
  }, String(timeLeft.seconds).padStart(2, '0')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "cd-label",
    style: {
      color: labelColor
    }
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Seconds', 'zepblocks'))))))));
}

/***/ },

/***/ "./src/count-down/index.js"
/*!*********************************!*\
  !*** ./src/count-down/index.js ***!
  \*********************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _block_json__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./block.json */ "./src/count-down/block.json");
/* harmony import */ var _edit__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./edit */ "./src/count-down/edit.js");
/* harmony import */ var _save__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./save */ "./src/count-down/save.js");
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./style.scss */ "./src/count-down/style.scss");
/* harmony import */ var _editor_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./editor.scss */ "./src/count-down/editor.scss");
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
  title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Zepblock Count Down', 'zepblocks'),
  description: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Display countdown timer with title and date', 'zepblocks'),
  edit: _edit__WEBPACK_IMPORTED_MODULE_3__["default"],
  save: _save__WEBPACK_IMPORTED_MODULE_4__["default"]
});

/***/ },

/***/ "./src/count-down/save.js"
/*!********************************!*\
  !*** ./src/count-down/save.js ***!
  \********************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ save)
/* harmony export */ });
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__);
/**
 * WordPress Dependencies
 */


/**
 * Save Component - Returns null for dynamic block (server-side rendered)
 */
function save() {
  return null;
}

/***/ },

/***/ "./src/count-down/editor.scss"
/*!************************************!*\
  !*** ./src/count-down/editor.scss ***!
  \************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ },

/***/ "./src/count-down/style.scss"
/*!***********************************!*\
  !*** ./src/count-down/style.scss ***!
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

/***/ "@wordpress/element"
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
(module) {

module.exports = window["wp"]["element"];

/***/ },

/***/ "@wordpress/i18n"
/*!******************************!*\
  !*** external ["wp","i18n"] ***!
  \******************************/
(module) {

module.exports = window["wp"]["i18n"];

/***/ },

/***/ "./src/count-down/block.json"
/*!***********************************!*\
  !*** ./src/count-down/block.json ***!
  \***********************************/
(module) {

module.exports = /*#__PURE__*/JSON.parse('{"apiVersion":3,"name":"zepblock/count-down","title":"Count Down Timer","category":"zepblock-block","icon":"clock","description":"Beautiful countdown timer with title and date. Shows expired message when time is up.","keywords":["countdown","timer","count","date","expiry"],"attributes":{"title":{"type":"string","default":"Special Offer Ends In:"},"targetDate":{"type":"string","default":""},"expiredMessage":{"type":"string","default":"This offer has expired!"},"showTitle":{"type":"boolean","default":true},"cardAlignment":{"type":"string","default":"center"},"boxBgColor":{"type":"string","default":"#667eea"},"textColor":{"type":"string","default":"#ffffff"},"labelColor":{"type":"string","default":"#e0e7ff"},"expiredBgColor":{"type":"string","default":"#ef4444"}},"supports":{"align":["wide","full"],"html":false},"editorScript":"file:./index.js","style":"file:./style-index.css"}');

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
/******/ 			"count-down/index": 0,
/******/ 			"count-down/style-index": 0
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
/******/ 		var chunkLoadingGlobal = globalThis["webpackChunkzepblocks"] = globalThis["webpackChunkzepblocks"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["count-down/style-index"], () => (__webpack_require__("./src/count-down/index.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=index.js.map