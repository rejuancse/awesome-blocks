/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/feature-block/edit.js"
/*!***********************************!*\
  !*** ./src/feature-block/edit.js ***!
  \***********************************/
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

/**
 * WordPress Dependencies
 */





// Common Dashicons list
const DASHICONS = ['star-filled', 'heart', 'smiley', 'thumbs-up', 'awards', 'businessperson', 'cart', 'clipboard', 'database', 'desktop', 'email', 'flag', 'format-image', 'format-video', 'games', 'groups', 'hammer', 'heart', 'image-filter', 'info', 'lightbulb', 'location', 'lock', 'media-code', 'music', 'networking', 'phone', 'portfolio', 'shield', 'shield-alt', 'sos', 'sports', 'tablet', 'translation', 'visibility', 'warning', 'welcome-comments', 'wordpress', 'yes'];

/**
 * Edit Component
 */
function Edit({
  attributes,
  setAttributes
}) {
  const {
    icon = 'star-filled',
    iconLibrary = 'dashicons',
    title = 'Feature Title',
    description = 'Add a compelling description for your feature or service here.',
    link = '',
    openInNewTab = false,
    iconColor = '#667eea',
    iconBgColor = '#f0f4ff',
    alignment = 'left',
    showIcon = true,
    showLink = false
  } = attributes;
  const blockProps = (0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.useBlockProps)();
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.InspectorControls, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.PanelBody, {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Feature Content', 'theme-blocks'),
    initialOpen: true
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.PanelRow, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.SelectControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Icon', 'theme-blocks'),
    value: icon,
    options: DASHICONS.map(d => ({
      label: d.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
      value: d
    })),
    onChange: value => setAttributes({
      icon: value
    })
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.PanelRow, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.TextControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Title', 'theme-blocks'),
    value: title,
    onChange: value => setAttributes({
      title: value
    })
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.PanelRow, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.TextareaControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Description', 'theme-blocks'),
    value: description,
    onChange: value => setAttributes({
      description: value
    }),
    rows: 3
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.PanelRow, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.TextControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Link (Optional)', 'theme-blocks'),
    value: link,
    onChange: value => setAttributes({
      link: value
    }),
    placeholder: "https://example.com"
  })), link && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.PanelRow, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.ToggleControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Open in New Tab', 'theme-blocks'),
    checked: openInNewTab,
    onChange: () => setAttributes({
      openInNewTab: !openInNewTab
    })
  }))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.PanelBody, {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Icon Style', 'theme-blocks'),
    initialOpen: false
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.PanelColorSettings, {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Icon Colors', 'theme-blocks'),
    colorSettings: [{
      value: iconColor,
      onChange: color => setAttributes({
        iconColor: color
      }),
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Icon Color', 'theme-blocks')
    }, {
      value: iconBgColor,
      onChange: color => setAttributes({
        iconBgColor: color
      }),
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Icon Background', 'theme-blocks')
    }]
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.PanelBody, {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Display Options', 'theme-blocks'),
    initialOpen: false
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.ToggleControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Show Icon', 'theme-blocks'),
    checked: showIcon,
    onChange: () => setAttributes({
      showIcon: !showIcon
    })
  }), link && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.ToggleControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Show Link Button', 'theme-blocks'),
    checked: showLink,
    onChange: () => setAttributes({
      showLink: !showLink
    })
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.SelectControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Alignment', 'theme-blocks'),
    value: alignment,
    options: [{
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Left', 'theme-blocks'),
      value: 'left'
    }, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Center', 'theme-blocks'),
      value: 'center'
    }, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Right', 'theme-blocks'),
      value: 'right'
    }],
    onChange: value => setAttributes({
      alignment: value
    })
  }))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    ...blockProps
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: `fb-feature fb-align-${alignment}`
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "fb-feature-inner"
  }, showIcon && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "fb-icon-wrapper",
    style: {
      backgroundColor: iconBgColor
    }
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Dashicon, {
    icon: icon,
    size: 40,
    style: {
      color: iconColor
    }
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "fb-content"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", {
    className: "fb-title"
  }, title), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "fb-description"
  }, description), showLink && link && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    href: link,
    className: "fb-link",
    target: openInNewTab ? '_blank' : '_self',
    rel: openInNewTab ? 'noopener noreferrer' : undefined
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Learn More →', 'theme-blocks')))))));
}

/***/ },

/***/ "./src/feature-block/index.js"
/*!************************************!*\
  !*** ./src/feature-block/index.js ***!
  \************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _block_json__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./block.json */ "./src/feature-block/block.json");
/* harmony import */ var _edit__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./edit */ "./src/feature-block/edit.js");
/* harmony import */ var _save__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./save */ "./src/feature-block/save.js");
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./style.scss */ "./src/feature-block/style.scss");
/* harmony import */ var _editor_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./editor.scss */ "./src/feature-block/editor.scss");
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
  title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('TBlock Feature Block', 'theme-blocks'),
  description: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Display features/services with icon, title and description', 'theme-blocks'),
  edit: _edit__WEBPACK_IMPORTED_MODULE_3__["default"],
  save: _save__WEBPACK_IMPORTED_MODULE_4__["default"]
});

/***/ },

/***/ "./src/feature-block/save.js"
/*!***********************************!*\
  !*** ./src/feature-block/save.js ***!
  \***********************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Save)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);

/**
 * WordPress Dependencies
 */



/**
 * Save Component
 */
function Save({
  attributes
}) {
  const {
    icon = 'star-filled',
    title = 'Feature Title',
    description = 'Add a compelling description for your feature or service here.',
    link = '',
    openInNewTab = false,
    iconColor = '#667eea',
    iconBgColor = '#f0f4ff',
    alignment = 'left',
    showIcon = true,
    showLink = false
  } = attributes;
  const blockProps = _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.useBlockProps.save();
  const Wrapper = link && !showLink ? 'a' : 'div';
  const wrapperProps = link && !showLink ? {
    href: link,
    target: openInNewTab ? '_blank' : undefined,
    rel: openInNewTab ? 'noopener noreferrer' : undefined,
    className: 'fb-feature fb-linked'
  } : {
    className: `fb-feature fb-align-${alignment}`
  };
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    ...blockProps
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(Wrapper, {
    ...wrapperProps
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "fb-feature-inner"
  }, showIcon && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "fb-icon-wrapper",
    style: {
      backgroundColor: iconBgColor
    }
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Dashicon, {
    icon: icon,
    size: 40,
    style: {
      color: iconColor
    }
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "fb-content"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", {
    className: "fb-title"
  }, title), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "fb-description"
  }, description), showLink && link && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    href: link,
    className: "fb-link",
    target: openInNewTab ? '_blank' : undefined,
    rel: openInNewTab ? 'noopener noreferrer' : undefined
  }, __('Learn More →', 'theme-blocks'))))));
}

/***/ },

/***/ "./src/feature-block/editor.scss"
/*!***************************************!*\
  !*** ./src/feature-block/editor.scss ***!
  \***************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ },

/***/ "./src/feature-block/style.scss"
/*!**************************************!*\
  !*** ./src/feature-block/style.scss ***!
  \**************************************/
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

/***/ "@wordpress/i18n"
/*!******************************!*\
  !*** external ["wp","i18n"] ***!
  \******************************/
(module) {

module.exports = window["wp"]["i18n"];

/***/ },

/***/ "./src/feature-block/block.json"
/*!**************************************!*\
  !*** ./src/feature-block/block.json ***!
  \**************************************/
(module) {

module.exports = /*#__PURE__*/JSON.parse('{"apiVersion":3,"name":"tblock/feature-block","title":"Feature Block","category":"tblock-block","icon":"star-filled","description":"Display features/services with icon, title and description","keywords":["feature","service","icon","highlight"],"attributes":{"icon":{"type":"string","default":"star-filled"},"iconLibrary":{"type":"string","default":"dashicons"},"title":{"type":"string","default":"Feature Title"},"description":{"type":"string","default":"Add a compelling description for your feature or service here."},"link":{"type":"string","default":""},"openInNewTab":{"type":"boolean","default":false},"iconColor":{"type":"string","default":"#667eea"},"iconBgColor":{"type":"string","default":"#f0f4ff"},"alignment":{"type":"string","default":"left"},"showIcon":{"type":"boolean","default":true},"showLink":{"type":"boolean","default":false}},"supports":{"align":true,"html":false},"editorScript":"file:./index.js","style":"file:./style-index.css"}');

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
/******/ 			"feature-block/index": 0,
/******/ 			"feature-block/style-index": 0
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
/******/ 		var chunkLoadingGlobal = globalThis["webpackChunkthemeblocks"] = globalThis["webpackChunkthemeblocks"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["feature-block/style-index"], () => (__webpack_require__("./src/feature-block/index.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=index.js.map