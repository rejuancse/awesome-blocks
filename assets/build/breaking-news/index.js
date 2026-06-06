/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/breaking-news/edit.js"
/*!***********************************!*\
  !*** ./src/breaking-news/edit.js ***!
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
 * Default attribute values.
 *
 * @type {Object}
 */
const DEFAULTS = {
  breakingNewsTitle: 'Breaking News',
  postNumber: 5,
  postCat: 'allpost',
  postOrderBy: 'DESC',
  animationSpeed: 30,
  titleColor: '#ffffff',
  titleBgColor: '#ff0000',
  contentBgColor: '#f5f5f5',
  linkColor: '#333333',
  linkHoverColor: '#0073aa',
  fontSize: 16,
  padding: 15,
  borderRadius: 0
};

/**
 * Edit component for the Breaking News Ticker block.
 *
 * @param {Object}   props
 * @param {Object}   props.attributes    Block attributes.
 * @param {Function} props.setAttributes Attribute updater.
 * @return {JSX.Element}
 */
function Edit({
  attributes,
  setAttributes
}) {
  const {
    breakingNewsTitle = DEFAULTS.breakingNewsTitle,
    postNumber = DEFAULTS.postNumber,
    postCat = DEFAULTS.postCat,
    postOrderBy = DEFAULTS.postOrderBy,
    animationSpeed = DEFAULTS.animationSpeed,
    titleColor = DEFAULTS.titleColor,
    titleBgColor = DEFAULTS.titleBgColor,
    contentBgColor = DEFAULTS.contentBgColor,
    linkColor = DEFAULTS.linkColor,
    linkHoverColor = DEFAULTS.linkHoverColor,
    fontSize = DEFAULTS.fontSize,
    padding = DEFAULTS.padding,
    borderRadius = DEFAULTS.borderRadius
  } = attributes;

  // Fetch categories
  const categories = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_2__.useSelect)(select => {
    return select('core').getEntityRecords('taxonomy', 'category', {
      per_page: -1
    });
  }, []);

  // Fetch posts for preview
  const {
    posts,
    hasPosts
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_2__.useSelect)(select => {
    const query = {
      post_status: 'publish',
      per_page: postNumber,
      order: postOrderBy,
      orderby: 'date',
      _embed: true
    };

    // If specific category is selected, find the category ID
    if (postCat !== 'allpost' && postCat && categories && categories.length > 0) {
      const selectedCategory = categories.find(cat => cat.slug === postCat);
      if (selectedCategory) {
        query.categories = [selectedCategory.id];
      }
    }
    const postsList = select('core').getEntityRecords('postType', 'post', query);

    // Debug logging
    console.log('Breaking News Debug:', {
      query,
      postCat,
      categories: categories?.length,
      postsList,
      hasPosts: postsList && postsList.length > 0
    });
    return {
      posts: postsList || [],
      hasPosts: postsList && postsList.length > 0
    };
  }, [postNumber, postCat, postOrderBy, categories]);
  const blockProps = (0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.useBlockProps)();
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    ...blockProps
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.InspectorControls, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.PanelBody, {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('General Settings', 'zepblocks'),
    initialOpen: true
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.TextControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Breaking News Title', 'zepblocks'),
    value: breakingNewsTitle,
    onChange: value => setAttributes({
      breakingNewsTitle: value
    }),
    help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Leave empty to hide the title section', 'zepblocks')
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.RangeControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Number of Posts', 'zepblocks'),
    value: postNumber,
    onChange: value => setAttributes({
      postNumber: value
    }),
    min: 1,
    max: 20
  }), categories && categories.length > 0 && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.SelectControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Category', 'zepblocks'),
    value: postCat,
    options: [{
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('All Posts', 'zepblocks'),
      value: 'allpost'
    }, ...categories.map(cat => ({
      label: cat.name,
      value: cat.slug
    }))],
    onChange: value => setAttributes({
      postCat: value
    })
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.SelectControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Order', 'zepblocks'),
    value: postOrderBy,
    options: [{
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Descending (Newest First)', 'zepblocks'),
      value: 'DESC'
    }, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Ascending (Oldest First)', 'zepblocks'),
      value: 'ASC'
    }],
    onChange: value => setAttributes({
      postOrderBy: value
    })
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.RangeControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Animation Speed (seconds)', 'zepblocks'),
    value: animationSpeed,
    onChange: value => setAttributes({
      animationSpeed: value
    }),
    min: 10,
    max: 120,
    help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Higher values make the ticker slower', 'zepblocks')
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.PanelBody, {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Style Settings', 'zepblocks')
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
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Title Color', 'zepblocks')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    type: "color",
    value: titleColor,
    onChange: e => setAttributes({
      titleColor: e.target.value
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
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Title Background Color', 'zepblocks')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    type: "color",
    value: titleBgColor,
    onChange: e => setAttributes({
      titleBgColor: e.target.value
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
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Content Background Color', 'zepblocks')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    type: "color",
    value: contentBgColor,
    onChange: e => setAttributes({
      contentBgColor: e.target.value
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
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Link Color', 'zepblocks')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    type: "color",
    value: linkColor,
    onChange: e => setAttributes({
      linkColor: e.target.value
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
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Link Hover Color', 'zepblocks')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    type: "color",
    value: linkHoverColor,
    onChange: e => setAttributes({
      linkHoverColor: e.target.value
    }),
    style: {
      width: '100%',
      height: '40px',
      border: '1px solid #ddd',
      borderRadius: '4px',
      cursor: 'pointer'
    }
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.RangeControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Font Size (px)', 'zepblocks'),
    value: fontSize,
    onChange: value => setAttributes({
      fontSize: value
    }),
    min: 12,
    max: 32
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.RangeControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Padding (px)', 'zepblocks'),
    value: padding,
    onChange: value => setAttributes({
      padding: value
    }),
    min: 0,
    max: 50
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.RangeControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Border Radius (px)', 'zepblocks'),
    value: borderRadius,
    onChange: value => setAttributes({
      borderRadius: value
    }),
    min: 0,
    max: 50
  }))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "breaking-news-ticker",
    style: {
      display: 'flex',
      alignItems: 'center',
      backgroundColor: contentBgColor,
      borderRadius: `${borderRadius}px`,
      overflow: 'hidden',
      border: '1px solid #e0e0e0',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
    }
  }, breakingNewsTitle && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "ticker-heading",
    style: {
      display: 'flex',
      alignItems: 'center',
      backgroundColor: titleBgColor,
      color: titleColor,
      padding: `${padding}px 20px`,
      fontWeight: 'bold',
      fontSize: '14px',
      textTransform: 'uppercase',
      whiteSpace: 'nowrap',
      position: 'relative',
      zIndex: '10'
    }
  }, breakingNewsTitle, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    style: {
      position: 'absolute',
      right: '-10px',
      top: '50%',
      transform: 'translateY(-50%)',
      width: '0',
      height: '0',
      borderTop: '10px solid transparent',
      borderBottom: '10px solid transparent',
      borderLeft: `10px solid ${titleBgColor}`
    }
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "ticker-container",
    style: {
      flex: '1',
      overflow: 'hidden',
      position: 'relative',
      padding: `${padding - 5}px 0`
    }
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    style: {
      position: 'absolute',
      left: '0',
      top: '0',
      bottom: '0',
      width: '50px',
      background: `linear-gradient(to right, ${contentBgColor}, transparent)`,
      zIndex: '5',
      pointerEvents: 'none'
    }
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    style: {
      position: 'absolute',
      right: '0',
      top: '0',
      bottom: '0',
      width: '50px',
      background: `linear-gradient(to left, ${contentBgColor}, transparent)`,
      zIndex: '5',
      pointerEvents: 'none'
    }
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "ticker-content",
    style: {
      display: 'flex',
      animation: `ticker-scroll ${animationSpeed}s linear infinite`,
      whiteSpace: 'nowrap'
    },
    onMouseEnter: e => {
      e.target.style.animationPlayState = 'paused';
    },
    onMouseLeave: e => {
      e.target.style.animationPlayState = 'running';
    }
  }, hasPosts ? posts.map(post => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    key: post.id,
    className: "ticker-item",
    style: {
      display: 'flex',
      alignItems: 'center',
      padding: '0 20px',
      whiteSpace: 'nowrap'
    }
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    style: {
      width: '8px',
      height: '8px',
      backgroundColor: titleBgColor,
      borderRadius: '50%',
      marginRight: '10px',
      flexShrink: '0'
    }
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    href: post.link,
    style: {
      color: linkColor,
      fontSize: `${fontSize}px`,
      textDecoration: 'none',
      transition: 'color 0.2s ease'
    },
    onMouseEnter: e => {
      e.target.style.color = linkHoverColor;
      e.target.style.textDecoration = 'underline';
    },
    onMouseLeave: e => {
      e.target.style.color = linkColor;
      e.target.style.textDecoration = 'none';
    }
  }, post.title.rendered))) : (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    style: {
      padding: '0 20px',
      color: '#999',
      fontSize: `${fontSize}px`
    }
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('No posts found', 'zepblocks'))))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("style", null, `
					@keyframes ticker-scroll {
						0% {
							transform: translateX(100%);
						}
						100% {
							transform: translateX(-100%);
						}
					}

					/* Pause animation on hover */
					.ticker-content:hover {
						animation-play-state: paused;
					}
				`));
}

/***/ },

/***/ "./src/breaking-news/index.js"
/*!************************************!*\
  !*** ./src/breaking-news/index.js ***!
  \************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _block_json__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./block.json */ "./src/breaking-news/block.json");
/* harmony import */ var _edit__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./edit */ "./src/breaking-news/edit.js");
/* harmony import */ var _save__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./save */ "./src/breaking-news/save.js");
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./style.scss */ "./src/breaking-news/style.scss");
/* harmony import */ var _editor_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./editor.scss */ "./src/breaking-news/editor.scss");
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
  title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Zepblock Breaking News', 'zepblocks'),
  description: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Display breaking news with animated ticker', 'zepblocks'),
  edit: _edit__WEBPACK_IMPORTED_MODULE_3__["default"],
  save: _save__WEBPACK_IMPORTED_MODULE_4__["default"]
});

/***/ },

/***/ "./src/breaking-news/save.js"
/*!***********************************!*\
  !*** ./src/breaking-news/save.js ***!
  \***********************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ save)
/* harmony export */ });
/**
 * Save Component - Returns null for dynamic block (server-side rendered)
 */
function save() {
  return null;
}

/***/ },

/***/ "./src/breaking-news/editor.scss"
/*!***************************************!*\
  !*** ./src/breaking-news/editor.scss ***!
  \***************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ },

/***/ "./src/breaking-news/style.scss"
/*!**************************************!*\
  !*** ./src/breaking-news/style.scss ***!
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

/***/ "./src/breaking-news/block.json"
/*!**************************************!*\
  !*** ./src/breaking-news/block.json ***!
  \**************************************/
(module) {

module.exports = /*#__PURE__*/JSON.parse('{"apiVersion":3,"name":"zepblock/breaking-news","title":"Breaking News Ticker","category":"zepblock-block","icon":"megaphone","description":"Display breaking news with animated ticker","keywords":["news","ticker","breaking","headline"],"attributes":{"breakingNewsTitle":{"type":"string","default":"Breaking News"},"postNumber":{"type":"number","default":5},"postCat":{"type":"string","default":"allpost"},"postOrderBy":{"type":"string","default":"DESC"},"animationSpeed":{"type":"number","default":30},"titleColor":{"type":"string","default":"#ffffff"},"titleBgColor":{"type":"string","default":"#ff0000"},"contentBgColor":{"type":"string","default":"#f5f5f5"},"linkColor":{"type":"string","default":"#333333"},"linkHoverColor":{"type":"string","default":"#0073aa"},"fontSize":{"type":"number","default":16},"padding":{"type":"number","default":15},"borderRadius":{"type":"number","default":0}},"supports":{"align":["wide","full"],"html":false},"editorScript":"file:./index.js","style":"file:./style-index.css"}');

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
/******/ 			"breaking-news/index": 0,
/******/ 			"breaking-news/style-index": 0
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
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["breaking-news/style-index"], () => (__webpack_require__("./src/breaking-news/index.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=index.js.map