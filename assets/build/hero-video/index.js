/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/hero-video/edit.js"
/*!********************************!*\
  !*** ./src/hero-video/edit.js ***!
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
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _utils_google_fonts__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../utils/google-fonts */ "./src/utils/google-fonts.js");
/* harmony import */ var _utils_components__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../utils/components */ "./src/utils/components.js");

/**
 * WordPress Dependencies
 */





/**
 * Internal Dependencies
 */



/**
 * Default attribute values.
 *
 * @type {Object}
 */
const DEFAULTS = {
  videoUrl: '',
  posterUrl: '',
  title: 'A Beachfront Luxury Vacation Rental Awaits',
  description: 'Nestled along the resplendent beaches of Santa Teresa sits Casa Teresa and Casa Teresa Grande, both Costa Rica beachfront villas offering the ultimate luxury vacation rental experience.',
  buttonText: 'Learn More',
  buttonUrl: '#',
  titleColor: '#ffffff',
  titleFontSize: 48,
  titleFontWeight: '700',
  titleFontFamily: '',
  descriptionColor: '#ffffff',
  descriptionFontSize: 18,
  descriptionFontWeight: '400',
  descriptionFontFamily: '',
  buttonBgColor: '#ffffff',
  buttonTextColor: '#333333',
  buttonHoverBgColor: '#f0f0f0',
  buttonHoverTextColor: '#333333',
  buttonFontSize: 16,
  buttonFontWeight: '600',
  buttonFontFamily: '',
  overlayColor: '#000000',
  overlayOpacity: 40,
  videoHeight: 600,
  contentAlign: 'center',
  padding: 80,
  borderRadius: 0,
  muted: true,
  autoplay: true,
  loop: true
};

/**
 * Edit component for the Zepblock Hero Video block.
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
    videoUrl = DEFAULTS.videoUrl,
    posterUrl = DEFAULTS.posterUrl,
    title = DEFAULTS.title,
    description = DEFAULTS.description,
    buttonText = DEFAULTS.buttonText,
    buttonUrl = DEFAULTS.buttonUrl,
    titleColor = DEFAULTS.titleColor,
    titleFontSize = DEFAULTS.titleFontSize,
    titleFontWeight = DEFAULTS.titleFontWeight,
    titleFontFamily = DEFAULTS.titleFontFamily,
    descriptionColor = DEFAULTS.descriptionColor,
    descriptionFontSize = DEFAULTS.descriptionFontSize,
    descriptionFontWeight = DEFAULTS.descriptionFontWeight,
    descriptionFontFamily = DEFAULTS.descriptionFontFamily,
    buttonBgColor = DEFAULTS.buttonBgColor,
    buttonTextColor = DEFAULTS.buttonTextColor,
    buttonHoverBgColor = DEFAULTS.buttonHoverBgColor,
    buttonHoverTextColor = DEFAULTS.buttonHoverTextColor,
    buttonFontSize = DEFAULTS.buttonFontSize,
    buttonFontWeight = DEFAULTS.buttonFontWeight,
    buttonFontFamily = DEFAULTS.buttonFontFamily,
    overlayColor = DEFAULTS.overlayColor,
    overlayOpacity = DEFAULTS.overlayOpacity,
    videoHeight = DEFAULTS.videoHeight,
    contentAlign = DEFAULTS.contentAlign,
    padding = DEFAULTS.padding,
    borderRadius = DEFAULTS.borderRadius,
    muted = DEFAULTS.muted,
    autoplay = DEFAULTS.autoplay,
    loop = DEFAULTS.loop
  } = attributes;
  const blockProps = (0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.useBlockProps)();

  // ── Side effects ─────────────────────────────────────────────────────────

  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useEffect)(() => {
    (0,_utils_google_fonts__WEBPACK_IMPORTED_MODULE_5__.loadGoogleFont)(titleFontFamily);
  }, [titleFontFamily]);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useEffect)(() => {
    (0,_utils_google_fonts__WEBPACK_IMPORTED_MODULE_5__.loadGoogleFont)(descriptionFontFamily);
  }, [descriptionFontFamily]);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useEffect)(() => {
    (0,_utils_google_fonts__WEBPACK_IMPORTED_MODULE_5__.loadGoogleFont)(buttonFontFamily);
  }, [buttonFontFamily]);

  // ── Helper functions ───────────────────────────────────────────────────────

  /**
   * Convert hex color and opacity to rgba
   */
  const getOverlayColor = () => {
    const opacityValue = overlayOpacity / 100;

    // If overlayColor is already hex, convert to rgba
    if (overlayColor.startsWith('#')) {
      const hex = overlayColor.replace('#', '');
      const r = parseInt(hex.substr(0, 2), 16);
      const g = parseInt(hex.substr(2, 2), 16);
      const b = parseInt(hex.substr(4, 2), 16);
      return `rgba(${r}, ${g}, ${b}, ${opacityValue})`;
    }

    // If it's already rgb/rgba, just replace opacity
    return overlayColor.replace(/[\d.]+\)$/g, `${opacityValue})`);
  };

  // ── Render ───────────────────────────────────────────────────────────────

  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.InspectorControls, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.PanelBody, {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Content Settings', 'zepblocks')
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.MediaUploadCheck, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.MediaUpload, {
    onSelect: media => setAttributes({
      videoUrl: media.url
    }),
    allowedTypes: ['video'],
    value: videoUrl,
    render: ({
      open
    }) => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, !videoUrl && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
      onClick: open,
      className: "components-button is-secondary"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Select Video', 'zepblocks')), videoUrl && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("video", {
      src: videoUrl,
      style: {
        width: '100%',
        maxHeight: '200px'
      },
      controls: true
    }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
      onClick: () => setAttributes({
        videoUrl: ''
      }),
      className: "components-button is-secondary",
      style: {
        marginTop: '10px'
      }
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Remove Video', 'zepblocks'))))
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.MediaUploadCheck, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.MediaUpload, {
    onSelect: media => setAttributes({
      posterUrl: media.url
    }),
    allowedTypes: ['image'],
    value: posterUrl,
    render: ({
      open
    }) => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      style: {
        marginTop: '15px'
      }
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Poster Image', 'zepblocks')), !posterUrl && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
      onClick: open,
      className: "components-button is-secondary"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Select Poster Image', 'zepblocks')), posterUrl && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
      src: posterUrl,
      alt: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Poster', 'zepblocks'),
      style: {
        width: '100%',
        maxHeight: '200px',
        objectFit: 'cover'
      }
    }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
      onClick: () => setAttributes({
        posterUrl: ''
      }),
      className: "components-button is-secondary",
      style: {
        marginTop: '10px'
      }
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Remove Poster', 'zepblocks'))))
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.TextControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Title', 'zepblocks'),
    value: title,
    onChange: value => setAttributes({
      title: value
    }),
    placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Enter hero title', 'zepblocks')
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.TextControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Description', 'zepblocks'),
    value: description,
    onChange: value => setAttributes({
      description: value
    }),
    placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Enter hero description', 'zepblocks')
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.TextControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Button Text', 'zepblocks'),
    value: buttonText,
    onChange: value => setAttributes({
      buttonText: value
    }),
    placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Enter button text', 'zepblocks')
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.TextControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Button URL', 'zepblocks'),
    value: buttonUrl,
    onChange: value => setAttributes({
      buttonUrl: value
    }),
    placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('https://example.com', 'zepblocks')
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.SelectControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Content Alignment', 'zepblocks'),
    value: contentAlign,
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
      contentAlign: value
    })
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.PanelBody, {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Video Settings', 'zepblocks'),
    initialOpen: false
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.RangeControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Video Height (px)', 'zepblocks'),
    value: videoHeight,
    onChange: value => setAttributes({
      videoHeight: value
    }),
    min: 200,
    max: 1200,
    help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Set the height of the video section', 'zepblocks')
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.ToggleControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Muted', 'zepblocks'),
    checked: muted,
    onChange: value => setAttributes({
      muted: value
    })
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.ToggleControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Autoplay', 'zepblocks'),
    checked: autoplay,
    onChange: value => setAttributes({
      autoplay: value
    })
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.ToggleControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Loop', 'zepblocks'),
    checked: loop,
    onChange: value => setAttributes({
      loop: value
    })
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.PanelBody, {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Style Settings', 'zepblocks'),
    initialOpen: false
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Title Style', 'zepblocks')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_utils_components__WEBPACK_IMPORTED_MODULE_6__.ColorControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Title Color', 'zepblocks'),
    value: titleColor,
    onChange: value => setAttributes({
      titleColor: value
    }),
    placeholder: "#ffffff"
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.RangeControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Title Font Size', 'zepblocks'),
    value: titleFontSize,
    onChange: value => setAttributes({
      titleFontSize: value
    }),
    min: 12,
    max: 100
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.SelectControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Title Font Weight', 'zepblocks'),
    value: titleFontWeight,
    options: _utils_google_fonts__WEBPACK_IMPORTED_MODULE_5__.FONT_WEIGHTS,
    onChange: value => setAttributes({
      titleFontWeight: value
    })
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.SelectControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Title Font Family', 'zepblocks'),
    value: titleFontFamily,
    options: _utils_google_fonts__WEBPACK_IMPORTED_MODULE_5__.GOOGLE_FONTS,
    onChange: value => setAttributes({
      titleFontFamily: value
    }),
    help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Select a Google Font for the title', 'zepblocks')
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Description Style', 'zepblocks')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_utils_components__WEBPACK_IMPORTED_MODULE_6__.ColorControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Description Color', 'zepblocks'),
    value: descriptionColor,
    onChange: value => setAttributes({
      descriptionColor: value
    }),
    placeholder: "#ffffff"
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.RangeControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Description Font Size', 'zepblocks'),
    value: descriptionFontSize,
    onChange: value => setAttributes({
      descriptionFontSize: value
    }),
    min: 12,
    max: 40
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.SelectControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Description Font Weight', 'zepblocks'),
    value: descriptionFontWeight,
    options: _utils_google_fonts__WEBPACK_IMPORTED_MODULE_5__.FONT_WEIGHTS,
    onChange: value => setAttributes({
      descriptionFontWeight: value
    })
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.SelectControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Description Font Family', 'zepblocks'),
    value: descriptionFontFamily,
    options: _utils_google_fonts__WEBPACK_IMPORTED_MODULE_5__.GOOGLE_FONTS,
    onChange: value => setAttributes({
      descriptionFontFamily: value
    }),
    help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Select a Google Font for the description', 'zepblocks')
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Button Style', 'zepblocks')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_utils_components__WEBPACK_IMPORTED_MODULE_6__.ColorControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Button Background Color', 'zepblocks'),
    value: buttonBgColor,
    onChange: value => setAttributes({
      buttonBgColor: value
    }),
    placeholder: "#ffffff"
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_utils_components__WEBPACK_IMPORTED_MODULE_6__.ColorControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Button Text Color', 'zepblocks'),
    value: buttonTextColor,
    onChange: value => setAttributes({
      buttonTextColor: value
    }),
    placeholder: "#333333"
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_utils_components__WEBPACK_IMPORTED_MODULE_6__.ColorControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Button Hover Background Color', 'zepblocks'),
    value: buttonHoverBgColor,
    onChange: value => setAttributes({
      buttonHoverBgColor: value
    }),
    placeholder: "#f0f0f0"
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_utils_components__WEBPACK_IMPORTED_MODULE_6__.ColorControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Button Hover Text Color', 'zepblocks'),
    value: buttonHoverTextColor,
    onChange: value => setAttributes({
      buttonHoverTextColor: value
    }),
    placeholder: "#333333"
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.RangeControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Button Font Size', 'zepblocks'),
    value: buttonFontSize,
    onChange: value => setAttributes({
      buttonFontSize: value
    }),
    min: 10,
    max: 30
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.SelectControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Button Font Weight', 'zepblocks'),
    value: buttonFontWeight,
    options: _utils_google_fonts__WEBPACK_IMPORTED_MODULE_5__.FONT_WEIGHTS,
    onChange: value => setAttributes({
      buttonFontWeight: value
    })
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.SelectControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Button Font Family', 'zepblocks'),
    value: buttonFontFamily,
    options: _utils_google_fonts__WEBPACK_IMPORTED_MODULE_5__.GOOGLE_FONTS,
    onChange: value => setAttributes({
      buttonFontFamily: value
    }),
    help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Select a Google Font for the button', 'zepblocks')
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Layout', 'zepblocks')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_utils_components__WEBPACK_IMPORTED_MODULE_6__.ColorControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Overlay Color', 'zepblocks'),
    value: overlayColor,
    onChange: value => setAttributes({
      overlayColor: value
    }),
    placeholder: "#000000"
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.RangeControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Overlay Opacity', 'zepblocks'),
    value: overlayOpacity,
    onChange: value => setAttributes({
      overlayOpacity: value
    }),
    min: 0,
    max: 100,
    help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Set overlay opacity (0 = transparent, 100 = solid)', 'zepblocks')
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.RangeControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Padding', 'zepblocks'),
    value: padding,
    onChange: value => setAttributes({
      padding: value
    }),
    min: 0,
    max: 200
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.RangeControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Border Radius', 'zepblocks'),
    value: borderRadius,
    onChange: value => setAttributes({
      borderRadius: value
    }),
    min: 0,
    max: 50
  }))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    ...blockProps
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("style", null, `
                        .wp-block-zepblock-hero-video .villa-hero-video .hero-video-button {
                            background-color: ${buttonBgColor || '#ffffff'};
                            color: ${buttonTextColor || '#333333'};
                            font-size: ${buttonFontSize || 16}px;
                            font-weight: ${buttonFontWeight || '600'};
                            font-family: ${buttonFontFamily || 'inherit'};
                        }
                        .wp-block-zepblock-hero-video .villa-hero-video .hero-video-button:hover {
                            background-color: ${buttonHoverBgColor || '#f0f0f0'};
                            color: ${buttonHoverTextColor || '#333333'};
                        }
                    `), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "villa-hero-video",
    style: {
      borderRadius: `${borderRadius}px`,
      overflow: 'hidden'
    }
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "hero-video"
  }, videoUrl && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("video", {
    className: "video-bg",
    poster: posterUrl,
    muted: muted,
    autoPlay: autoplay,
    loop: loop,
    playsInline: true,
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'cover'
    }
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("source", {
    src: videoUrl,
    type: "video/mp4"
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "video-overlay",
    style: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: getOverlayColor(),
      zIndex: 1
    }
  })), !videoUrl && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    style: {
      width: '100%',
      height: '400px',
      backgroundColor: '#f0f0f0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#666',
      fontSize: '16px'
    }
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Please select a video from the sidebar settings', 'zepblocks'))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "content-info",
    style: {
      textAlign: contentAlign,
      padding: `${padding}px`,
      minHeight: `${videoHeight}px`
    }
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h2", {
    style: {
      color: titleColor,
      fontSize: `${titleFontSize}px`,
      fontWeight: titleFontWeight,
      fontFamily: titleFontFamily || 'inherit',
      margin: '0 0 20px',
      lineHeight: '1.2'
    }
  }, title), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    style: {
      color: descriptionColor,
      fontSize: `${descriptionFontSize}px`,
      fontWeight: descriptionFontWeight,
      fontFamily: descriptionFontFamily || 'inherit',
      margin: '0 0 30px',
      lineHeight: '1.6'
    }
  }, description), buttonText && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    href: buttonUrl,
    className: "hero-video-button",
    style: {
      display: 'inline-block',
      padding: '12px 30px',
      textDecoration: 'none',
      borderRadius: '4px',
      transition: 'all 0.3s ease'
    }
  }, buttonText)))));
}

/***/ },

/***/ "./src/hero-video/index.js"
/*!*********************************!*\
  !*** ./src/hero-video/index.js ***!
  \*********************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _block_json__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./block.json */ "./src/hero-video/block.json");
/* harmony import */ var _edit__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./edit */ "./src/hero-video/edit.js");
/* harmony import */ var _save__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./save */ "./src/hero-video/save.js");
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./style.scss */ "./src/hero-video/style.scss");
/* harmony import */ var _editor_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./editor.scss */ "./src/hero-video/editor.scss");
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
  title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Zepblock Hero Video', 'zepblocks'),
  description: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Display a hero video with overlay content', 'zepblocks'),
  edit: _edit__WEBPACK_IMPORTED_MODULE_3__["default"],
  save: _save__WEBPACK_IMPORTED_MODULE_4__["default"]
});

/***/ },

/***/ "./src/hero-video/save.js"
/*!********************************!*\
  !*** ./src/hero-video/save.js ***!
  \********************************/
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

/***/ "./src/utils/components.js"
/*!*********************************!*\
  !*** ./src/utils/components.js ***!
  \*********************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ColorControl: () => (/* binding */ ColorControl)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);

/**
 * WordPress Dependencies
 */


/**
 * Inline color picker + hex text input pair.
 *
 * @param {Object}   props
 * @param {string}   props.label     Visible label.
 * @param {string}   props.value     Current hex color value.
 * @param {Function} props.onChange  Called with the new hex string.
 * @param {string}   props.placeholder Placeholder text for the text input.
 * @return {JSX.Element}
 */
function ColorControl({
  label,
  value,
  onChange,
  placeholder
}) {
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.BaseControl, {
    label: label
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "zepblocks-color-input-wrapper"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    type: "color",
    value: value,
    onChange: event => onChange(event.target.value),
    className: "zepblocks-color-input"
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    type: "text",
    value: value,
    onChange: event => onChange(event.target.value),
    className: "zepblocks-color-text-input",
    placeholder: placeholder
  })));
}

/***/ },

/***/ "./src/utils/google-fonts.js"
/*!***********************************!*\
  !*** ./src/utils/google-fonts.js ***!
  \***********************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FONT_WEIGHTS: () => (/* binding */ FONT_WEIGHTS),
/* harmony export */   GOOGLE_FONTS: () => (/* binding */ GOOGLE_FONTS),
/* harmony export */   loadGoogleFont: () => (/* binding */ loadGoogleFont)
/* harmony export */ });
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);
/**
 * WordPress Dependencies
 */


/**
 * Google Fonts options list.
 *
 * This constant can be reused across different blocks.
 *
 * @type {Array.<{label: string, value: string}>}
 */
const GOOGLE_FONTS = [{
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Default', 'zepblocks'),
  value: ''
}, {
  label: 'Roboto',
  value: "'Roboto', sans-serif"
}, {
  label: 'Open Sans',
  value: "'Open Sans', sans-serif"
}, {
  label: 'Lato',
  value: "'Lato', sans-serif"
}, {
  label: 'Montserrat',
  value: "'Montserrat', sans-serif"
}, {
  label: 'Oswald',
  value: "'Oswald', sans-serif"
}, {
  label: 'Raleway',
  value: "'Raleway', sans-serif"
}, {
  label: 'Poppins',
  value: "'Poppins', sans-serif"
}, {
  label: 'Roboto Slab',
  value: "'Roboto Slab', serif"
}, {
  label: 'Merriweather',
  value: "'Merriweather', serif"
}, {
  label: 'Playfair Display',
  value: "'Playfair Display', serif"
}, {
  label: 'Lora',
  value: "'Lora', serif"
}, {
  label: 'Source Sans Pro',
  value: "'Source Sans Pro', sans-serif"
}, {
  label: 'Nunito',
  value: "'Nunito', sans-serif"
}, {
  label: 'Ubuntu',
  value: "'Ubuntu', sans-serif"
}, {
  label: 'PT Sans',
  value: "'PT Sans', sans-serif"
}, {
  label: 'Work Sans',
  value: "'Work Sans', sans-serif"
}, {
  label: 'Rubik',
  value: "'Rubik', sans-serif"
}, {
  label: 'Noto Sans',
  value: "'Noto Sans', sans-serif"
}];

/**
 * Font weight options.
 *
 * @type {Array.<{label: string, value: string}>}
 */
const FONT_WEIGHTS = [{
  label: 'Normal',
  value: '400'
}, {
  label: 'Medium',
  value: '500'
}, {
  label: 'Semi Bold',
  value: '600'
}, {
  label: 'Bold',
  value: '700'
}];

/**
 * Loads a Google Font dynamically into the document <head>.
 *
 * @param {string} fontFamily CSS font-family string, e.g. "'Roboto', sans-serif".
 * @return {void}
 */
function loadGoogleFont(fontFamily) {
  if (!fontFamily) {
    return;
  }
  const fontName = fontFamily.split(',')[0].replace(/'/g, '').trim();
  const linkId = `google-font-${fontName.replace(/\s+/g, '-').toLowerCase()}`;
  if (document.getElementById(linkId)) {
    return;
  }
  const link = document.createElement('link');
  link.id = linkId;
  link.rel = 'stylesheet';
  link.href = `https://fonts.googleapis.com/css2?family=${fontName.replace(/\s+/g, '+')}&display=swap`;
  document.head.appendChild(link);
}

/***/ },

/***/ "./src/hero-video/editor.scss"
/*!************************************!*\
  !*** ./src/hero-video/editor.scss ***!
  \************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ },

/***/ "./src/hero-video/style.scss"
/*!***********************************!*\
  !*** ./src/hero-video/style.scss ***!
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

/***/ "./src/hero-video/block.json"
/*!***********************************!*\
  !*** ./src/hero-video/block.json ***!
  \***********************************/
(module) {

module.exports = /*#__PURE__*/JSON.parse('{"apiVersion":3,"name":"zepblock/hero-video","title":"Hero Video","category":"zepblock-block","icon":"format-video","description":"Display a hero video with overlay content","keywords":["hero","video","banner"],"attributes":{"videoUrl":{"type":"string","default":""},"posterUrl":{"type":"string","default":""},"title":{"type":"string","default":"A Beachfront Luxury Vacation Rental Awaits"},"description":{"type":"string","default":"Nestled along the resplendent beaches of Santa Teresa sits Casa Teresa and Casa Teresa Grande, both Costa Rica beachfront villas offering the ultimate luxury vacation rental experience."},"buttonText":{"type":"string","default":"Learn More"},"buttonUrl":{"type":"string","default":"#"},"titleColor":{"type":"string","default":"#ffffff"},"titleFontSize":{"type":"number","default":48},"titleFontWeight":{"type":"string","default":"700"},"titleFontFamily":{"type":"string","default":""},"descriptionColor":{"type":"string","default":"#ffffff"},"descriptionFontSize":{"type":"number","default":18},"descriptionFontWeight":{"type":"string","default":"400"},"descriptionFontFamily":{"type":"string","default":""},"buttonBgColor":{"type":"string","default":"#ffffff"},"buttonTextColor":{"type":"string","default":"#333333"},"buttonHoverBgColor":{"type":"string","default":"#f0f0f0"},"buttonHoverTextColor":{"type":"string","default":"#333333"},"buttonFontSize":{"type":"number","default":16},"buttonFontWeight":{"type":"string","default":"600"},"buttonFontFamily":{"type":"string","default":""},"overlayColor":{"type":"string","default":"#000000"},"overlayOpacity":{"type":"number","default":40},"videoHeight":{"type":"number","default":600},"contentAlign":{"type":"string","default":"center"},"padding":{"type":"number","default":80},"borderRadius":{"type":"number","default":0},"muted":{"type":"boolean","default":true},"autoplay":{"type":"boolean","default":true},"loop":{"type":"boolean","default":true}},"supports":{"align":["wide","full"],"html":false},"editorScript":"file:./index.js","style":"file:./style-index.css","render":"file:./render.php"}');

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
/******/ 			"hero-video/index": 0,
/******/ 			"hero-video/style-index": 0
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
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["hero-video/style-index"], () => (__webpack_require__("./src/hero-video/index.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/
/******/ })()
;
//# sourceMappingURL=index.js.map