/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { useSelect } from '@wordpress/data';
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import {
    PanelBody,
    RangeControl,
    SelectControl,
    ToggleControl,
    Spinner,
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
                    <ul className={`ab-posts-grid columns-${safeAttributes.columns}`}>
                        {posts.map((post) => {
                            const featuredImage =
                                post._embedded &&
                                post._embedded['wp:featuredmedia'] &&
                                post._embedded['wp:featuredmedia'][0];

                            return (
                                <li key={post.id} className="ab-post-item">
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
                                                />
                                            </a>
                                        </div>
                                    )}
                                    <div className="ab-post-content">
                                        {(safeAttributes.displayDate || safeAttributes.displayAuthor) && (
                                            <div className="ab-post-meta">
                                                {safeAttributes.displayDate && (
                                                    <span className="ab-post-date">
                                                        {new Date(post.date).toLocaleDateString()}
                                                    </span>
                                                )}
                                            </div>
                                        )}
                                        {safeAttributes.displayTitle && (
                                            <h3 className="ab-post-title">
                                                <a
                                                    href={post.link}
                                                    dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                                                />
                                            </h3>
                                        )}
                                        {safeAttributes.displayExcerpt && (
                                            <div
                                                className="ab-post-excerpt"
                                                dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
                                            />
                                        )}
                                        <a href={post.link} className="ab-post-read-more">
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
