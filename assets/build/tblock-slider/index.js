/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/tblock-slider/edit.js"
/*!***********************************!*\
  !*** ./src/tblock-slider/edit.js ***!
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
    slides = [],
    autoplay = true,
    autoplaySpeed = 5000,
    animationSpeed = 800,
    showArrow = true,
    showDots = true
  } = attributes;
  const blockProps = (0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.useBlockProps)();
  const sliderRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.useRef)(null);
  const isSliderInitialized = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.useRef)(false);

  // Add a new slide
  const addSlide = () => {
    const newSlide = {
      id: Date.now(),
      title: 'New Slide',
      topTitle: 'Subtitle',
      buttonText: 'Learn More',
      buttonUrl: '#',
      buttonStyle: 'success',
      contentPosition: 'center',
      imageUrl: '',
      imageId: 0,
      imageAlt: ''
    };
    setAttributes({
      slides: [...slides, newSlide]
    });
  };

  // Remove a slide
  const removeSlide = index => {
    const newSlides = slides.filter((_, i) => i !== index);
    setAttributes({
      slides: newSlides
    });
  };

  // Update slide attribute
  const updateSlide = (index, key, value) => {
    const newSlides = [...slides];
    newSlides[index][key] = value;
    setAttributes({
      slides: newSlides
    });
  };

  // Select image for slide
  const onSelectImage = (index, media) => {
    updateSlide(index, 'imageUrl', media.url);
    updateSlide(index, 'imageId', media.id);
    updateSlide(index, 'imageAlt', media.alt || '');
  };

  // Remove image from slide
  const onRemoveImage = index => {
    updateSlide(index, 'imageUrl', '');
    updateSlide(index, 'imageId', 0);
    updateSlide(index, 'imageAlt', '');
  };

  // Initialize Slick Slider in editor
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.useEffect)(() => {
    if (typeof jQuery !== 'undefined' && typeof jQuery.fn.slick !== 'undefined' && sliderRef.current) {
      const $slider = jQuery(sliderRef.current);

      // Destroy if already initialized
      if ($slider.hasClass('slick-initialized')) {
        $slider.slick('unslick');
      }

      // Initialize Slick
      $slider.slick({
        autoplay: autoplay,
        autoplaySpeed: autoplaySpeed,
        speed: animationSpeed,
        arrows: showArrow,
        dots: showDots,
        prevArrow: '<div class="slick-nav prev-arrow"><i></i></div>',
        nextArrow: '<div class="slick-nav next-arrow"><i></i></div>',
        pauseOnHover: false
      });
      isSliderInitialized.current = true;
    }

    // Cleanup on unmount
    return () => {
      if (sliderRef.current && typeof jQuery !== 'undefined') {
        const $slider = jQuery(sliderRef.current);
        if ($slider.hasClass('slick-initialized')) {
          $slider.slick('unslick');
        }
      }
    };
  }, [slides, autoplay, autoplaySpeed, animationSpeed, showArrow, showDots]);
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.InspectorControls, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.PanelBody, {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Slider Settings', 'theme-blocks'),
    initialOpen: true
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.PanelRow, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.ToggleControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Autoplay', 'theme-blocks'),
    checked: autoplay,
    onChange: () => setAttributes({
      autoplay: !autoplay
    })
  })), autoplay && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.PanelRow, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.TextControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Autoplay Speed (ms)', 'theme-blocks'),
    type: "number",
    value: autoplaySpeed,
    onChange: value => setAttributes({
      autoplaySpeed: parseInt(value)
    })
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.PanelRow, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.TextControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Animation Speed (ms)', 'theme-blocks'),
    type: "number",
    value: animationSpeed,
    onChange: value => setAttributes({
      animationSpeed: parseInt(value)
    })
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.PanelRow, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.ToggleControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Show Arrows', 'theme-blocks'),
    checked: showArrow,
    onChange: () => setAttributes({
      showArrow: !showArrow
    })
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.PanelRow, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.ToggleControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Show Dots', 'theme-blocks'),
    checked: showDots,
    onChange: () => setAttributes({
      showDots: !showDots
    })
  }))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.PanelBody, {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Manage Slides', 'theme-blocks'),
    initialOpen: false
  }, slides.map((slide, index) => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    key: slide.id,
    style: {
      marginBottom: '20px',
      padding: '15px',
      background: '#f0f0f0',
      borderRadius: '4px'
    }
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '10px'
    }
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("strong", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Slide', 'theme-blocks'), " ", index + 1), slides.length > 1 && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Button, {
    onClick: () => removeSlide(index),
    variant: "secondary",
    isDestructive: true,
    isSmall: true
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Dashicon, {
    icon: "trash"
  }))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.PanelRow, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.MediaUploadCheck, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.MediaUpload, {
    onSelect: media => onSelectImage(index, media),
    allowedTypes: ['image'],
    value: slide.imageId,
    render: ({
      open
    }) => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, !slide.imageUrl ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Button, {
      onClick: open,
      variant: "secondary",
      isSmall: true
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Dashicon, {
      icon: "format-image"
    }), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Upload Image', 'theme-blocks')) : (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      style: {
        position: 'relative',
        display: 'inline-block'
      }
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
      src: slide.imageUrl,
      alt: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Preview', 'theme-blocks'),
      style: {
        maxWidth: '100px',
        borderRadius: '4px'
      }
    }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      style: {
        marginTop: '5px'
      }
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Button, {
      onClick: open,
      variant: "secondary",
      isSmall: true
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Dashicon, {
      icon: "edit"
    })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Button, {
      onClick: () => onRemoveImage(index),
      variant: "secondary",
      isDestructive: true,
      isSmall: true
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Dashicon, {
      icon: "trash"
    })))))
  }))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.TextControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Top Title', 'theme-blocks'),
    value: slide.topTitle,
    onChange: value => updateSlide(index, 'topTitle', value)
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.TextControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Title', 'theme-blocks'),
    value: slide.title,
    onChange: value => updateSlide(index, 'title', value)
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.TextControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Button Text', 'theme-blocks'),
    value: slide.buttonText,
    onChange: value => updateSlide(index, 'buttonText', value)
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.TextControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Button URL', 'theme-blocks'),
    value: slide.buttonUrl,
    onChange: value => updateSlide(index, 'buttonUrl', value)
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.SelectControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Button Style', 'theme-blocks'),
    value: slide.buttonStyle,
    options: [{
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Success (Green)', 'theme-blocks'),
      value: 'success'
    }, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Light (White)', 'theme-blocks'),
      value: 'light'
    }],
    onChange: value => updateSlide(index, 'buttonStyle', value)
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.SelectControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Content Position', 'theme-blocks'),
    value: slide.contentPosition,
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
    onChange: value => updateSlide(index, 'contentPosition', value)
  }))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Button, {
    onClick: addSlide,
    variant: "primary",
    style: {
      width: '100%',
      justifyContent: 'center',
      gap: '8px'
    }
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Dashicon, {
    icon: "plus"
  }), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Add Slide', 'theme-blocks')))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    ...blockProps
  }, slides.length === 0 ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "as-placeholder"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    style: {
      textAlign: 'center',
      padding: '40px',
      background: '#f9f9f9',
      borderRadius: '4px'
    }
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('No slides yet. Add slides from the sidebar settings.', 'theme-blocks'))) : (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("section", {
    className: "theme_block_banner__slider as-editor-preview"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    ref: sliderRef,
    className: "slider",
    "data-autoplay": autoplay ? 'yes' : 'no',
    "data-autoplay-speed": autoplaySpeed,
    "data-animation-speed": animationSpeed,
    "data-show-arrow": showArrow ? 'yes' : 'no',
    "data-show-dots": showDots ? 'yes' : 'no'
  }, slides.map((slide, index) => {
    const slideContentClass = `slide__content slide__content__${slide.contentPosition}`;
    const buttonClass = `btn button-custom ${slide.buttonStyle === 'success' ? 'btn-success text-white' : 'btn-light'}`;
    const headingClass = `slide__content--headings text-${slide.contentPosition}`;
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      key: slide.id,
      className: "slide"
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "slide__img"
    }, slide.imageUrl ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
      src: slide.imageUrl,
      alt: slide.imageAlt || slide.title
    }) : (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      style: {
        width: '100%',
        height: '100%',
        background: '#e0e0e0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#999'
      }
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('No Image', 'theme-blocks'))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: slideContentClass
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: headingClass
    }, slide.topTitle && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
      className: "top-title"
    }, slide.topTitle), slide.title && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h2", {
      className: "title"
    }, slide.title), slide.buttonText && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
      href: slide.buttonUrl,
      className: buttonClass
    }, slide.buttonText))));
  })))));
}

/***/ },

/***/ "./src/tblock-slider/index.js"
/*!************************************!*\
  !*** ./src/tblock-slider/index.js ***!
  \************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _block_json__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./block.json */ "./src/tblock-slider/block.json");
/* harmony import */ var _edit__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./edit */ "./src/tblock-slider/edit.js");
/* harmony import */ var _save__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./save */ "./src/tblock-slider/save.js");
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./style.scss */ "./src/tblock-slider/style.scss");
/* harmony import */ var _editor_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./editor.scss */ "./src/tblock-slider/editor.scss");
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
  title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('TBlock Slider', 'theme-blocks'),
  description: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('A beautiful slider block with animations and slick slider', 'theme-blocks'),
  edit: _edit__WEBPACK_IMPORTED_MODULE_3__["default"],
  save: _save__WEBPACK_IMPORTED_MODULE_4__["default"]
});

/***/ },

/***/ "./src/tblock-slider/save.js"
/*!***********************************!*\
  !*** ./src/tblock-slider/save.js ***!
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
    slides = [],
    autoplay = true,
    autoplaySpeed = 5000,
    animationSpeed = 800,
    showArrow = true,
    showDots = true
  } = attributes;
  const blockProps = _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.useBlockProps.save();
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    ...blockProps
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("section", {
    className: "theme_block_banner__slider"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "slider",
    "data-autoplay": autoplay ? 'yes' : 'no',
    "data-autoplay-speed": autoplaySpeed,
    "data-animation-speed": animationSpeed,
    "data-show-arrow": showArrow ? 'yes' : 'no',
    "data-show-dots": showDots ? 'yes' : 'no'
  }, slides.map((slide, index) => {
    const slideContentClass = `slide__content slide__content__${slide.contentPosition}${index === 0 ? ' slick-active' : ''}`;
    const buttonClass = `btn button-custom ${slide.buttonStyle === 'success' ? 'btn-success text-white' : 'btn-light'}`;
    const headingClass = `slide__content--headings text-${slide.contentPosition}`;
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      key: slide.id,
      className: "slide"
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "slide__img"
    }, slide.imageUrl && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
      src: slide.imageUrl,
      alt: slide.imageAlt || slide.title
    })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: slideContentClass
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: headingClass
    }, slide.topTitle && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
      className: "animated top-title",
      "data-animation-in": "fadeInUp",
      "data-delay-in": "0.3"
    }, slide.topTitle), slide.title && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h2", {
      className: "animated title",
      "data-animation-in": "fadeInUp"
    }, slide.title), slide.buttonText && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
      href: slide.buttonUrl,
      className: `${buttonClass} animated`,
      "data-animation-in": "fadeInUp"
    }, slide.buttonText))));
  }))));
}

/***/ },

/***/ "./src/tblock-slider/editor.scss"
/*!***************************************!*\
  !*** ./src/tblock-slider/editor.scss ***!
  \***************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ },

/***/ "./src/tblock-slider/style.scss"
/*!**************************************!*\
  !*** ./src/tblock-slider/style.scss ***!
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

/***/ "./src/tblock-slider/block.json"
/*!**************************************!*\
  !*** ./src/tblock-slider/block.json ***!
  \**************************************/
(module) {

module.exports = /*#__PURE__*/JSON.parse('{"apiVersion":3,"name":"tblock/tblock-slider","title":"TBlock Slider","category":"tblock-block","icon":"slides","description":"A beautiful slider block with animations and slick slider","keywords":["slider","carousel","slick","banner"],"attributes":{"slides":{"type":"array","default":[{"id":1,"title":"Welcome to Our Site","topTitle":"Discover More","buttonText":"Get Started","buttonUrl":"#","buttonStyle":"success","contentPosition":"center","imageUrl":"","imageId":0,"imageAlt":""}]},"autoplay":{"type":"boolean","default":true},"autoplaySpeed":{"type":"number","default":5000},"animationSpeed":{"type":"number","default":800},"showArrow":{"type":"boolean","default":true},"showDots":{"type":"boolean","default":true}},"supports":{"align":["wide","full"],"html":false},"editorScript":"file:./index.js","style":"file:./style-index.css","viewScript":"file:./view.js"}');

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
/******/ 			"tblock-slider/index": 0,
/******/ 			"tblock-slider/style-index": 0
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
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["tblock-slider/style-index"], () => (__webpack_require__("./src/tblock-slider/index.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=index.js.map