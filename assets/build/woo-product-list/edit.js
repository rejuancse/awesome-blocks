/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';
import { InspectorControls } from '@wordpress/block-editor';
import {
    PanelBody,
    PanelRow,
    RangeControl,
    SelectControl,
    ToggleControl,
    TextControl,
    Spinner,
} from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { store as coreStore } from '@wordpress/core-data';

/**
 * Edit Component
 */
export default function Edit({ attributes, setAttributes }) {
    const {
        columns = 3,
        productsPerPage = 6,
        orderBy = 'date',
        order = 'DESC',
        categories = [],
        excludeProducts = [],
        showCategory = true,
        showRating = true,
        showPrice = true,
        showAddToCart = true,
        showBadges = true,
        badgePosition = 'top-left',
    } = attributes;

    const blockProps = useBlockProps();

    // Fetch products from WordPress
    const { products, hasResolved } = useSelect((select) => {
        const query = {
            per_page: productsPerPage,
            orderby: orderBy,
            order: order.toLowerCase(),
            exclude: excludeProducts,
            _fields: [
                'id',
                'name',
                'slug',
                'link',
                'images',
                'categories',
                'average_rating',
                'rating_count',
                'price',
                'regular_price',
                'sale_price',
                'on_sale',
            ].join(','),
        };

        // Handle WooCommerce-specific ordering
        let woocommerceOrderBy = orderBy;
        if (orderBy === 'price' || orderBy === 'popularity' || orderBy === 'rating') {
            woocommerceOrderBy = orderBy;
        }

        const queryParams = {
            ...query,
            orderby: woocommerceOrderBy,
        };

        return {
            products: select(coreStore).getEntityRecords('postType', 'product', queryParams) || [],
            hasResolved: select(coreStore).hasFinishedResolution('getEntityRecords', ['postType', 'product', queryParams]),
        };
    }, [columns, productsPerPage, orderBy, order, excludeProducts]);

    return (
        <>
            <InspectorControls>
                <PanelBody title={__('Layout Settings', 'awesome-blocks')} initialOpen={true}>
                    <RangeControl
                        label={__('Columns', 'awesome-blocks')}
                        value={columns}
                        onChange={(value) => setAttributes({ columns: value })}
                        min={1}
                        max={6}
                        step={1}
                    />
                    <RangeControl
                        label={__('Products per Page', 'awesome-blocks')}
                        value={productsPerPage}
                        onChange={(value) => setAttributes({ productsPerPage: value })}
                        min={1}
                        max={50}
                        step={1}
                    />
                </PanelBody>

                <PanelBody title={__('Product Query', 'awesome-blocks')} initialOpen={false}>
                    <PanelRow>
                        <SelectControl
                            label={__('Order By', 'awesome-blocks')}
                            value={orderBy}
                            options={[
                                { label: __('Date', 'awesome-blocks'), value: 'date' },
                                { label: __('Price', 'awesome-blocks'), value: 'price' },
                                { label: ('Popularity', 'awesome-blocks'), value: 'popularity' },
                                { label: ('Rating', 'awesome-blocks'), value: 'rating' },
                                { label: ('Title', 'awesome-blocks'), value: 'title' },
                                { label: ('Random', 'awesome-blocks'), value: 'rand' },
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
                                { label: __('Ascending', 'awesome-blocks'), value: 'ASC' },
                            ]}
                            onChange={(value) => setAttributes({ order: value })}
                        />
                    </PanelRow>
                    <PanelRow>
                        <TextControl
                            label={__('Product IDs to Exclude (comma separated)', 'awesome-blocks')}
                            value={excludeProducts.join(',')}
                            onChange={(value) =>
                                setAttributes({
                                    excludeProducts: value.split(',').map(id => parseInt(id.trim())).filter(id => !isNaN(id))
                                })
                            }
                            help={__('Enter product IDs separated by commas', 'awesome-blocks')}
                        />
                    </PanelRow>
                </PanelBody>

                <PanelBody title={__('Display Options', 'awesome-blocks')} initialOpen={false}>
                    <ToggleControl
                        label={__('Show Category', 'awesome-blocks')}
                        checked={showCategory}
                        onChange={() => setAttributes({ showCategory: !showCategory })}
                    />
                    <ToggleControl
                        label={__('Show Rating', 'awesome-blocks')}
                        checked={showRating}
                        onChange={() => setAttributes({ showRating: !showRating })}
                    />
                    <ToggleControl
                        label={__('Show Price', 'awesome-blocks')}
                        checked={showPrice}
                        onChange={() => setAttributes({ showPrice: !showPrice })}
                    />
                    <ToggleControl
                        label={__('Show Add to Cart', 'awesome-blocks')}
                        checked={showAddToCart}
                        onChange={() => setAttributes({ showAddToCart: !showAddToCart })}
                    />
                    <ToggleControl
                        label={__('Show Badges', 'awesome-blocks')}
                        checked={showBadges}
                        onChange={() => setAttributes({ showBadges: !showBadges })}
                    />
                    {showBadges && (
                        <SelectControl
                            label={__('Badge Position', 'awesome-blocks')}
                            value={badgePosition}
                            options={[
                                { label: __('Top Left', 'awesome-blocks'), value: 'top-left' },
                                { label: __('Top Right', 'awesome-blocks'), value: 'top-right' },
                                { label: __('Bottom Left', 'awesome-blocks'), value: 'bottom-left' },
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
                    <div className={`wpl-products-list wpl-columns-${columns}`}>
                        <div className="wpl-row">
                            {products.map((product) => {
                                const imageUrl = product.images && product.images.length > 0
                                    ? product.images[0].src
                                    : 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="300" height="300" viewBox="0 0 300 300"%3E%3Crect width="300" height="300" fill="%23f0f0f0"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="14" fill="%23999"%3ENo Image%3C/text%3E%3C/svg%3E';

                                const categoryHtml = showCategory && product.categories && product.categories.length > 0
                                    ? product.categories.slice(0, 2).map(cat => cat.name).join(', ')
                                    : null;

                                const rating = product.average_rating || 0;
                                const ratingCount = product.rating_count || 0;
                                const ratingWidth = (rating / 5) * 100;

                                // Price display
                                let priceHtml = null;
                                if (showPrice && product.price) {
                                    if (product.on_sale && product.regular_price) {
                                        priceHtml = (
                                            <div className="wpl-product-price">
                                                <del>{product.regular_price}</del>{' '}
                                                <ins>{product.price}</ins>
                                            </div>
                                        );
                                    } else {
                                        priceHtml = (
                                            <div className="wpl-product-price">
                                                {product.price}
                                            </div>
                                        );
                                    }
                                }

                                // Badges
                                let badgesHtml = null;
                                if (showBadges && product.on_sale) {
                                    const discountPercent = product.regular_price && product.price
                                        ? Math.round(((parseFloat(product.regular_price) - parseFloat(product.price)) / parseFloat(product.regular_price)) * 100)
                                        : 0;

                                    if (discountPercent > 0) {
                                        badgesHtml = (
                                            <div className={`wpl-product-badges wpl-badge-${badgePosition}`}>
                                                <span className="wpl-discount-badge">-{discountPercent}%</span>
                                            </div>
                                        );
                                    }
                                }

                                return (
                                    <div key={product.id} className={`wpl-col wpl-col-${12 / columns}`}>
                                        <div className="wpl-product-card">
                                            <div className="wpl-product-image-wrapper">
                                                <a href={product.link} className="wpl-product-image" target="_blank" rel="noopener noreferrer">
                                                    <img src={imageUrl} alt={product.name} />
                                                </a>
                                                {badgesHtml}
                                            </div>
                                            <div className="wpl-product-details">
                                                {categoryHtml && (
                                                    <div className="wpl-product-category">
                                                        <span>{categoryHtml}</span>
                                                    </div>
                                                )}
                                                <h3 className="wpl-product-title">
                                                    <a href={product.link} target="_blank" rel="noopener noreferrer">
                                                        {product.name}
                                                    </a>
                                                </h3>
                                                {showRating && rating > 0 && (
                                                    <div className="wpl-product-rating">
                                                        <div className="star-rating" title={`Rated ${rating} out of 5`}>
                                                            <span style={{ width: `${ratingWidth}%` }}>
                                                                <strong>{rating}</strong> out of <span>5</span>
                                                            </span>
                                                        </div>
                                                        <div className="wpl-review-count">({ratingCount})</div>
                                                    </div>
                                                )}
                                                {priceHtml}
                                                {showAddToCart && (
                                                    <div className="wpl-add-to-cart">
                                                        <span>Add to cart</span>
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
