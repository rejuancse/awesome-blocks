/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import {
    PanelBody,
    PanelRow,
    RangeControl,
    SelectControl,
    ToggleControl,
    Spinner,
} from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import apiFetch from '@wordpress/api-fetch';
import { useState, useEffect } from '@wordpress/element';

/**
 * Edit Component
 */
export default function Edit({ attributes, setAttributes }) {
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
        badgePosition = 'top-left',
    } = attributes;

    const blockProps = useBlockProps();

    //  State for products (fetched via apiFetch with _embed)
    const [products, setProducts]       = useState([]);
    const [hasResolved, setHasResolved] = useState(false);

    //  Fetch product categories
    const productCategories = useSelect((select) => {
        return select('core').getEntityRecords('taxonomy', 'product_cat', {
            per_page: -1,
            hide_empty: true,
        }) || [];
    }, []);

    // Fetch products via apiFetch so we can use _embed ─
    // _embed pulls in: featured media, terms (categories), author
    useEffect(() => {
        setHasResolved(false);

        const args = new URLSearchParams({
            per_page:   productsPerPage,
            orderby:    orderBy,
            order:      order.toLowerCase(),
            _embed:     '1',            // ← KEY: brings in _embedded data
        });

        if (selectedCategories.length > 0) {
            // WooCommerce REST API uses product_cat as a comma-separated param
            args.append('product_cat', selectedCategories.join(','));
        }

        apiFetch({ path: `/wc/v3/products?${args.toString()}` })
            .then((data) => {
                setProducts(data);
                setHasResolved(true);
            })
            .catch(() => {
                // Fallback: try core WP REST API if WC REST not available
                apiFetch({ path: `/wp/v2/product?${args.toString()}` })
                    .then((data) => {
                        setProducts(data);
                        setHasResolved(true);
                    })
                    .catch(() => setHasResolved(true));
            });
    }, [productsPerPage, orderBy, order, selectedCategories]);

    // Get image URL: WC REST API returns images[] array
    const getImageUrl = (product) => {
        // WooCommerce v3 REST API
        if (product.images && product.images.length > 0) {
            return product.images[0].src;
        }
        // WordPress core REST API with _embed
        if (
            product._embedded &&
            product._embedded['wp:featuredmedia'] &&
            product._embedded['wp:featuredmedia'][0] &&
            !product._embedded['wp:featuredmedia'][0].code // no error
        ) {
            return (
                product._embedded['wp:featuredmedia'][0].media_details?.sizes?.medium?.source_url ||
                product._embedded['wp:featuredmedia'][0].source_url
            );
        }
        return null; // will show placeholder
    };

    // Get category names for a product
    const getCategoryNames = (product) => {
        // WooCommerce v3 REST API returns categories as [{id, name, slug}]
        if (product.categories && product.categories.length > 0) {
            return product.categories.slice(0, 2).map(c => c.name).join(', ');
        }
        // WordPress core REST API with _embed returns wp:term
        if (product._embedded && product._embedded['wp:term']) {
            const terms = product._embedded['wp:term'].flat();
            const cats  = terms.filter(t => t.taxonomy === 'product_cat');
            if (cats.length > 0) return cats.slice(0, 2).map(c => c.name).join(', ');
        }
        // Fallback: resolve IDs from productCategories store
        if (product.product_cat && product.product_cat.length > 0) {
            return product.product_cat
                .slice(0, 2)
                .map(id => {
                    const cat = productCategories.find(c => c.id === id);
                    return cat ? cat.name : null;
                })
                .filter(Boolean)
                .join(', ');
        }
        return null;
    };

    // Get price info
    const getPriceInfo = (product) => {
        return {
            price:         product.price         || product.meta?.price         || '',
            regularPrice:  product.regular_price || product.meta?.regular_price || '',
            salePrice:     product.sale_price    || product.meta?.sale_price    || '',
            onSale:        product.on_sale        ?? false,
        };
    };

    // Get rating info
    const getRatingInfo = (product) => {
        const rating = parseFloat(
            product.average_rating ||
            product.meta?.average_rating ||
            product['_wc_average_rating'] ||
            0
        );
        const count = parseInt(
            product.rating_count ||
            product.review_count ||
            product['_wc_review_count'] ||
            0,
            10
        );
        return { rating, count, width: (rating / 5) * 100 };
    };

    // Discount badge
    const getDiscountPercent = (product) => {
        const { regularPrice, salePrice, onSale } = getPriceInfo(product);
        if (!onSale || !salePrice || !regularPrice) return 0;
        const reg  = parseFloat(regularPrice);
        const sale = parseFloat(salePrice);
        if (!reg || !sale) return 0;
        return Math.round(((reg - sale) / reg) * 100);
    };

    //  Category selector helpers
    const categoryOptions = [
        { label: __('All Categories', 'awesome-blocks'), value: '' },
        ...productCategories.map(cat => ({
            label: cat.name,
            value: String(cat.id), // Keep as string for SelectControl
        })),
    ];

    const selectedCategoryNames = selectedCategories.map(catId => {
        const cat = productCategories.find(c => c.id === catId);
        return cat ? cat.name : null;
    }).filter(Boolean);

    const handleCategoryChange = (value) => {
        if (!value) {
            setAttributes({ selectedCategories: [] });
            return;
        }
        const categoryId = parseInt(value, 10);
        if (isNaN(categoryId)) return;
        const newSelection = selectedCategories.includes(categoryId)
            ? selectedCategories.filter(id => id !== categoryId)
            : [...selectedCategories, categoryId];
        setAttributes({ selectedCategories: newSelection });
    };

    //  Placeholder SVG (no image)
    const PLACEHOLDER = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300' viewBox='0 0 300 300'%3E%3Crect width='300' height='300' fill='%23f0f0f0'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='14' fill='%23999'%3ENo Image%3C/text%3E%3C/svg%3E`;

    //  Render
    return (
        <>
            <InspectorControls>
                {/* Layout Settings */}
                <PanelBody title={__('Layout Settings', 'awesome-blocks')} initialOpen={true}>
                    <RangeControl
                        label={__('Columns', 'awesome-blocks')}
                        value={columns}
                        onChange={(value) => setAttributes({ columns: value })}
                        min={1} max={6} step={1}
                    />
                    <RangeControl
                        label={__('Products per Page', 'awesome-blocks')}
                        value={productsPerPage}
                        onChange={(value) => setAttributes({ productsPerPage: value })}
                        min={1} max={50} step={1}
                    />
                </PanelBody>

                {/* Product Query */}
                <PanelBody title={__('Product Query', 'awesome-blocks')} initialOpen={false}>
                    <PanelRow>
                        <SelectControl
                            label={__('Order By', 'awesome-blocks')}
                            value={orderBy}
                            options={[
                                { label: __('Date', 'awesome-blocks'),       value: 'date' },
                                { label: __('Price', 'awesome-blocks'),      value: 'price' },
                                { label: __('Popularity', 'awesome-blocks'), value: 'popularity' },
                                { label: __('Rating', 'awesome-blocks'),     value: 'rating' },
                                { label: __('Title', 'awesome-blocks'),      value: 'title' },
                                { label: __('Random', 'awesome-blocks'),     value: 'rand' },
                            ]}
                            onChange={(value) => setAttributes({ orderBy: value })}
                        />
                    </PanelRow>
                    <PanelRow>
                        <SelectControl
                            label={__('Order', 'awesome-blocks')}
                            value={order}
                            options={[
                                { label: __('Descending', 'awesome-blocks'), value: 'DESC' },
                                { label: __('Ascending', 'awesome-blocks'),  value: 'ASC' },
                            ]}
                            onChange={(value) => setAttributes({ order: value })}
                        />
                    </PanelRow>
                    <PanelRow>
                        <div style={{ width: '100%' }}>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
                                {__('Filter by Categories', 'awesome-blocks')}
                            </label>
                            <SelectControl
                                value=""
                                options={categoryOptions}
                                onChange={handleCategoryChange}
                                help={
                                    selectedCategories.length > 0
                                        ? __('Selected:', 'awesome-blocks') + ' ' + selectedCategoryNames.join(', ')
                                        : __('Select categories to filter products', 'awesome-blocks')
                                }
                            />
                            {selectedCategories.length > 0 && (
                                <div style={{ marginTop: '10px' }}>
                                    {selectedCategories.map(catId => {
                                        const cat = productCategories.find(c => c.id === catId);
                                        return cat ? (
                                            <span
                                                key={catId}
                                                style={{
                                                    display: 'inline-block', padding: '4px 8px',
                                                    margin: '2px', background: '#e0e0e0',
                                                    borderRadius: '4px', fontSize: '12px', cursor: 'pointer',
                                                }}
                                                onClick={() => handleCategoryChange(String(catId))}
                                            >
                                                {cat.name} ×
                                            </span>
                                        ) : null;
                                    })}
                                    <button
                                        style={{ marginLeft: '8px', padding: '4px 8px', cursor: 'pointer' }}
                                        onClick={() => setAttributes({ selectedCategories: [] })}
                                    >
                                        {__('Clear All', 'awesome-blocks')}
                                    </button>
                                </div>
                            )}
                        </div>
                    </PanelRow>
                </PanelBody>

                {/* Display Options */}
                <PanelBody title={__('Display Options', 'awesome-blocks')} initialOpen={false}>
                    <ToggleControl label={__('Show Category', 'awesome-blocks')}     checked={showCategory}   onChange={() => setAttributes({ showCategory:   !showCategory })} />
                    <ToggleControl label={__('Show Rating', 'awesome-blocks')}       checked={showRating}     onChange={() => setAttributes({ showRating:     !showRating })} />
                    <ToggleControl label={__('Show Price', 'awesome-blocks')}        checked={showPrice}      onChange={() => setAttributes({ showPrice:      !showPrice })} />
                    <ToggleControl label={__('Show Add to Cart', 'awesome-blocks')}  checked={showAddToCart}  onChange={() => setAttributes({ showAddToCart:  !showAddToCart })} />
                    <ToggleControl label={__('Show Badges', 'awesome-blocks')}       checked={showBadges}     onChange={() => setAttributes({ showBadges:     !showBadges })} />
                    {showBadges && (
                        <SelectControl
                            label={__('Badge Position', 'awesome-blocks')}
                            value={badgePosition}
                            options={[
                                { label: __('Top Left',     'awesome-blocks'), value: 'top-left' },
                                { label: __('Top Right',    'awesome-blocks'), value: 'top-right' },
                                { label: __('Bottom Left',  'awesome-blocks'), value: 'bottom-left' },
                                { label: __('Bottom Right', 'awesome-blocks'), value: 'bottom-right' },
                            ]}
                            onChange={(value) => setAttributes({ badgePosition: value })}
                        />
                    )}
                </PanelBody>
            </InspectorControls>

            <div {...blockProps}>
                {!hasResolved ? (
                    <div style={{ display: 'flex', justifyContent: 'center', padding: '40px' }}>
                        <Spinner />
                    </div>
                ) : products.length === 0 ? (
                    <div style={{ padding: '40px', textAlign: 'center', background: '#f9f9f9', borderRadius: '8px' }}>
                        <p>{__('No products found. Add some WooCommerce products first.', 'awesome-blocks')}</p>
                    </div>
                ) : (
                    <div className={`ab-products-list ab-columns-${columns}`}>
                        <div className="ab-row">
                            {products.map((product) => {
                                const imageUrl      = getImageUrl(product) || PLACEHOLDER;
                                const categoryHtml  = showCategory ? getCategoryNames(product) : null;
                                const { rating, count, width: ratingWidth } = getRatingInfo(product);
                                const { price, regularPrice, salePrice, onSale } = getPriceInfo(product);
                                const discountPct   = showBadges ? getDiscountPercent(product) : 0;
                                const productLink   = product.permalink || product.link || '#';

                                return (
                                    <div key={product.id} className={`ab-col ab-col-${12 / columns}`}>
                                        <div className="ab-product-card">
                                            <div className="ab-product-image-wrapper">
                                                <a href={productLink} className="ab-product-image" target="_blank" rel="noopener noreferrer">
                                                    <img src={imageUrl} alt={product.name || product.title?.rendered || ''} />
                                                </a>

                                                {/* Discount Badge */}
                                                {showBadges && discountPct > 0 && (
                                                    <div className={`ab-product-badges ab-badge-${badgePosition}`}>
                                                        <span className="ab-discount-badge">-{discountPct}%</span>
                                                    </div>
                                                )}
                                            </div>

                                            <div className="ab-product-details">
                                                {/* Category */}
                                                {categoryHtml && (
                                                    <div className="ab-product-category">
                                                        <span>{categoryHtml}</span>
                                                    </div>
                                                )}

                                                {/* Title */}
                                                <h3 className="ab-product-title">
                                                    <a href={productLink} target="_blank" rel="noopener noreferrer">
                                                        {product.name || product.title?.rendered || __('Untitled Product', 'awesome-blocks')}
                                                    </a>
                                                </h3>

                                                {/* Rating */}
                                                {showRating && rating > 0 && (
                                                    <div className="ab-product-rating">
                                                        <div className="star-rating" title={`Rated ${rating} out of 5`}>
                                                            <span style={{ width: `${ratingWidth}%` }}>
                                                                <strong>{rating}</strong> out of <span>5</span>
                                                            </span>
                                                        </div>
                                                        <div className="ab-review-count">({count})</div>
                                                    </div>
                                                )}

                                                {/* Price */}
                                                {showPrice && price && (
                                                    <div className="ab-product-price">
                                                        {onSale && regularPrice && (
                                                            <del className="ab-regular-price">${regularPrice}</del>
                                                        )}
                                                        <span className={onSale ? 'ab-sale-price' : ''}>
                                                            ${onSale ? salePrice : price}
                                                        </span>
                                                    </div>
                                                )}

                                                {/* Add to Cart */}
                                                {showAddToCart && (
                                                    <div className="ab-add-to-cart">
                                                        <span>{__('Add to cart', 'awesome-blocks')}</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
