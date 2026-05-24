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

export default function Edit({ attributes, setAttributes }) {
    const {
        columns = 6,
        categoriesPerPage = 6,
        orderBy = 'name',
        order = 'DESC',
        hideEmpty = true,
        showImage = true,
        showCount = true,
        imageSize = 'medium',
        excludeCategories = [],
    } = attributes;

    const blockProps = useBlockProps();

    // State for categories
    const [categories, setCategories] = useState([]);
    const [hasResolved, setHasResolved] = useState(false);

    // Fetch product categories via apiFetch
    useEffect(() => {
        setHasResolved(false);

        const args = new URLSearchParams({
            per_page: categoriesPerPage,
            orderby: orderBy,
            order: order.toLowerCase(),
            hide_empty: hideEmpty ? 'true' : 'false',
            _embed: '1',
        });

        // Exclude specific categories
        if (excludeCategories.length > 0) {
            args.append('exclude', excludeCategories.join(','));
        }

        apiFetch({ path: `/wc/v3/products/categories?${args.toString()}` })
            .then((data) => {
                setCategories(data);
                setHasResolved(true);
            })
            .catch(() => {
                // Fallback: try WordPress core REST API
                apiFetch({ path: `/wp/v2/product_cat?${args.toString()}` })
                    .then((data) => {
                        setCategories(data);
                        setHasResolved(true);
                    })
                    .catch(() => setHasResolved(true));
            });
    }, [categoriesPerPage, orderBy, order, hideEmpty, excludeCategories]);

    // Get image URL from category
    const getImageUrl = (category) => {
        // WooCommerce v3 REST API returns image object
        if (category.image && category.image.src) {
            return category.image.src;
        }
        // WordPress core REST API with _embed
        if (
            category._embedded &&
            category._embedded['wp:featuredmedia'] &&
            category._embedded['wp:featuredmedia'][0] &&
            !category._embedded['wp:featuredmedia'][0].code
        ) {
            return (
                category._embedded['wp:featuredmedia'][0].media_details?.sizes?.medium?.source_url ||
                category._embedded['wp:featuredmedia'][0].source_url
            );
        }
        return null;
    };

    // Get category link
    const getCategoryLink = (category) => {
        return category.link || category.permalink || '#';
    };

    // Placeholder SVG (no image)
    const PLACEHOLDER = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300' viewBox='0 0 300 300'%3E%3Crect width='300' height='300' fill='%23f0f0f0'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='14' fill='%23999'%3ENo Image%3C/text%3E%3C/svg%3E`;

    // Fetch all categories for exclusion selector
    const allCategories = useSelect((select) => {
        return select('core').getEntityRecords('taxonomy', 'product_cat', {
            per_page: -1,
            hide_empty: false,
        }) || [];
    }, []);

    const categoryOptions = allCategories.map(cat => ({
        label: cat.name,
        value: String(cat.id),
    }));

    const handleExcludeToggle = (categoryId) => {
        const newExclusions = excludeCategories.includes(categoryId)
            ? excludeCategories.filter(id => id !== categoryId)
            : [...excludeCategories, categoryId];
        setAttributes({ excludeCategories: newExclusions });
    };

    // Render
    return (
        <>
            <InspectorControls>
                <PanelBody title={__('Layout Settings', 'theme-blocks' )} initialOpen={true}>
                    <RangeControl
                        label={__('Columns', 'theme-blocks' )}
                        value={columns}
                        onChange={(value) => setAttributes({ columns: value })}
                        min={1} max={6} step={1}
                    />
                    <RangeControl
                        label={__('Categories per Page', 'theme-blocks' )}
                        value={categoriesPerPage}
                        onChange={(value) => setAttributes({ categoriesPerPage: value })}
                        min={1} max={50} step={1}
                    />
                </PanelBody>

                <PanelBody title={__('Category Query', 'theme-blocks' )} initialOpen={false}>
                    <PanelRow>
                        <SelectControl
                            label={__('Order By', 'theme-blocks' )}
                            value={orderBy}
                            options={[
                                { label: __('Name', 'theme-blocks' ), value: 'name' },
                                { label: __('Slug', 'theme-blocks' ), value: 'slug' },
                                { label: __('Category ID', 'theme-blocks' ), value: 'id' },
                                { label: __('Count', 'theme-blocks' ), value: 'count' },
                            ]}
                            onChange={(value) => setAttributes({ orderBy: value })}
                        />
                    </PanelRow>
                    <PanelRow>
                        <SelectControl
                            label={__('Order', 'theme-blocks' )}
                            value={order}
                            options={[
                                { label: __('Ascending', 'theme-blocks' ), value: 'ASC' },
                                { label: __('Descending', 'theme-blocks' ), value: 'DESC' },
                            ]}
                            onChange={(value) => setAttributes({ order: value })}
                        />
                    </PanelRow>
                    <ToggleControl
                        label={__('Hide Empty Categories', 'theme-blocks' )}
                        checked={hideEmpty}
                        onChange={() => setAttributes({ hideEmpty: !hideEmpty })}
                    />
                </PanelBody>

                <PanelBody title={__('Display Options', 'theme-blocks' )} initialOpen={false}>
                    <ToggleControl
                        label={__('Show Category Image', 'theme-blocks' )}
                        checked={showImage}
                        onChange={() => setAttributes({ showImage: !showImage })}
                    />
                    {showImage && (
                        <SelectControl
                            label={__('Image Size', 'theme-blocks' )}
                            value={imageSize}
                            options={[
                                { label: __('Thumbnail', 'theme-blocks' ), value: 'thumbnail' },
                                { label: __('Medium', 'theme-blocks' ), value: 'medium' },
                                { label: __('Large', 'theme-blocks' ), value: 'large' },
                                { label: __('Full', 'theme-blocks' ), value: 'full' },
                            ]}
                            onChange={(value) => setAttributes({ imageSize: value })}
                        />
                    )}
                    <ToggleControl
                        label={__('Show Product Count', 'theme-blocks' )}
                        checked={showCount}
                        onChange={() => setAttributes({ showCount: !showCount })}
                    />
                </PanelBody>

                <PanelBody title={__('Exclude Categories', 'theme-blocks' )} initialOpen={false}>
                    {allCategories.length === 0 ? (
                        <p>{__('Loading categories...', 'theme-blocks' )}</p>
                    ) : (
                        <>
                            {allCategories.map(cat => (
                                <div
                                    key={cat.id}
                                    style={{
                                        padding: '8px',
                                        margin: '4px 0',
                                        background: excludeCategories.includes(cat.id) ? '#e0f0ff' : '#f9f9f9',
                                        borderRadius: '4px',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center'
                                    }}
                                    onClick={() => handleExcludeToggle(cat.id)}
                                >
                                    <span>{cat.name}</span>
                                    <span style={{ fontSize: '12px', color: '#666' }}>
                                        {excludeCategories.includes(cat.id) ? __('Excluded', 'theme-blocks' ) : __('Included', 'theme-blocks' )}
                                    </span>
                                </div>
                            ))}
                            {excludeCategories.length > 0 && (
                                <button
                                    style={{ marginTop: '10px', padding: '8px 12px', cursor: 'pointer' }}
                                    onClick={() => setAttributes({ excludeCategories: [] })}
                                >
                                    {__('Clear All Exclusions', 'theme-blocks' )}
                                </button>
                            )}
                        </>
                    )}
                </PanelBody>
            </InspectorControls>

            <div {...blockProps}>
                {!hasResolved ? (
                    <div style={{ display: 'flex', justifyContent: 'center', padding: '40px' }}>
                        <Spinner />
                    </div>
                ) : categories.length === 0 ? (
                    <div style={{ padding: '40px', textAlign: 'center', background: '#f9f9f9', borderRadius: '8px' }}>
                        <p>{__('No categories found. Add some WooCommerce product categories first.', 'theme-blocks' )}</p>
                    </div>
                ) : (
                    <div className="theme-blocks-product-category">
                        <div className="theme-blocks-row cats">
                            {categories.map((category) => {
                                const imageUrl = showImage ? (getImageUrl(category) || PLACEHOLDER) : null;
                                const categoryLink = getCategoryLink(category);
                                const productCount = category.count || 0;

                                return (
                                    <div key={category.id} className={`theme-blocks-col-${12 / columns}`}>
                                        <div className="item">
                                            <a href={categoryLink}>
                                                <div className="iconbox">
                                                    {imageUrl && (
                                                        <div className="icon">
                                                            <img
                                                                className='category-thumbnail'
                                                                src={imageUrl}
                                                                alt={category.name || __('Category Image', 'theme-blocks' )}
                                                            />
                                                        </div>
                                                    )}

                                                    <div className="details">
                                                        <h5 className="title">{category.name || __('Untitled Category', 'theme-blocks' )}</h5>
                                                        {showCount && productCount > 0 && (
                                                            <p>
                                                                {productCount}
                                                                {productCount === 1
                                                                    ? __(' product', 'theme-blocks' )
                                                                    : __(' products', 'theme-blocks' )}
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>
                                            </a>
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
