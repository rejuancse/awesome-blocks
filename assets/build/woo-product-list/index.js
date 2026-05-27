/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/woo-product-list/edit.js"
/*!**************************************!*\
  !*** ./src/woo-product-list/edit.js ***!
  \**************************************/
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
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/api-fetch */ "@wordpress/api-fetch");
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_6__);







function Edit({
  attributes,
  setAttributes
}) {
  const {
    columns = 3,
    productsPerPage = 6,
    orderBy = 'date',
    order = 'DESC',
    selectedCategories = [],
    showCategory = true,
    showRating = true,
    showPrice = true,
    showAddToCart = true,
    showBadges = true,
    badgePosition = 'top-left'
  } = attributes;
  const blockProps = (0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.useBlockProps)();

  //  State for products (fetched via apiFetch with _embed)
  const [products, setProducts] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_6__.useState)([]);
  const [hasResolved, setHasResolved] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_6__.useState)(false);

  //  Fetch product categories
  const productCategories = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_4__.useSelect)(select => {
    return select('core').getEntityRecords('taxonomy', 'product_cat', {
      per_page: -1,
      hide_empty: true
    }) || [];
  }, []);

  // Fetch products via apiFetch so we can use _embed ─
  // _embed pulls in: featured media, terms (categories), author
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_6__.useEffect)(() => {
    setHasResolved(false);
    const args = new URLSearchParams({
      per_page: productsPerPage,
      orderby: orderBy,
      order: order.toLowerCase(),
      _embed: '1'
    });
    if (selectedCategories.length > 0) {
      // WooCommerce REST API uses product_cat as a comma-separated param
      args.append('product_cat', selectedCategories.join(','));
    }
    _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_5___default()({
      path: `/wc/v3/products?${args.toString()}`
    }).then(data => {
      setProducts(data);
      setHasResolved(true);
    }).catch(() => {
      // Fallback: try core WP REST API if WC REST not available
      _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_5___default()({
        path: `/wp/v2/product?${args.toString()}`
      }).then(data => {
        setProducts(data);
        setHasResolved(true);
      }).catch(() => setHasResolved(true));
    });
  }, [productsPerPage, orderBy, order, selectedCategories]);

  // Get image URL: WC REST API returns images[] array
  const getImageUrl = product => {
    // WooCommerce v3 REST API
    if (product.images && product.images.length > 0) {
      return product.images[0].src;
    }
    // WordPress core REST API with _embed
    if (product._embedded && product._embedded['wp:featuredmedia'] && product._embedded['wp:featuredmedia'][0] && !product._embedded['wp:featuredmedia'][0].code // no error
    ) {
      return product._embedded['wp:featuredmedia'][0].media_details?.sizes?.medium?.source_url || product._embedded['wp:featuredmedia'][0].source_url;
    }
    return null; // will show placeholder
  };

  // Get category names for a product
  const getCategoryNames = product => {
    // WooCommerce v3 REST API returns categories as [{id, name, slug}]
    if (product.categories && product.categories.length > 0) {
      return product.categories.slice(0, 2).map(c => c.name).join(', ');
    }
    // WordPress core REST API with _embed returns wp:term
    if (product._embedded && product._embedded['wp:term']) {
      const terms = product._embedded['wp:term'].flat();
      const cats = terms.filter(t => t.taxonomy === 'product_cat');
      if (cats.length > 0) return cats.slice(0, 2).map(c => c.name).join(', ');
    }
    // Fallback: resolve IDs from productCategories store
    if (product.product_cat && product.product_cat.length > 0) {
      return product.product_cat.slice(0, 2).map(id => {
        const cat = productCategories.find(c => c.id === id);
        return cat ? cat.name : null;
      }).filter(Boolean).join(', ');
    }
    return null;
  };

  // Get price info
  const getPriceInfo = product => {
    var _product$on_sale;
    return {
      price: product.price || product.meta?.price || '',
      regularPrice: product.regular_price || product.meta?.regular_price || '',
      salePrice: product.sale_price || product.meta?.sale_price || '',
      onSale: (_product$on_sale = product.on_sale) !== null && _product$on_sale !== void 0 ? _product$on_sale : false
    };
  };

  // Get rating info
  const getRatingInfo = product => {
    const rating = parseFloat(product.average_rating || product.meta?.average_rating || product['_wc_average_rating'] || 0);
    const count = parseInt(product.rating_count || product.review_count || product['_wc_review_count'] || 0, 10);
    return {
      rating,
      count,
      width: rating / 5 * 100
    };
  };

  // Discount badge
  const getDiscountPercent = product => {
    const {
      regularPrice,
      salePrice,
      onSale
    } = getPriceInfo(product);
    if (!onSale || !salePrice || !regularPrice) return 0;
    const reg = parseFloat(regularPrice);
    const sale = parseFloat(salePrice);
    if (!reg || !sale) return 0;
    return Math.round((reg - sale) / reg * 100);
  };

  //  Category selector helpers
  const categoryOptions = [{
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('All Categories', 'zepblocks'),
    value: ''
  }, ...productCategories.map(cat => ({
    label: cat.name,
    value: String(cat.id) // Keep as string for SelectControl
  }))];
  const selectedCategoryNames = selectedCategories.map(catId => {
    const cat = productCategories.find(c => c.id === catId);
    return cat ? cat.name : null;
  }).filter(Boolean);
  const handleCategoryChange = value => {
    if (!value) {
      setAttributes({
        selectedCategories: []
      });
      return;
    }
    const categoryId = parseInt(value, 10);
    if (isNaN(categoryId)) return;
    const newSelection = selectedCategories.includes(categoryId) ? selectedCategories.filter(id => id !== categoryId) : [...selectedCategories, categoryId];
    setAttributes({
      selectedCategories: newSelection
    });
  };

  //  Placeholder SVG (no image)
  const PLACEHOLDER = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300' viewBox='0 0 300 300'%3E%3Crect width='300' height='300' fill='%23f0f0f0'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='14' fill='%23999'%3ENo Image%3C/text%3E%3C/svg%3E`;

  //  Render
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.InspectorControls, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.PanelBody, {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Layout Settings', 'zepblocks'),
    initialOpen: true
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.RangeControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Columns', 'zepblocks'),
    value: columns,
    onChange: value => setAttributes({
      columns: value
    }),
    min: 1,
    max: 6,
    step: 1
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.RangeControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Products per Page', 'zepblocks'),
    value: productsPerPage,
    onChange: value => setAttributes({
      productsPerPage: value
    }),
    min: 1,
    max: 50,
    step: 1
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.PanelBody, {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Product Query', 'zepblocks'),
    initialOpen: false
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.PanelRow, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.SelectControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Order By', 'zepblocks'),
    value: orderBy,
    options: [{
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Date', 'zepblocks'),
      value: 'date'
    }, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Price', 'zepblocks'),
      value: 'price'
    }, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Popularity', 'zepblocks'),
      value: 'popularity'
    }, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Rating', 'zepblocks'),
      value: 'rating'
    }, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Title', 'zepblocks'),
      value: 'title'
    }, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Random', 'zepblocks'),
      value: 'rand'
    }],
    onChange: value => setAttributes({
      orderBy: value
    })
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.PanelRow, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.SelectControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Order', 'zepblocks'),
    value: order,
    options: [{
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Descending', 'zepblocks'),
      value: 'DESC'
    }, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Ascending', 'zepblocks'),
      value: 'ASC'
    }],
    onChange: value => setAttributes({
      order: value
    })
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.PanelRow, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    style: {
      width: '100%'
    }
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
    style: {
      display: 'block',
      marginBottom: '8px',
      fontWeight: '500'
    }
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Filter by Categories', 'zepblocks')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.SelectControl, {
    value: "",
    options: categoryOptions,
    onChange: handleCategoryChange,
    help: selectedCategories.length > 0 ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Selected:', 'zepblocks') + ' ' + selectedCategoryNames.join(', ') : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Select categories to filter products', 'zepblocks')
  }), selectedCategories.length > 0 && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    style: {
      marginTop: '10px'
    }
  }, selectedCategories.map(catId => {
    const cat = productCategories.find(c => c.id === catId);
    return cat ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
      key: catId,
      style: {
        display: 'inline-block',
        padding: '4px 8px',
        margin: '2px',
        background: '#e0e0e0',
        borderRadius: '4px',
        fontSize: '12px',
        cursor: 'pointer'
      },
      onClick: () => handleCategoryChange(String(catId))
    }, cat.name, " \xD7") : null;
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    style: {
      marginLeft: '8px',
      padding: '4px 8px',
      cursor: 'pointer'
    },
    onClick: () => setAttributes({
      selectedCategories: []
    })
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Clear All', 'zepblocks')))))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.PanelBody, {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Display Options', 'zepblocks'),
    initialOpen: false
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.ToggleControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Show Category', 'zepblocks'),
    checked: showCategory,
    onChange: () => setAttributes({
      showCategory: !showCategory
    })
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.ToggleControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Show Rating', 'zepblocks'),
    checked: showRating,
    onChange: () => setAttributes({
      showRating: !showRating
    })
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.ToggleControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Show Price', 'zepblocks'),
    checked: showPrice,
    onChange: () => setAttributes({
      showPrice: !showPrice
    })
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.ToggleControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Show Add to Cart', 'zepblocks'),
    checked: showAddToCart,
    onChange: () => setAttributes({
      showAddToCart: !showAddToCart
    })
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.ToggleControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Show Badges', 'zepblocks'),
    checked: showBadges,
    onChange: () => setAttributes({
      showBadges: !showBadges
    })
  }), showBadges && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.SelectControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Badge Position', 'zepblocks'),
    value: badgePosition,
    options: [{
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Top Left', 'zepblocks'),
      value: 'top-left'
    }, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Top Right', 'zepblocks'),
      value: 'top-right'
    }, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Bottom Left', 'zepblocks'),
      value: 'bottom-left'
    }, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Bottom Right', 'zepblocks'),
      value: 'bottom-right'
    }],
    onChange: value => setAttributes({
      badgePosition: value
    })
  }))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    ...blockProps
  }, !hasResolved ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    style: {
      display: 'flex',
      justifyContent: 'center',
      padding: '40px'
    }
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Spinner, null)) : products.length === 0 ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    style: {
      padding: '40px',
      textAlign: 'center',
      background: '#f9f9f9',
      borderRadius: '8px'
    }
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('No products found. Add some WooCommerce products first.', 'zepblocks'))) : (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: `zepblocks-products-list zepblocks-columns-${columns}`
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "zepblocks-row"
  }, products.map(product => {
    const imageUrl = getImageUrl(product) || PLACEHOLDER;
    const categoryHtml = showCategory ? getCategoryNames(product) : null;
    const {
      rating,
      count,
      width: ratingWidth
    } = getRatingInfo(product);
    const {
      price,
      regularPrice,
      salePrice,
      onSale
    } = getPriceInfo(product);
    const discountPct = showBadges ? getDiscountPercent(product) : 0;
    const productLink = product.permalink || product.link || '#';
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      key: product.id,
      className: `zepblocks-col zepblocks-col-${12 / columns}`
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "zepblocks-product-card"
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "zepblocks-product-image-wrapper"
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
      href: productLink,
      className: "zepblocks-product-image",
      target: "_blank",
      rel: "noopener noreferrer"
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
      src: imageUrl,
      alt: product.name || product.title?.rendered || ''
    })), showBadges && discountPct > 0 && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: `zepblocks-product-badges zepblocks-badge-${badgePosition}`
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
      className: "zepblocks-discount-badge"
    }, "-", discountPct, "%"))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "zepblocks-product-details"
    }, categoryHtml && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "zepblocks-product-category"
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", null, categoryHtml)), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", {
      className: "zepblocks-product-title"
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
      href: productLink,
      target: "_blank",
      rel: "noopener noreferrer"
    }, product.name || product.title?.rendered || (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Untitled Product', 'zepblocks'))), showRating && rating > 0 && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "zepblocks-product-rating"
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "star-rating",
      title: `Rated ${rating} out of 5`
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
      style: {
        width: `${ratingWidth}%`
      }
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("strong", null, rating), " out of ", (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", null, "5"))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "zepblocks-review-count"
    }, "(", count, ")")), showPrice && price && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "zepblocks-product-price"
    }, onSale && regularPrice && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("del", {
      className: "zepblocks-regular-price"
    }, "$", regularPrice), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
      className: onSale ? 'zepblocks-sale-price' : ''
    }, "$", onSale ? salePrice : price)), showAddToCart && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "zepblocks-add-to-cart"
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Add to cart', 'zepblocks'))))));
  })))));
}

/***/ },

/***/ "./src/woo-product-list/index.js"
/*!***************************************!*\
  !*** ./src/woo-product-list/index.js ***!
  \***************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _block_json__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./block.json */ "./src/woo-product-list/block.json");
/* harmony import */ var _edit__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./edit */ "./src/woo-product-list/edit.js");
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./style.scss */ "./src/woo-product-list/style.scss");
/* harmony import */ var _editor_scss__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./editor.scss */ "./src/woo-product-list/editor.scss");
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
  title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Zepblock Product List', 'zepblocks'),
  description: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Display WooCommerce products in a beautiful grid layout', 'zepblocks'),
  edit: _edit__WEBPACK_IMPORTED_MODULE_3__["default"],
  save: () => null // Dynamic block, rendered via PHP
});

/***/ },

/***/ "./src/woo-product-list/editor.scss"
/*!******************************************!*\
  !*** ./src/woo-product-list/editor.scss ***!
  \******************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ },

/***/ "./src/woo-product-list/style.scss"
/*!*****************************************!*\
  !*** ./src/woo-product-list/style.scss ***!
  \*****************************************/
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

/***/ "@wordpress/api-fetch"
/*!**********************************!*\
  !*** external ["wp","apiFetch"] ***!
  \**********************************/
(module) {

module.exports = window["wp"]["apiFetch"];

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

/***/ "./src/woo-product-list/block.json"
/*!*****************************************!*\
  !*** ./src/woo-product-list/block.json ***!
  \*****************************************/
(module) {

module.exports = /*#__PURE__*/JSON.parse('{"apiVersion":3,"name":"zepblock/woo-product-list","title":"Zepblock Product List","category":"zepblock-block","icon":"products","description":"Display WooCommerce products in a beautiful grid layout","keywords":["woocommerce","products","product list","shop"],"attributes":{"columns":{"type":"number","default":3},"productsPerPage":{"type":"number","default":6},"orderBy":{"type":"string","default":"date"},"order":{"type":"string","default":"DESC"},"selectedCategories":{"type":"array","default":[]},"showCategory":{"type":"boolean","default":true},"showRating":{"type":"boolean","default":true},"showPrice":{"type":"boolean","default":true},"showAddToCart":{"type":"boolean","default":true},"showBadges":{"type":"boolean","default":true},"badgePosition":{"type":"string","default":"top-left"}},"supports":{"align":["wide","full"],"html":false},"editorScript":"file:./index.js","style":"file:./style-index.css"}');

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
/******/ 			"woo-product-list/index": 0,
/******/ 			"woo-product-list/style-index": 0
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
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["woo-product-list/style-index"], () => (__webpack_require__("./src/woo-product-list/index.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=index.js.map