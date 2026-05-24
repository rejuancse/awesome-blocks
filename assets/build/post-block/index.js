/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/post-block/edit.js"
/*!********************************!*\
  !*** ./src/post-block/edit.js ***!
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
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _utils_google_fonts__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../utils/google-fonts */ "./src/utils/google-fonts.js");
/* harmony import */ var _utils_components__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../utils/components */ "./src/utils/components.js");

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
  postsToShow: 3,
  order: 'desc',
  orderBy: 'date',
  columns: 3,
  displayTitle: true,
  displayExcerpt: true,
  displayDate: true,
  displayAuthor: false,
  displayThumbnail: true,
  thumbnailSize: 'medium',
  categories: [],
  titleColor: '#333333',
  titleFontSize: 22,
  titleFontWeight: '600',
  titleFontFamily: '',
  excerptColor: '#555555',
  excerptFontSize: 15,
  excerptFontWeight: '400',
  excerptFontFamily: '',
  excerptMaxChars: 0,
  metaColor: '#666666',
  metaFontSize: 14,
  metaFontWeight: '400',
  metaFontFamily: '',
  linkColor: '#0073aa',
  linkHoverColor: '#005177',
  linkFontSize: 14,
  linkFontWeight: '600',
  linkFontFamily: '',
  cardBgColor: '#ffffff',
  cardBorder: 'none',
  cardBorderRadius: 8,
  cardPadding: 20,
  thumbnailBorderRadius: 0,
  thumbnailHeight: 0,
  gap: 30
};

/**
 * Returns the featured image URL for a post, falling back gracefully.
 *
 * @param {Object} post          WP post object with _embedded data.
 * @param {string} thumbnailSize Registered image size slug.
 * @return {string|null} Image source URL, or null when unavailable.
 */
function getFeaturedImageUrl(post, thumbnailSize) {
  const media = post?._embedded?.['wp:featuredmedia']?.[0];
  if (!media) {
    return null;
  }
  return media?.media_details?.sizes?.[thumbnailSize]?.source_url || media.source_url;
}

/**
 * Edit component for the TBlock Posts block.
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
    postsToShow = DEFAULTS.postsToShow,
    order = DEFAULTS.order,
    orderBy = DEFAULTS.orderBy,
    columns = DEFAULTS.columns,
    displayTitle = DEFAULTS.displayTitle,
    displayExcerpt = DEFAULTS.displayExcerpt,
    displayDate = DEFAULTS.displayDate,
    displayAuthor = DEFAULTS.displayAuthor,
    displayThumbnail = DEFAULTS.displayThumbnail,
    thumbnailSize = DEFAULTS.thumbnailSize,
    categories = DEFAULTS.categories,
    titleColor = DEFAULTS.titleColor,
    titleFontSize = DEFAULTS.titleFontSize,
    titleFontWeight = DEFAULTS.titleFontWeight,
    titleFontFamily = DEFAULTS.titleFontFamily,
    excerptColor = DEFAULTS.excerptColor,
    excerptFontSize = DEFAULTS.excerptFontSize,
    excerptFontWeight = DEFAULTS.excerptFontWeight,
    excerptFontFamily = DEFAULTS.excerptFontFamily,
    excerptMaxChars = DEFAULTS.excerptMaxChars,
    metaColor = DEFAULTS.metaColor,
    metaFontSize = DEFAULTS.metaFontSize,
    metaFontWeight = DEFAULTS.metaFontWeight,
    metaFontFamily = DEFAULTS.metaFontFamily,
    linkColor = DEFAULTS.linkColor,
    linkHoverColor = DEFAULTS.linkHoverColor,
    linkFontSize = DEFAULTS.linkFontSize,
    linkFontWeight = DEFAULTS.linkFontWeight,
    linkFontFamily = DEFAULTS.linkFontFamily,
    cardBgColor = DEFAULTS.cardBgColor,
    cardBorder = DEFAULTS.cardBorder,
    cardBorderRadius = DEFAULTS.cardBorderRadius,
    cardPadding = DEFAULTS.cardPadding,
    thumbnailBorderRadius = DEFAULTS.thumbnailBorderRadius,
    thumbnailHeight = DEFAULTS.thumbnailHeight,
    gap = DEFAULTS.gap
  } = attributes;
  const blockProps = (0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.useBlockProps)();

  // ── Data fetching ────────────────────────────────────────────────────────

  /** @type {Array|null} posts */
  const posts = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_2__.useSelect)(select => {
    const query = {
      per_page: postsToShow,
      order,
      orderby: orderBy,
      _embed: true
    };
    if (Array.isArray(categories) && categories.length > 0) {
      query.categories = categories;
    }
    return select('core').getEntityRecords('postType', 'post', query);
  }, [postsToShow, order, orderBy, categories]);

  /** @type {Array|null} allCategories */
  const allCategories = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_2__.useSelect)(select => {
    return select('core').getEntityRecords('taxonomy', 'category', {
      per_page: -1
    });
  }, []);

  // ── Side effects ─────────────────────────────────────────────────────────

  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.useEffect)(() => {
    (0,_utils_google_fonts__WEBPACK_IMPORTED_MODULE_6__.loadGoogleFont)(titleFontFamily);
  }, [titleFontFamily]);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.useEffect)(() => {
    (0,_utils_google_fonts__WEBPACK_IMPORTED_MODULE_6__.loadGoogleFont)(excerptFontFamily);
  }, [excerptFontFamily]);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.useEffect)(() => {
    (0,_utils_google_fonts__WEBPACK_IMPORTED_MODULE_6__.loadGoogleFont)(metaFontFamily);
  }, [metaFontFamily]);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.useEffect)(() => {
    (0,_utils_google_fonts__WEBPACK_IMPORTED_MODULE_6__.loadGoogleFont)(linkFontFamily);
  }, [linkFontFamily]);

  // ── Derived values ───────────────────────────────────────────────────────

  const categoryOptions = [{
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('All Categories', 'theme-blocks'),
    value: ''
  }, ...(allCategories || []).map(cat => ({
    label: cat.name,
    value: cat.id
  }))];

  // ── Attribute change handlers ─────────────────────────────────────────────

  const onChangeCategory = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.useCallback)(value => setAttributes({
    categories: value ? [parseInt(value, 10)] : []
  }), [setAttributes]);
  const onToggleDisplayTitle = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.useCallback)(() => setAttributes({
    displayTitle: !displayTitle
  }), [setAttributes, displayTitle]);
  const onToggleDisplayExcerpt = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.useCallback)(() => setAttributes({
    displayExcerpt: !displayExcerpt
  }), [setAttributes, displayExcerpt]);
  const onToggleDisplayDate = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.useCallback)(() => setAttributes({
    displayDate: !displayDate
  }), [setAttributes, displayDate]);
  const onToggleDisplayAuthor = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.useCallback)(() => setAttributes({
    displayAuthor: !displayAuthor
  }), [setAttributes, displayAuthor]);
  const onToggleDisplayThumbnail = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.useCallback)(() => setAttributes({
    displayThumbnail: !displayThumbnail
  }), [setAttributes, displayThumbnail]);

  // ── Render ───────────────────────────────────────────────────────────────

  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.InspectorControls, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.PanelBody, {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Settings', 'theme-blocks')
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.SelectControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Posts to Show', 'theme-blocks'),
    value: postsToShow,
    options: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => ({
      label: String(n),
      value: n
    })),
    onChange: value => setAttributes({
      postsToShow: value
    })
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.SelectControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Category', 'theme-blocks'),
    value: (Array.isArray(categories) ? categories[0] : '') || '',
    options: categoryOptions,
    onChange: onChangeCategory,
    help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Select a category to filter posts', 'theme-blocks')
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.SelectControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Order By', 'theme-blocks'),
    value: orderBy,
    options: [{
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Date', 'theme-blocks'),
      value: 'date'
    }, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Title', 'theme-blocks'),
      value: 'title'
    }, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Modified', 'theme-blocks'),
      value: 'modified'
    }, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Author', 'theme-blocks'),
      value: 'author'
    }, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Random', 'theme-blocks'),
      value: 'rand'
    }],
    onChange: value => setAttributes({
      orderBy: value
    })
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.SelectControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Order', 'theme-blocks'),
    value: order,
    options: [{
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Descending', 'theme-blocks'),
      value: 'desc'
    }, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Ascending', 'theme-blocks'),
      value: 'asc'
    }],
    onChange: value => setAttributes({
      order: value
    })
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.RangeControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Columns', 'theme-blocks'),
    value: columns,
    onChange: value => setAttributes({
      columns: value
    }),
    min: 1,
    max: 6
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.SelectControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Thumbnail Size', 'theme-blocks'),
    value: thumbnailSize,
    options: [{
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Thumbnail', 'theme-blocks'),
      value: 'thumbnail'
    }, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Medium', 'theme-blocks'),
      value: 'medium'
    }, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Medium Large', 'theme-blocks'),
      value: 'medium_large'
    }, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Large', 'theme-blocks'),
      value: 'large'
    }, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Full', 'theme-blocks'),
      value: 'full'
    }],
    onChange: value => setAttributes({
      thumbnailSize: value
    })
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.PanelBody, {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Display Options', 'theme-blocks'),
    initialOpen: false
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.ToggleControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Display Title', 'theme-blocks'),
    checked: displayTitle,
    onChange: onToggleDisplayTitle
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.ToggleControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Display Excerpt', 'theme-blocks'),
    checked: displayExcerpt,
    onChange: onToggleDisplayExcerpt
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.ToggleControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Display Date', 'theme-blocks'),
    checked: displayDate,
    onChange: onToggleDisplayDate
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.ToggleControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Display Author', 'theme-blocks'),
    checked: displayAuthor,
    onChange: onToggleDisplayAuthor
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.ToggleControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Display Thumbnail', 'theme-blocks'),
    checked: displayThumbnail,
    onChange: onToggleDisplayThumbnail
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.PanelBody, {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Style Settings', 'theme-blocks'),
    initialOpen: false
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Title Style', 'theme-blocks')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_utils_components__WEBPACK_IMPORTED_MODULE_7__.ColorControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Title Color', 'theme-blocks'),
    value: titleColor,
    onChange: value => setAttributes({
      titleColor: value
    }),
    placeholder: "#333333"
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.RangeControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Title Font Size', 'theme-blocks'),
    value: titleFontSize,
    onChange: value => setAttributes({
      titleFontSize: value
    }),
    min: 12,
    max: 60
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.SelectControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Title Font Weight', 'theme-blocks'),
    value: titleFontWeight,
    options: _utils_google_fonts__WEBPACK_IMPORTED_MODULE_6__.FONT_WEIGHTS,
    onChange: value => setAttributes({
      titleFontWeight: value
    })
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.SelectControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Title Font Family', 'theme-blocks'),
    value: titleFontFamily,
    options: _utils_google_fonts__WEBPACK_IMPORTED_MODULE_6__.GOOGLE_FONTS,
    onChange: value => setAttributes({
      titleFontFamily: value
    }),
    help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Select a Google Font for the title', 'theme-blocks')
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Excerpt Style', 'theme-blocks')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_utils_components__WEBPACK_IMPORTED_MODULE_7__.ColorControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Excerpt Color', 'theme-blocks'),
    value: excerptColor,
    onChange: value => setAttributes({
      excerptColor: value
    }),
    placeholder: "#555555"
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.RangeControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Excerpt Font Size', 'theme-blocks'),
    value: excerptFontSize,
    onChange: value => setAttributes({
      excerptFontSize: value
    }),
    min: 12,
    max: 30
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.SelectControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Excerpt Font Weight', 'theme-blocks'),
    value: excerptFontWeight,
    options: _utils_google_fonts__WEBPACK_IMPORTED_MODULE_6__.FONT_WEIGHTS,
    onChange: value => setAttributes({
      excerptFontWeight: value
    })
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.SelectControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Excerpt Font Family', 'theme-blocks'),
    value: excerptFontFamily,
    options: _utils_google_fonts__WEBPACK_IMPORTED_MODULE_6__.GOOGLE_FONTS,
    onChange: value => setAttributes({
      excerptFontFamily: value
    }),
    help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Select a Google Font for the excerpt', 'theme-blocks')
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.RangeControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Excerpt Max Characters', 'theme-blocks'),
    value: excerptMaxChars,
    onChange: value => setAttributes({
      excerptMaxChars: value
    }),
    min: 0,
    max: 500,
    help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Set 0 to show full excerpt', 'theme-blocks')
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", {
    className: "meta-style"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Meta Style', 'theme-blocks')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_utils_components__WEBPACK_IMPORTED_MODULE_7__.ColorControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Meta Color', 'theme-blocks'),
    value: metaColor,
    onChange: value => setAttributes({
      metaColor: value
    }),
    placeholder: "#666666"
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.RangeControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Meta Font Size', 'theme-blocks'),
    value: metaFontSize,
    onChange: value => setAttributes({
      metaFontSize: value
    }),
    min: 10,
    max: 24
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.SelectControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Meta Font Weight', 'theme-blocks'),
    value: metaFontWeight,
    options: _utils_google_fonts__WEBPACK_IMPORTED_MODULE_6__.FONT_WEIGHTS,
    onChange: value => setAttributes({
      metaFontWeight: value
    })
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.SelectControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Meta Font Family', 'theme-blocks'),
    value: metaFontFamily,
    options: _utils_google_fonts__WEBPACK_IMPORTED_MODULE_6__.GOOGLE_FONTS,
    onChange: value => setAttributes({
      metaFontFamily: value
    }),
    help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Select a Google Font for meta info', 'theme-blocks')
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", {
    className: "meta-style"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Link Style', 'theme-blocks')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_utils_components__WEBPACK_IMPORTED_MODULE_7__.ColorControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Link Color', 'theme-blocks'),
    value: linkColor,
    onChange: value => setAttributes({
      linkColor: value
    }),
    placeholder: "#0073aa"
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_utils_components__WEBPACK_IMPORTED_MODULE_7__.ColorControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Link Hover Color', 'theme-blocks'),
    value: linkHoverColor,
    onChange: value => setAttributes({
      linkHoverColor: value
    }),
    placeholder: "#005177"
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.RangeControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Link Font Size', 'theme-blocks'),
    value: linkFontSize,
    onChange: value => setAttributes({
      linkFontSize: value
    }),
    min: 10,
    max: 30
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.SelectControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Link Font Weight', 'theme-blocks'),
    value: linkFontWeight,
    options: _utils_google_fonts__WEBPACK_IMPORTED_MODULE_6__.FONT_WEIGHTS,
    onChange: value => setAttributes({
      linkFontWeight: value
    })
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.SelectControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Link Font Family', 'theme-blocks'),
    value: linkFontFamily,
    options: _utils_google_fonts__WEBPACK_IMPORTED_MODULE_6__.GOOGLE_FONTS,
    onChange: value => setAttributes({
      linkFontFamily: value
    }),
    help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Select a Google Font for links', 'theme-blocks')
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", {
    className: "meta-style"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Card Style', 'theme-blocks')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_utils_components__WEBPACK_IMPORTED_MODULE_7__.ColorControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Card Background Color', 'theme-blocks'),
    value: cardBgColor,
    onChange: value => setAttributes({
      cardBgColor: value
    }),
    placeholder: "#ffffff"
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.TextControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Card Border', 'theme-blocks'),
    value: cardBorder,
    onChange: value => setAttributes({
      cardBorder: value
    }),
    placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('e.g., 1px solid #ddd', 'theme-blocks'),
    help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('CSS border property (e.g., 1px solid #ddd)', 'theme-blocks')
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.RangeControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Card Border Radius', 'theme-blocks'),
    value: cardBorderRadius,
    onChange: value => setAttributes({
      cardBorderRadius: value
    }),
    min: 0,
    max: 50
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.RangeControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Card Padding', 'theme-blocks'),
    value: cardPadding,
    onChange: value => setAttributes({
      cardPadding: value
    }),
    min: 0,
    max: 60
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Thumbnail Style', 'theme-blocks')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.RangeControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Thumbnail Border Radius', 'theme-blocks'),
    value: thumbnailBorderRadius,
    onChange: value => setAttributes({
      thumbnailBorderRadius: value
    }),
    min: 0,
    max: 50
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.RangeControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Thumbnail Height (px)', 'theme-blocks'),
    value: thumbnailHeight,
    onChange: value => setAttributes({
      thumbnailHeight: value
    }),
    min: 0,
    max: 600,
    help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Set 0 for auto height', 'theme-blocks')
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", {
    className: "meta-style"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Layout', 'theme-blocks')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.RangeControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Gap Between Cards', 'theme-blocks'),
    value: gap,
    onChange: value => setAttributes({
      gap: value
    }),
    min: 0,
    max: 100
  }))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    ...blockProps
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("style", null, `
						.wp-block-tblock-post-block .theme-blocks-post-read-more {
							color: ${linkColor || '#0073aa'};
							font-size: ${linkFontSize || 14}px;
							font-weight: ${linkFontWeight || '600'};
							font-family: ${linkFontFamily || 'inherit'};
						}
						.wp-block-tblock-post-block .theme-blocks-post-read-more:hover,
						.wp-block-tblock-post-block .theme-blocks-post-title a:hover {
							color: ${linkHoverColor || '#005177'} !important;
						}
					`), null === posts && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "theme-blocks-loading"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.Spinner, null), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Loading posts…', 'theme-blocks'))), null !== posts && posts.length === 0 && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "theme-blocks-no-posts"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('No posts found.', 'theme-blocks'))), null !== posts && posts.length > 0 && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("ul", {
    className: `theme-blocks-posts-grid columns-${columns}`,
    style: {
      gap: `${gap}px`
    }
  }, posts.map(post => {
    const imageUrl = displayThumbnail ? getFeaturedImageUrl(post, thumbnailSize) : null;
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", {
      key: post.id,
      className: "theme-blocks-post-item",
      style: {
        backgroundColor: cardBgColor,
        border: cardBorder,
        borderRadius: `${cardBorderRadius}px`
      }
    }, imageUrl && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "theme-blocks-post-thumbnail"
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
      href: post.link
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
      src: imageUrl,
      alt: post._embedded?.['wp:featuredmedia']?.[0]?.alt_text || post.title.rendered,
      style: {
        borderRadius: `${thumbnailBorderRadius}px`,
        height: thumbnailHeight > 0 ? `${thumbnailHeight}px` : 'auto'
      }
    }))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "theme-blocks-post-content",
      style: {
        padding: `${cardPadding}px`
      }
    }, (displayDate || displayAuthor) && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "theme-blocks-post-meta",
      style: {
        color: metaColor,
        fontSize: `${metaFontSize}px`,
        fontWeight: metaFontWeight,
        fontFamily: metaFontFamily || 'inherit'
      }
    }, displayDate && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
      className: "theme-blocks-post-date"
    }, new Date(post.date).toLocaleDateString()), displayAuthor && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
      className: "theme-blocks-post-author"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('By ', 'theme-blocks'), post._embedded?.author?.[0]?.name || (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Unknown', 'theme-blocks'))), displayTitle && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", {
      className: "theme-blocks-post-title",
      style: {
        color: titleColor,
        fontSize: `${titleFontSize}px`,
        fontWeight: titleFontWeight,
        fontFamily: titleFontFamily || 'inherit'
      }
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
      href: post.link,
      dangerouslySetInnerHTML: {
        __html: post.title.rendered
      }
    })), displayExcerpt && (() => {
      const rawHtml = post.excerpt.rendered;
      const plainText = rawHtml.replace(/<[^>]+>/g, '');
      const content = excerptMaxChars > 0 && plainText.length > excerptMaxChars ? plainText.substring(0, excerptMaxChars) + '…' : rawHtml;
      const useHtml = !(excerptMaxChars > 0 && plainText.length > excerptMaxChars);
      return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
        className: "theme-blocks-post-excerpt",
        ...(useHtml ? {
          dangerouslySetInnerHTML: {
            __html: content
          }
        } : {
          children: content
        }),
        style: {
          color: excerptColor,
          fontSize: `${excerptFontSize}px`,
          fontWeight: excerptFontWeight,
          fontFamily: excerptFontFamily || 'inherit'
        }
      });
    })(), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
      href: post.link,
      className: "theme-blocks-post-read-more"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Read More →', 'theme-blocks'))));
  }))));
}

/***/ },

/***/ "./src/post-block/index.js"
/*!*********************************!*\
  !*** ./src/post-block/index.js ***!
  \*********************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _block_json__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./block.json */ "./src/post-block/block.json");
/* harmony import */ var _edit__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./edit */ "./src/post-block/edit.js");
/* harmony import */ var _save__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./save */ "./src/post-block/save.js");
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./style.scss */ "./src/post-block/style.scss");
/* harmony import */ var _editor_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./editor.scss */ "./src/post-block/editor.scss");
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
  title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('TBlock Post Block', 'theme-blocks'),
  description: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Display posts with customizable layout', 'theme-blocks'),
  edit: _edit__WEBPACK_IMPORTED_MODULE_3__["default"],
  save: _save__WEBPACK_IMPORTED_MODULE_4__["default"]
});

/***/ },

/***/ "./src/post-block/save.js"
/*!********************************!*\
  !*** ./src/post-block/save.js ***!
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
    className: "theme-blocks-color-input-wrapper"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    type: "color",
    value: value,
    onChange: event => onChange(event.target.value),
    className: "theme-blocks-color-input"
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    type: "text",
    value: value,
    onChange: event => onChange(event.target.value),
    className: "theme-blocks-color-text-input",
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
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Default', 'theme-blocks'),
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

/***/ "./src/post-block/editor.scss"
/*!************************************!*\
  !*** ./src/post-block/editor.scss ***!
  \************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ },

/***/ "./src/post-block/style.scss"
/*!***********************************!*\
  !*** ./src/post-block/style.scss ***!
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

/***/ "./src/post-block/block.json"
/*!***********************************!*\
  !*** ./src/post-block/block.json ***!
  \***********************************/
(module) {

module.exports = /*#__PURE__*/JSON.parse('{"apiVersion":3,"name":"tblock/post-block","title":"Post Block","category":"tblock-block","icon":"embed-post","description":"Display posts with customizable layout","keywords":["post","blog","news"],"attributes":{"postsToShow":{"type":"number","default":3},"order":{"type":"string","default":"desc"},"orderBy":{"type":"string","default":"date"},"columns":{"type":"number","default":3},"displayTitle":{"type":"boolean","default":true},"displayExcerpt":{"type":"boolean","default":true},"displayDate":{"type":"boolean","default":true},"displayAuthor":{"type":"boolean","default":false},"displayThumbnail":{"type":"boolean","default":true},"thumbnailSize":{"type":"string","default":"medium"},"categories":{"type":"array","items":{"type":"number"}},"titleColor":{"type":"string","default":"#333333"},"titleFontSize":{"type":"number","default":22},"titleFontWeight":{"type":"string","default":"600"},"titleFontFamily":{"type":"string","default":""},"excerptColor":{"type":"string","default":"#555555"},"excerptFontSize":{"type":"number","default":15},"excerptFontWeight":{"type":"string","default":"400"},"excerptFontFamily":{"type":"string","default":""},"excerptMaxChars":{"type":"number","default":0},"metaColor":{"type":"string","default":"#666666"},"metaFontSize":{"type":"number","default":14},"metaFontWeight":{"type":"string","default":"400"},"metaFontFamily":{"type":"string","default":""},"linkColor":{"type":"string","default":"#0073aa"},"linkHoverColor":{"type":"string","default":"#005177"},"linkFontSize":{"type":"number","default":14},"linkFontWeight":{"type":"string","default":"600"},"linkFontFamily":{"type":"string","default":""},"cardBgColor":{"type":"string","default":"#ffffff"},"cardBorder":{"type":"string","default":"none"},"cardBorderRadius":{"type":"number","default":8},"cardPadding":{"type":"number","default":20},"thumbnailBorderRadius":{"type":"number","default":0},"thumbnailHeight":{"type":"number","default":0},"gap":{"type":"number","default":30}},"supports":{"align":["wide","full"],"html":false},"editorScript":"file:./index.js","style":"file:./style-index.css"}');

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
/******/ 			"post-block/index": 0,
/******/ 			"post-block/style-index": 0
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
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["post-block/style-index"], () => (__webpack_require__("./src/post-block/index.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=index.js.map