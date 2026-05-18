/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { useSelect } from '@wordpress/data';
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { useEffect } from '@wordpress/element';
import {
    PanelBody,
    RangeControl,
    SelectControl,
    ToggleControl,
    Spinner,
    BaseControl,
    TextControl,
} from '@wordpress/components';

/**
 * Edit Component
 */
export default function Edit({ attributes, setAttributes }) {
    const {
        postsToShow = 3,
        order = 'desc',
        orderBy = 'date',
        columns = 3,
        displayTitle = true,
        displayExcerpt = true,
        displayDate = true,
        displayAuthor = false,
        displayThumbnail = true,
        thumbnailSize = 'medium',
        categories = [],
        titleColor = '#333333',
        titleFontSize = 22,
        titleFontWeight = '600',
        titleFontFamily = '',
        excerptColor = '#555555',
        excerptFontSize = 15,
        metaColor = '#666666',
        metaFontSize = 14,
        linkColor = '#0073aa',
        linkHoverColor = '#005177',
        cardBgColor = '#ffffff',
        cardBorder = 'none',
        cardBorderRadius = 8,
        cardPadding = 20,
        thumbnailBorderRadius = 0,
        thumbnailHeight = 0,
        gap = 30,
    } = attributes;

    const blockProps = useBlockProps();

    // Prepare safe attributes
    const safeAttributes = {
        postsToShow: parseInt(postsToShow) || 3,
        order: order || 'desc',
        orderBy: orderBy || 'date',
        columns: parseInt(columns) || 3,
        displayTitle: !!displayTitle,
        displayExcerpt: !!displayExcerpt,
        displayDate: !!displayDate,
        displayAuthor: !!displayAuthor,
        displayThumbnail: !!displayThumbnail,
        thumbnailSize: thumbnailSize || 'medium',
        categories: Array.isArray(categories) ? categories : [],
        titleColor: titleColor || '#333333',
        titleFontSize: parseInt(titleFontSize) || 22,
        titleFontWeight: titleFontWeight || '600',
        titleFontFamily: titleFontFamily || '',
        excerptColor: excerptColor || '#555555',
        excerptFontSize: parseInt(excerptFontSize) || 15,
        metaColor: metaColor || '#666666',
        metaFontSize: parseInt(metaFontSize) || 14,
        linkColor: linkColor || '#0073aa',
        linkHoverColor: linkHoverColor || '#005177',
        cardBgColor: cardBgColor || '#ffffff',
        cardBorder: cardBorder || 'none',
        cardBorderRadius: parseInt(cardBorderRadius) || 8,
        cardPadding: parseInt(cardPadding) || 20,
        thumbnailBorderRadius: parseInt(thumbnailBorderRadius) || 0,
        thumbnailHeight: parseInt(thumbnailHeight) || 0,
        gap: parseInt(gap) || 30,
    };

    // Fetch posts
    const posts = useSelect(
        (select) => {
            const { getEntityRecords } = select('core');
            const latestPostsQuery = {
                per_page: safeAttributes.postsToShow,
                order: safeAttributes.order,
                orderby: safeAttributes.orderBy,
                _embed: true,
            };

            if (safeAttributes.categories.length > 0) {
                latestPostsQuery.categories = safeAttributes.categories;
            }

            return getEntityRecords('postType', 'post', latestPostsQuery);
        },
        [safeAttributes.postsToShow, safeAttributes.order, safeAttributes.orderBy, safeAttributes.categories]
    );

    // Fetch categories
    const allCategories = useSelect((select) => {
        return select('core').getEntityRecords('taxonomy', 'category', {
            per_page: -1,
        });
    }, []);

    // Google Fonts list
    const googleFonts = [
        { label: __('Default', 'awesome-blocks'), value: '' },
        { label: 'Roboto', value: "'Roboto', sans-serif" },
        { label: 'Open Sans', value: "'Open Sans', sans-serif" },
        { label: 'Lato', value: "'Lato', sans-serif" },
        { label: 'Montserrat', value: "'Montserrat', sans-serif" },
        { label: 'Oswald', value: "'Oswald', sans-serif" },
        { label: 'Raleway', value: "'Raleway', sans-serif" },
        { label: 'Poppins', value: "'Poppins', sans-serif" },
        { label: 'Roboto Slab', value: "'Roboto Slab', serif" },
        { label: 'Merriweather', value: "'Merriweather', serif" },
        { label: 'Playfair Display', value: "'Playfair Display', serif" },
        { label: 'Lora', value: "'Lora', serif" },
        { label: 'Source Sans Pro', value: "'Source Sans Pro', sans-serif" },
        { label: 'Nunito', value: "'Nunito', sans-serif" },
        { label: 'Ubuntu', value: "'Ubuntu', sans-serif" },
        { label: 'PT Sans', value: "'PT Sans', sans-serif" },
        { label: 'Work Sans', value: "'Work Sans', sans-serif" },
        { label: 'Rubik', value: "'Rubik', sans-serif" },
        { label: 'Noto Sans', value: "'Noto Sans', sans-serif" },
    ];

    // Load Google Fonts dynamically
    useEffect(() => {
        if (safeAttributes.titleFontFamily && safeAttributes.titleFontFamily !== '') {
            // Extract font name from font-family string
            const fontName = safeAttributes.titleFontFamily.split(',')[0].replace(/'/g, '');

            // Check if font is already loaded
            const linkId = `google-font-${fontName.replace(/\s+/g, '-').toLowerCase()}`;
            if (!document.getElementById(linkId)) {
                const link = document.createElement('link');
                link.id = linkId;
                link.href = `https://fonts.googleapis.com/css2?family=${fontName.replace(/\s+/g, '+')}&display=swap`;
                link.rel = 'stylesheet';
                document.head.appendChild(link);
            }
        }
    }, [safeAttributes.titleFontFamily]);

    // Prepare category options for dropdown
    const categoryOptions = [
        { label: __('All Categories', 'awesome-blocks'), value: '' },
        ...(allCategories || []).map(cat => ({
            label: cat.name,
            value: cat.id,
        }))
    ];

    return (
        <>
            <InspectorControls>
                <PanelBody title={__('Settings', 'awesome-blocks')}>
                    <SelectControl
                        label={__('Posts to Show', 'awesome-blocks')}
                        value={safeAttributes.postsToShow}
                        options={[
                            { label: '1', value: 1 },
                            { label: '2', value: 2 },
                            { label: '3', value: 3 },
                            { label: '4', value: 4 },
                            { label: '5', value: 5 },
                            { label: '6', value: 6 },
                            { label: '7', value: 7 },
                            { label: '8', value: 8 },
                            { label: '9', value: 9 },
                            { label: '10', value: 10 },
                        ]}
                        onChange={(value) => setAttributes({ postsToShow: value })}
                    />

                    <SelectControl
                        label={__('Category', 'awesome-blocks')}
                        value={safeAttributes.categories[0] || ''}
                        options={categoryOptions}
                        onChange={(value) => {
                            setAttributes({
                                categories: value ? [parseInt(value)] : []
                            });
                        }}
                        help={__('Select a category to filter posts', 'awesome-blocks')}
                    />

                    <SelectControl
                        label={__('Order By', 'awesome-blocks')}
                        value={safeAttributes.orderBy}
                        options={[
                            { label: __('Date', 'awesome-blocks'), value: 'date' },
                            { label: __('Title', 'awesome-blocks'), value: 'title' },
                            { label: __('Modified', 'awesome-blocks'), value: 'modified' },
                            { label: __('Author', 'awesome-blocks'), value: 'author' },
                            { label: __('Random', 'awesome-blocks'), value: 'rand' },
                        ]}
                        onChange={(value) => setAttributes({ orderBy: value })}
                    />

                    <SelectControl
                        label={__('Order', 'awesome-blocks')}
                        value={safeAttributes.order}
                        options={[
                            { label: __('Descending', 'awesome-blocks'), value: 'desc' },
                            { label: __('Ascending', 'awesome-blocks'), value: 'asc' },
                        ]}
                        onChange={(value) => setAttributes({ order: value })}
                    />

                    <RangeControl
                        label={__('Columns', 'awesome-blocks')}
                        value={safeAttributes.columns}
                        onChange={(value) => setAttributes({ columns: value })}
                        min={1}
                        max={6}
                    />

                    <SelectControl
                        label={__('Thumbnail Size', 'awesome-blocks')}
                        value={safeAttributes.thumbnailSize}
                        options={[
                            { label: __('Thumbnail', 'awesome-blocks'), value: 'thumbnail' },
                            { label: __('Medium', 'awesome-blocks'), value: 'medium' },
                            { label: __('Medium Large', 'awesome-blocks'), value: 'medium_large' },
                            { label: __('Large', 'awesome-blocks'), value: 'large' },
                            { label: __('Full', 'awesome-blocks'), value: 'full' },
                        ]}
                        onChange={(value) =>
                            setAttributes({ thumbnailSize: value })
                        }
                    />
                </PanelBody>

                <PanelBody
                    title={__('Display Options', 'awesome-blocks')}
                    initialOpen={false}
                >
                    <ToggleControl
                        label={__('Display Title', 'awesome-blocks')}
                        checked={safeAttributes.displayTitle}
                        onChange={() =>
                            setAttributes({ displayTitle: !safeAttributes.displayTitle })
                        }
                    />

                    <ToggleControl
                        label={__('Display Excerpt', 'awesome-blocks')}
                        checked={safeAttributes.displayExcerpt}
                        onChange={() =>
                            setAttributes({ displayExcerpt: !safeAttributes.displayExcerpt })
                        }
                    />

                    <ToggleControl
                        label={__('Display Date', 'awesome-blocks')}
                        checked={safeAttributes.displayDate}
                        onChange={() =>
                            setAttributes({ displayDate: !safeAttributes.displayDate })
                        }
                    />

                    <ToggleControl
                        label={__('Display Author', 'awesome-blocks')}
                        checked={safeAttributes.displayAuthor}
                        onChange={() =>
                            setAttributes({ displayAuthor: !safeAttributes.displayAuthor })
                        }
                    />

                    <ToggleControl
                        label={__('Display Thumbnail', 'awesome-blocks')}
                        checked={safeAttributes.displayThumbnail}
                        onChange={() =>
                            setAttributes({ displayThumbnail: !safeAttributes.displayThumbnail })
                        }
                    />
                </PanelBody>

                <PanelBody
                    title={__('Style Settings', 'awesome-blocks')}
                    initialOpen={false}
                >
                    <h3>{__('Title Style', 'awesome-blocks')}</h3>
                    <BaseControl
                        label={__('Title Color', 'awesome-blocks')}
                    >
                        <div className="ab-color-input-wrapper">
                            <input
                                type="color"
                                value={safeAttributes.titleColor}
                                onChange={(e) => setAttributes({ titleColor: e.target.value })}
                                className="ab-color-input"
                            />
                            <input
                                type="text"
                                value={safeAttributes.titleColor}
                                onChange={(e) => setAttributes({ titleColor: e.target.value })}
                                className="ab-color-text-input"
                                placeholder="#333333"
                            />
                        </div>
                    </BaseControl>
                    <RangeControl
                        label={__('Title Font Size', 'awesome-blocks')}
                        value={safeAttributes.titleFontSize}
                        onChange={(value) => setAttributes({ titleFontSize: value })}
                        min={12}
                        max={60}
                    />
                    <SelectControl
                        label={__('Title Font Weight', 'awesome-blocks')}
                        value={safeAttributes.titleFontWeight}
                        options={[
                            { label: __('Normal', 'awesome-blocks'), value: '400' },
                            { label: __('Medium', 'awesome-blocks'), value: '500' },
                            { label: __('Semi Bold', 'awesome-blocks'), value: '600' },
                            { label: __('Bold', 'awesome-blocks'), value: '700' },
                        ]}
                        onChange={(value) => setAttributes({ titleFontWeight: value })}
                    />
                    <SelectControl
                        label={__('Title Font Family', 'awesome-blocks')}
                        value={safeAttributes.titleFontFamily}
                        options={googleFonts}
                        onChange={(value) => setAttributes({ titleFontFamily: value })}
                        help={__('Select a Google Font for the title', 'awesome-blocks')}
                    />

                    <h3>{__('Excerpt Style', 'awesome-blocks')}</h3>
                    <BaseControl
                        label={__('Excerpt Color', 'awesome-blocks')}
                    >
                        <div className="ab-color-input-wrapper">
                            <input
                                type="color"
                                value={safeAttributes.excerptColor}
                                onChange={(e) => setAttributes({ excerptColor: e.target.value })}
                                className="ab-color-input"
                            />
                            <input
                                type="text"
                                value={safeAttributes.excerptColor}
                                onChange={(e) => setAttributes({ excerptColor: e.target.value })}
                                className="ab-color-text-input"
                                placeholder="#555555"
                            />
                        </div>
                    </BaseControl>
                    <RangeControl
                        label={__('Excerpt Font Size', 'awesome-blocks')}
                        value={safeAttributes.excerptFontSize}
                        onChange={(value) => setAttributes({ excerptFontSize: value })}
                        min={12}
                        max={30}
                    />

                    <h3>{__('Meta Style', 'awesome-blocks')}</h3>
                    <BaseControl
                        label={__('Meta Color', 'awesome-blocks')}
                    >
                        <div className="ab-color-input-wrapper">
                            <input
                                type="color"
                                value={safeAttributes.metaColor}
                                onChange={(e) => setAttributes({ metaColor: e.target.value })}
                                className="ab-color-input"
                            />
                            <input
                                type="text"
                                value={safeAttributes.metaColor}
                                onChange={(e) => setAttributes({ metaColor: e.target.value })}
                                className="ab-color-text-input"
                                placeholder="#666666"
                            />
                        </div>
                    </BaseControl>
                    <RangeControl
                        label={__('Meta Font Size', 'awesome-blocks')}
                        value={safeAttributes.metaFontSize}
                        onChange={(value) => setAttributes({ metaFontSize: value })}
                        min={10}
                        max={24}
                    />

                    <h3>{__('Link Style', 'awesome-blocks')}</h3>
                    <BaseControl
                        label={__('Link Color', 'awesome-blocks')}
                    >
                        <div className="ab-color-input-wrapper">
                            <input
                                type="color"
                                value={safeAttributes.linkColor}
                                onChange={(e) => setAttributes({ linkColor: e.target.value })}
                                className="ab-color-input"
                            />
                            <input
                                type="text"
                                value={safeAttributes.linkColor}
                                onChange={(e) => setAttributes({ linkColor: e.target.value })}
                                className="ab-color-text-input"
                                placeholder="#0073aa"
                            />
                        </div>
                    </BaseControl>
                    <BaseControl
                        label={__('Link Hover Color', 'awesome-blocks')}
                    >
                        <div className="ab-color-input-wrapper">
                            <input
                                type="color"
                                value={safeAttributes.linkHoverColor}
                                onChange={(e) => setAttributes({ linkHoverColor: e.target.value })}
                                className="ab-color-input"
                            />
                            <input
                                type="text"
                                value={safeAttributes.linkHoverColor}
                                onChange={(e) => setAttributes({ linkHoverColor: e.target.value })}
                                className="ab-color-text-input"
                                placeholder="#005177"
                            />
                        </div>
                    </BaseControl>

                    <h3>{__('Card Style', 'awesome-blocks')}</h3>
                    <BaseControl
                        label={__('Card Background Color', 'awesome-blocks')}
                    >
                        <div className="ab-color-input-wrapper">
                            <input
                                type="color"
                                value={safeAttributes.cardBgColor}
                                onChange={(e) => setAttributes({ cardBgColor: e.target.value })}
                                className="ab-color-input"
                            />
                            <input
                                type="text"
                                value={safeAttributes.cardBgColor}
                                onChange={(e) => setAttributes({ cardBgColor: e.target.value })}
                                className="ab-color-text-input"
                                placeholder="#ffffff"
                            />
                        </div>
                    </BaseControl>
                    <TextControl
                        label={__('Card Border', 'awesome-blocks')}
                        value={safeAttributes.cardBorder}
                        onChange={(value) => setAttributes({ cardBorder: value })}
                        placeholder={__('e.g., 1px solid #ddd', 'awesome-blocks')}
                        help={__('CSS border property (e.g., 1px solid #ddd)', 'awesome-blocks')}
                    />
                    <RangeControl
                        label={__('Card Border Radius', 'awesome-blocks')}
                        value={safeAttributes.cardBorderRadius}
                        onChange={(value) => setAttributes({ cardBorderRadius: value })}
                        min={0}
                        max={50}
                    />
                    <RangeControl
                        label={__('Card Padding', 'awesome-blocks')}
                        value={safeAttributes.cardPadding}
                        onChange={(value) => setAttributes({ cardPadding: value })}
                        min={0}
                        max={60}
                    />

                    <h3>{__('Thumbnail Style', 'awesome-blocks')}</h3>
                    <RangeControl
                        label={__('Thumbnail Border Radius', 'awesome-blocks')}
                        value={safeAttributes.thumbnailBorderRadius}
                        onChange={(value) => setAttributes({ thumbnailBorderRadius: value })}
                        min={0}
                        max={50}
                    />
                    <RangeControl
                        label={__('Thumbnail Height (px)', 'awesome-blocks')}
                        value={safeAttributes.thumbnailHeight}
                        onChange={(value) => setAttributes({ thumbnailHeight: value })}
                        min={0}
                        max={600}
                        help={__('Set 0 for auto height', 'awesome-blocks')}
                    />

                    <h3>{__('Layout', 'awesome-blocks')}</h3>
                    <RangeControl
                        label={__('Gap Between Cards', 'awesome-blocks')}
                        value={safeAttributes.gap}
                        onChange={(value) => setAttributes({ gap: value })}
                        min={0}
                        max={100}
                    />
                </PanelBody>
            </InspectorControls>

            <div {...blockProps}>
                {!posts ? (
                    <div style={{ padding: '40px', textAlign: 'center' }}>
                        <Spinner />
                        <p>{__('Loading posts...', 'awesome-blocks')}</p>
                    </div>
                ) : posts.length === 0 ? (
                    <div style={{ padding: '40px', textAlign: 'center' }}>
                        <p>{__('No posts found.', 'awesome-blocks')}</p>
                    </div>
                ) : (
                    <ul
                        className={`ab-posts-grid columns-${safeAttributes.columns}`}
                        style={{
                            gap: `${safeAttributes.gap}px`,
                        }}
                    >
                        {posts.map((post) => {
                            const featuredImage =
                                post._embedded &&
                                post._embedded['wp:featuredmedia'] &&
                                post._embedded['wp:featuredmedia'][0];

                            return (
                                <li
                                    key={post.id}
                                    className="ab-post-item"
                                    style={{
                                        backgroundColor: safeAttributes.cardBgColor,
                                        border: safeAttributes.cardBorder,
                                        borderRadius: `${safeAttributes.cardBorderRadius}px`,
                                    }}
                                >
                                    {safeAttributes.displayThumbnail && featuredImage && (
                                        <div className="ab-post-thumbnail">
                                            <a href={post.link}>
                                                <img
                                                    src={
                                                        featuredImage.media_details.sizes[
                                                            safeAttributes.thumbnailSize
                                                        ]?.source_url ||
                                                        featuredImage.source_url
                                                    }
                                                    alt={featuredImage.alt_text || post.title.rendered}
                                                    style={{
                                                        borderRadius: `${safeAttributes.thumbnailBorderRadius}px`,
                                                        height: safeAttributes.thumbnailHeight > 0 ? `${safeAttributes.thumbnailHeight}px` : 'auto',
                                                    }}
                                                />
                                            </a>
                                        </div>
                                    )}
                                    <div
                                        className="ab-post-content"
                                        style={{
                                            padding: `${safeAttributes.cardPadding}px`,
                                        }}
                                    >
                                        {(safeAttributes.displayDate || safeAttributes.displayAuthor) && (
                                            <div
                                                className="ab-post-meta"
                                                style={{
                                                    color: safeAttributes.metaColor,
                                                    fontSize: `${safeAttributes.metaFontSize}px`,
                                                }}
                                            >
                                                {safeAttributes.displayDate && (
                                                    <span className="ab-post-date">
                                                        {new Date(post.date).toLocaleDateString()}
                                                    </span>
                                                )}
                                            </div>
                                        )}
                                        {safeAttributes.displayTitle && (
                                            <h3
                                                className="ab-post-title"
                                                style={{
                                                    color: safeAttributes.titleColor,
                                                    fontSize: `${safeAttributes.titleFontSize}px`,
                                                    fontWeight: safeAttributes.titleFontWeight,
                                                    fontFamily: safeAttributes.titleFontFamily || 'inherit',
                                                }}
                                            >
                                                <a
                                                    href={post.link}
                                                    dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                                                    style={{
                                                        color: safeAttributes.titleColor,
                                                    }}
                                                />
                                            </h3>
                                        )}
                                        {safeAttributes.displayExcerpt && (
                                            <div
                                                className="ab-post-excerpt"
                                                dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
                                                style={{
                                                    color: safeAttributes.excerptColor,
                                                    fontSize: `${safeAttributes.excerptFontSize}px`,
                                                }}
                                            />
                                        )}
                                        <a
                                            href={post.link}
                                            className="ab-post-read-more"
                                            style={{
                                                color: safeAttributes.linkColor,
                                            }}
                                        >
                                            {__('Read More →', 'awesome-blocks')}
                                        </a>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                )}
            </div>
        </>
    );
}
