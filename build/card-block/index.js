/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

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

/***/ "@wordpress/element":
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
/***/ ((module) => {

module.exports = window["wp"]["element"];

/***/ }),

/***/ "@wordpress/i18n":
/*!******************************!*\
  !*** external ["wp","i18n"] ***!
  \******************************/
/***/ ((module) => {

module.exports = window["wp"]["i18n"];

/***/ }),

/***/ "./src/card-block/block.json":
/*!***********************************!*\
  !*** ./src/card-block/block.json ***!
  \***********************************/
/***/ ((module) => {

module.exports = JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":3,"name":"create-block/card-block","version":"0.1.0","title":"Card Block","category":"widgets","icon":"slides","description":"Example block scaffolded with Create Block tool.","example":{},"supports":{"html":false},"textdomain":"awesome-blocks","editorScript":"file:./index.js","editorStyle":"file:./index.css","style":"file:./style-index.css","attributes":{"imgSrc":{"type":"string","source":"attribute","attribute":"src","selector":"img"},"imgId":{"type":"number"},"imgAlt":{"type":"string","source":"attribute","attribute":"alt","selector":"img"},"headline":{"type":"string","source":"text","selector":".card__title"},"body":{"type":"array","source":"children","selector":".card__body"},"buttonText":{"type":"string"},"buttonLink":{"type":"string"}}}');

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
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*********************************!*\
  !*** ./src/card-block/index.js ***!
  \*********************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _block_json__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./block.json */ "./src/card-block/block.json");

/**
 * Internal block libraries
*/






/**
 * Styling
*/
// import './editor.sass';
// import './style.scss';

/**
 * Internal dependencies
 */
// import Edit from './edit';
// import save from './save';


/**
 * Register Block
 */
(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_4__.registerBlockType)(_block_json__WEBPACK_IMPORTED_MODULE_5__.name, {
  edit: props => {
    const {
      attributes: {
        headline,
        imgSrc,
        imgId,
        imgAlt,
        body,
        buttonText,
        buttonLink
      },
      className,
      setAttributes,
      isSelected
    } = props;
    const onSelectImg = img => {
      if (!img || !img.url) {
        setAttributes({
          imgSrc: null,
          imgId: null,
          imgAlt: null
        });
        return;
      }
      setAttributes({
        imgSrc: img.url,
        imgId: img.id,
        imgAlt: img.alt
      });
    };
    const classes = 'component-card ' + className;
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.BlockControls, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.Toolbar, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.MediaUpload, {
      onSelect: onSelectImg,
      type: "image",
      value: imgId,
      render: ({
        open
      }) => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.IconButton, {
        className: "components-toolbar__control",
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Edit image'),
        icon: "edit",
        onClick: open
      })
    }))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("section", {
      className: classes
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("figure", {
      className: "card__image"
    }, !imgId ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.MediaPlaceholder, {
      icon: "format-image",
      labels: {
        title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Image', 'wp-card-block'),
        headline: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Image', 'wp-card-block')
      },
      onSelect: onSelectImg,
      accept: "image/*",
      type: "image"
    }) : (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
      src: imgSrc,
      alt: imgAlt
    }), isSelected ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.IconButton, {
      className: "remove-image",
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Remove image', 'wp-card-block'),
      onClick: () => setAttributes({
        imgSrc: null,
        imgId: null,
        imgAlt: null
      }),
      icon: "no-alt"
    }) : '')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("header", {
      className: "card__header"
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h1", {
      className: "card__title"
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.RichText, {
      value: headline,
      placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Lorem ipsum…', 'wp-card-block'),
      keepPlaceholderOnFocus: true,
      onChange: headline => setAttributes({
        headline
      })
    }))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "card__body"
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.RichText, {
      tagName: "div",
      value: body,
      multiline: "p",
      placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('…dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.', 'wp-card-block'),
      keepPlaceholderOnFocus: true,
      onChange: body => setAttributes({
        body
      })
    })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("footer", {
      className: "card__footer"
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.RichText, {
      tagName: "span",
      className: "button",
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Button Text', 'wp-card-block'),
      value: buttonText,
      placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Button Text', 'wp-card-block'),
      keepPlaceholderOnFocus: true,
      onChange: buttonText => setAttributes({
        buttonText
      })
    }), isSelected && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("form", {
      className: "blocks-format-toolbar__link-modal-line blocks-format-toolbar__link-modal-line",
      onSubmit: event => event.preventDefault()
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.URLInput, {
      className: "url",
      value: buttonLink,
      onChange: buttonLink => setAttributes({
        buttonLink
      })
    }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.IconButton, {
      icon: "editor-break",
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Save', 'wp-card-block'),
      type: "submit"
    }))))));
  },
  save: props => {
    const {
      className,
      imgSrc,
      imgAlt,
      headline,
      body,
      buttonText,
      buttonLink
    } = props.attributes;
    const classes = 'component-card ' + className;
    const hasButtonText = buttonText.length > 0;
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("section", {
      className: classes
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("figure", {
      className: "card__image"
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
      src: imgSrc,
      alt: imgAlt
    })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("header", {
      className: "card__header"
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h1", {
      className: "card__title"
    }, headline)), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "card__body"
    }, body), hasButtonText ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("footer", {
      className: "card__footer"
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
      class: "card__button",
      href: buttonLink
    }, buttonText)) : '');
  }
});
})();

/******/ })()
;
//# sourceMappingURL=index.js.map