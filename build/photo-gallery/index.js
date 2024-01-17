/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/photo-gallery/edit.js":
/*!***********************************!*\
  !*** ./src/photo-gallery/edit.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/compose */ "@wordpress/compose");
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_compose__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _editor_scss__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./editor.scss */ "./src/photo-gallery/editor.scss");



const {
  Button,
  PanelBody
} = wp.components;



function Edit({
  attributes,
  setAttributes
}) {
  //Destructuring the images array attribute
  const {
    images = [],
    columns,
    padding,
    gallery_style
  } = attributes;

  // This removes an image from the gallery
  const removeImage = removeImage => {
    //filter the images
    const newImages = images.filter(image => {
      if (image.id != removeImage.id) {
        return image;
      }
    });
    // Saves the new state
    setAttributes({
      images: newImages
    });
  };
  const GalleryStyleControl = (0,_wordpress_compose__WEBPACK_IMPORTED_MODULE_4__.withState)({
    gallery_style: gallery_style
  })(({
    gallery_style,
    setState
  }) => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.SelectControl, {
    label: "Select Style",
    value: gallery_style,
    options: [{
      label: 'Style One',
      value: 'style1'
    }, {
      label: 'Style Two',
      value: 'style2'
    }],
    onChange: value => {
      setAttributes({
        gallery_style: value
      });
    }
  }));

  // Select column
  const GallerySelectColumn = (0,_wordpress_compose__WEBPACK_IMPORTED_MODULE_4__.withState)({
    column: columns
  })(({
    column,
    setState
  }) => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.SelectControl, {
    label: "Select Column",
    value: column,
    options: [{
      label: 'One Column',
      value: '1'
    }, {
      label: 'Two Column',
      value: '2'
    }, {
      label: 'Three Column',
      value: '3'
    }, {
      label: 'Four Column',
      value: '4'
    }],
    onChange: value => {
      setAttributes({
        columns: value
      });
    }
  }));

  // Gallery Padding
  const GalleryContentControl = (0,_wordpress_compose__WEBPACK_IMPORTED_MODULE_4__.withState)({
    padding: padding
  })(({
    padding,
    setState
  }) => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.TextControl, {
    label: "Padding",
    value: padding,
    onChange: value => {
      setAttributes({
        padding: value
      });
    }
  }));
  let counts = 0;
  let output = '';

  //Displays the images
  const displayImages = images => {
    return images.map(image => {
      const paddingStyle = {
        padding: padding
      };
      if (gallery_style == 'style1') {
        return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
          className: `col-${columns} gallery-item`,
          style: paddingStyle
        }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
          className: "gallery-item",
          src: image.url,
          key: images.id
        }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
          className: "remove-item",
          onClick: () => removeImage(image)
        }, "X"));
      } else {
        output = counts == 0 ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
          className: `col-md-6 full-content style2-wrap`,
          style: paddingStyle
        }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
          className: "gallery-item"
        }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
          className: "gallery-item",
          src: image.url,
          key: images.id
        }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
          className: "remove-item",
          onClick: () => removeImage(image)
        }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
          class: "dashicons dashicons-trash"
        })))) : (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
          className: `col-md-3 gallery-style2`,
          style: paddingStyle
        }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
          className: "gallery-item"
        }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
          className: "gallery-item",
          src: image.url,
          key: images.id
        }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
          className: "remove-item",
          onClick: () => removeImage(image)
        }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
          class: "dashicons dashicons-trash"
        }))));
        counts++;
        return output;
      }
    });
  };

  //JSX to return
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.InspectorControls, {
    key: "inspector"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(PanelBody, {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Select Gallery Column')
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(GalleryStyleControl, null), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(GallerySelectColumn, null), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(GalleryContentControl, null))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "gallery-grid"
  }, displayImages(images)), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("br", null), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.MediaUpload, {
    onSelect: media => {
      setAttributes({
        images: [...images, ...media]
      });
    },
    type: "image",
    multiple: true,
    value: images,
    render: ({
      open
    }) => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(Button, {
      className: "select-images-button is-button is-default is-large primary-btn",
      onClick: open
    }, "Add images")
  }));
}

/***/ }),

/***/ "./src/photo-gallery/index.js":
/*!************************************!*\
  !*** ./src/photo-gallery/index.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./style.scss */ "./src/photo-gallery/style.scss");
/* harmony import */ var _edit__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./edit */ "./src/photo-gallery/edit.js");
/* harmony import */ var _save__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./save */ "./src/photo-gallery/save.js");
/* harmony import */ var _block_json__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./block.json */ "./src/photo-gallery/block.json");
const {
  __
} = wp.i18n;



/**
 * Internal dependencies
 */



(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__.registerBlockType)(_block_json__WEBPACK_IMPORTED_MODULE_4__.name, {
  attributes: {
    //Attributes
    images: {
      type: 'array'
    },
    columns: {
      type: 'string',
      default: '3'
    },
    padding: {
      type: 'string',
      default: '15px'
    },
    gallery_style: {
      type: 'string',
      default: 'style1'
    }
  },
  /**
   * @see ./edit.js
   */
  edit: _edit__WEBPACK_IMPORTED_MODULE_2__["default"],
  /**
   * @see ./save.js
   */
  save: _save__WEBPACK_IMPORTED_MODULE_3__["default"]
});

/***/ }),

/***/ "./src/photo-gallery/save.js":
/*!***********************************!*\
  !*** ./src/photo-gallery/save.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ save)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */

const {
  __
} = wp.i18n;
const {
  registerBlockType
} = wp.blocks;
const {
  Button,
  PanelBody
} = wp.components;
// const { MediaUpload, InspectorControls } = wp.editor;
// import { MediaUpload, InspectorControls } from '@wordpress/block-editor';

function save({
  attributes
}) {
  //Destructuring the images array attribute
  const {
    images = [],
    columns,
    padding,
    gallery_style
  } = attributes;
  let counts = 0;
  let output = '';

  // Displays the images
  const displayImages = images => {
    return images.map((image, index) => {
      const paddingStyle = {
        padding: padding
      };
      if (gallery_style == 'style1') {
        return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
          className: `col-${columns} gallery-item A`,
          style: paddingStyle
        }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
          href: image.url,
          className: "cloud-zoom"
        }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
          className: "gallery-item",
          key: images.id,
          src: image.url,
          "data-slide-no": index,
          "data-caption": image.caption[0],
          alt: image.alt
        })));
      } else {
        output = counts == 0 ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
          className: `col-md-6 full-content style2-wrap`,
          style: paddingStyle
        }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
          className: "gallery-item"
        }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
          href: image.url,
          className: "cloud-zoom"
        }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
          className: "gallery-item",
          src: image.url,
          key: images.id
        })))) : (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
          className: `col-md-3 gallery-style2`,
          style: paddingStyle
        }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
          className: "gallery-item"
        }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
          href: image.url,
          className: "cloud-zoom"
        }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
          className: "gallery-item",
          src: image.url,
          key: images.id
        }))));
        counts++;
        return output;
      }
    });
  };

  //JSX to return
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "gallery-row",
    "data-total-slides": images.length
  }, displayImages(images));
}

/***/ }),

/***/ "./src/photo-gallery/editor.scss":
/*!***************************************!*\
  !*** ./src/photo-gallery/editor.scss ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/photo-gallery/style.scss":
/*!**************************************!*\
  !*** ./src/photo-gallery/style.scss ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "React" ***!
  \************************/
/***/ ((module) => {

module.exports = window["React"];

/***/ }),

/***/ "@wordpress/block-editor":
/*!*************************************!*\
  !*** external ["wp","blockEditor"] ***!
  \*************************************/
/***/ ((module) => {

module.exports = window["wp"]["blockEditor"];

/***/ }),

/***/ "@wordpress/blocks":
/*!********************************!*\
  !*** external ["wp","blocks"] ***!
  \********************************/
/***/ ((module) => {

module.exports = window["wp"]["blocks"];

/***/ }),

/***/ "@wordpress/components":
/*!************************************!*\
  !*** external ["wp","components"] ***!
  \************************************/
/***/ ((module) => {

module.exports = window["wp"]["components"];

/***/ }),

/***/ "@wordpress/compose":
/*!*********************************!*\
  !*** external ["wp","compose"] ***!
  \*********************************/
/***/ ((module) => {

module.exports = window["wp"]["compose"];

/***/ }),

/***/ "@wordpress/i18n":
/*!******************************!*\
  !*** external ["wp","i18n"] ***!
  \******************************/
/***/ ((module) => {

module.exports = window["wp"]["i18n"];

/***/ }),

/***/ "./src/photo-gallery/block.json":
/*!**************************************!*\
  !*** ./src/photo-gallery/block.json ***!
  \**************************************/
/***/ ((module) => {

module.exports = JSON.parse('{"apiVersion":3,"name":"create-block/photo-gallery","version":"0.1.0","title":"Photo Gallery","category":"widgets","icon":"images-alt","description":"Example block scaffolded with Create Block tool.","example":{},"supports":{"html":false},"textdomain":"awesome-blocks","editorScript":"file:./index.js","editorStyle":"file:./index.css","style":"file:./style-index.css"}');

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
/******/ 			"photo-gallery/index": 0,
/******/ 			"photo-gallery/style-index": 0
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
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["photo-gallery/style-index"], () => (__webpack_require__("./src/photo-gallery/index.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=index.js.map