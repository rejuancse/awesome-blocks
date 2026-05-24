/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { useSelect } from '@wordpress/data';
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { useEffect, useCallback } from '@wordpress/element';
import {
	PanelBody,
	RangeControl,
	SelectControl,
	ToggleControl,
	Spinner,
	TextControl,
} from '@wordpress/components';

/**
 * Internal Dependencies
 */
import { GOOGLE_FONTS, FONT_WEIGHTS, loadGoogleFont } from '../utils/google-fonts';
import { ColorControl } from '../utils/components';

/**
 * Default attribute values.
 *
 * @type {Object}
 */
const DEFAULTS = {
	postsToShow:          3,
	order:                'desc',
	orderBy:              'date',
	columns:              3,
	displayTitle:         true,
	displayExcerpt:       true,
	displayDate:          true,
	displayAuthor:        false,
	displayThumbnail:     true,
	thumbnailSize:        'medium',
	categories:           [],
	titleColor:           '#333333',
	titleFontSize:        22,
	titleFontWeight:      '600',
	titleFontFamily:      '',
	excerptColor:         '#555555',
	excerptFontSize:      15,
	excerptFontWeight:    '400',
	excerptFontFamily:    '',
	excerptMaxChars:      0,
	metaColor:            '#666666',
	metaFontSize:         14,
	metaFontWeight:       '400',
	metaFontFamily:       '',
	linkColor:            '#0073aa',
	linkHoverColor:       '#005177',
	linkFontSize:         14,
	linkFontWeight:       '600',
	linkFontFamily:       '',
	cardBgColor:          '#ffffff',
	cardBorder:           'none',
	cardBorderRadius:     8,
	cardPadding:          20,
	thumbnailBorderRadius: 0,
	thumbnailHeight:      0,
	gap:                  30,
};

/**
 * Returns the featured image URL for a post, falling back gracefully.
 *
 * @param {Object} post          WP post object with _embedded data.
 * @param {string} thumbnailSize Registered image size slug.
 * @return {string|null} Image source URL, or null when unavailable.
 */
function getFeaturedImageUrl( post, thumbnailSize ) {
	const media = post?._embedded?.[ 'wp:featuredmedia' ]?.[ 0 ];

	if ( ! media ) {
		return null;
	}

	return media?.media_details?.sizes?.[ thumbnailSize ]?.source_url || media.source_url;
}

/**
 * Edit component for the TBlock Posts block.
 *
 * @param {Object}   props
 * @param {Object}   props.attributes    Block attributes.
 * @param {Function} props.setAttributes Attribute updater.
 * @return {JSX.Element}
 */
export default function Edit( { attributes, setAttributes } ) {
	const {
		postsToShow   = DEFAULTS.postsToShow,
		order         = DEFAULTS.order,
		orderBy       = DEFAULTS.orderBy,
		columns       = DEFAULTS.columns,
		displayTitle  = DEFAULTS.displayTitle,
		displayExcerpt = DEFAULTS.displayExcerpt,
		displayDate   = DEFAULTS.displayDate,
		displayAuthor = DEFAULTS.displayAuthor,
		displayThumbnail = DEFAULTS.displayThumbnail,
		thumbnailSize = DEFAULTS.thumbnailSize,
		categories    = DEFAULTS.categories,
		titleColor    = DEFAULTS.titleColor,
		titleFontSize = DEFAULTS.titleFontSize,
		titleFontWeight  = DEFAULTS.titleFontWeight,
		titleFontFamily  = DEFAULTS.titleFontFamily,
		excerptColor      = DEFAULTS.excerptColor,
		excerptFontSize   = DEFAULTS.excerptFontSize,
		excerptFontWeight = DEFAULTS.excerptFontWeight,
		excerptFontFamily = DEFAULTS.excerptFontFamily,
		excerptMaxChars   = DEFAULTS.excerptMaxChars,
		metaColor         = DEFAULTS.metaColor,
		metaFontSize      = DEFAULTS.metaFontSize,
		metaFontWeight    = DEFAULTS.metaFontWeight,
		metaFontFamily    = DEFAULTS.metaFontFamily,
		linkColor         = DEFAULTS.linkColor,
		linkHoverColor    = DEFAULTS.linkHoverColor,
		linkFontSize      = DEFAULTS.linkFontSize,
		linkFontWeight    = DEFAULTS.linkFontWeight,
		linkFontFamily    = DEFAULTS.linkFontFamily,
		cardBgColor       = DEFAULTS.cardBgColor,
		cardBorder    = DEFAULTS.cardBorder,
		cardBorderRadius = DEFAULTS.cardBorderRadius,
		cardPadding   = DEFAULTS.cardPadding,
		thumbnailBorderRadius = DEFAULTS.thumbnailBorderRadius,
		thumbnailHeight = DEFAULTS.thumbnailHeight,
		gap           = DEFAULTS.gap,
	} = attributes;

	const blockProps = useBlockProps();

	// ── Data fetching ────────────────────────────────────────────────────────

	/** @type {Array|null} posts */
	const posts = useSelect(
		( select ) => {
			const query = {
				per_page: postsToShow,
				order,
				orderby:  orderBy,
				_embed:   true,
			};

			if ( Array.isArray( categories ) && categories.length > 0 ) {
				query.categories = categories;
			}

			return select( 'core' ).getEntityRecords( 'postType', 'post', query );
		},
		[ postsToShow, order, orderBy, categories ]
	);

	/** @type {Array|null} allCategories */
	const allCategories = useSelect( ( select ) => {
		return select( 'core' ).getEntityRecords( 'taxonomy', 'category', { per_page: -1 } );
	}, [] );

	// ── Side effects ─────────────────────────────────────────────────────────

	useEffect( () => {
		loadGoogleFont( titleFontFamily );
	}, [ titleFontFamily ] );

	useEffect( () => {
		loadGoogleFont( excerptFontFamily );
	}, [ excerptFontFamily ] );

	useEffect( () => {
		loadGoogleFont( metaFontFamily );
	}, [ metaFontFamily ] );

	useEffect( () => {
		loadGoogleFont( linkFontFamily );
	}, [ linkFontFamily ] );

	// ── Derived values ───────────────────────────────────────────────────────

	const categoryOptions = [
		{ label: __( 'All Categories', 'theme-blocks'  ), value: '' },
		...( allCategories || [] ).map( ( cat ) => ( {
			label: cat.name,
			value: cat.id,
		} ) ),
	];

	// ── Attribute change handlers ─────────────────────────────────────────────

	const onChangeCategory = useCallback(
		( value ) => setAttributes( { categories: value ? [ parseInt( value, 10 ) ] : [] } ),
		[ setAttributes ]
	);

	const onToggleDisplayTitle   = useCallback( () => setAttributes( { displayTitle:   ! displayTitle   } ), [ setAttributes, displayTitle   ] );
	const onToggleDisplayExcerpt = useCallback( () => setAttributes( { displayExcerpt: ! displayExcerpt } ), [ setAttributes, displayExcerpt ] );
	const onToggleDisplayDate    = useCallback( () => setAttributes( { displayDate:    ! displayDate    } ), [ setAttributes, displayDate    ] );
	const onToggleDisplayAuthor  = useCallback( () => setAttributes( { displayAuthor:  ! displayAuthor  } ), [ setAttributes, displayAuthor  ] );
	const onToggleDisplayThumbnail = useCallback( () => setAttributes( { displayThumbnail: ! displayThumbnail } ), [ setAttributes, displayThumbnail ] );

	// ── Render ───────────────────────────────────────────────────────────────

	return (
		<>
			<InspectorControls>

				{ /* ── Query Settings ── */ }
				<PanelBody title={ __( 'Settings', 'theme-blocks'  ) }>
					<SelectControl
						label={ __( 'Posts to Show', 'theme-blocks'  ) }
						value={ postsToShow }
						options={ [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ].map( ( n ) => ( { label: String( n ), value: n } ) ) }
						onChange={ ( value ) => setAttributes( { postsToShow: value } ) }
					/>

					<SelectControl
						label={ __( 'Category', 'theme-blocks'  ) }
						value={ ( Array.isArray( categories ) ? categories[ 0 ] : '' ) || '' }
						options={ categoryOptions }
						onChange={ onChangeCategory }
						help={ __( 'Select a category to filter posts', 'theme-blocks'  ) }
					/>

					<SelectControl
						label={ __( 'Order By', 'theme-blocks'  ) }
						value={ orderBy }
						options={ [
							{ label: __( 'Date',     'theme-blocks'  ), value: 'date'     },
							{ label: __( 'Title',    'theme-blocks'  ), value: 'title'    },
							{ label: __( 'Modified', 'theme-blocks'  ), value: 'modified' },
							{ label: __( 'Author',   'theme-blocks'  ), value: 'author'   },
							{ label: __( 'Random',   'theme-blocks'  ), value: 'rand'     },
						] }
						onChange={ ( value ) => setAttributes( { orderBy: value } ) }
					/>

					<SelectControl
						label={ __( 'Order', 'theme-blocks'  ) }
						value={ order }
						options={ [
							{ label: __( 'Descending', 'theme-blocks'  ), value: 'desc' },
							{ label: __( 'Ascending',  'theme-blocks'  ), value: 'asc'  },
						] }
						onChange={ ( value ) => setAttributes( { order: value } ) }
					/>

					<RangeControl
						label={ __( 'Columns', 'theme-blocks'  ) }
						value={ columns }
						onChange={ ( value ) => setAttributes( { columns: value } ) }
						min={ 1 }
						max={ 6 }
					/>

					<SelectControl
						label={ __( 'Thumbnail Size', 'theme-blocks'  ) }
						value={ thumbnailSize }
						options={ [
							{ label: __( 'Thumbnail',    'theme-blocks'  ), value: 'thumbnail'    },
							{ label: __( 'Medium',       'theme-blocks'  ), value: 'medium'       },
							{ label: __( 'Medium Large', 'theme-blocks'  ), value: 'medium_large' },
							{ label: __( 'Large',        'theme-blocks'  ), value: 'large'        },
							{ label: __( 'Full',         'theme-blocks'  ), value: 'full'         },
						] }
						onChange={ ( value ) => setAttributes( { thumbnailSize: value } ) }
					/>
				</PanelBody>

				{ /* ── Display Options ── */ }
				<PanelBody title={ __( 'Display Options', 'theme-blocks'  ) } initialOpen={ false }>
					<ToggleControl
						label={ __( 'Display Title', 'theme-blocks'  ) }
						checked={ displayTitle }
						onChange={ onToggleDisplayTitle }
					/>
					<ToggleControl
						label={ __( 'Display Excerpt', 'theme-blocks'  ) }
						checked={ displayExcerpt }
						onChange={ onToggleDisplayExcerpt }
					/>
					<ToggleControl
						label={ __( 'Display Date', 'theme-blocks'  ) }
						checked={ displayDate }
						onChange={ onToggleDisplayDate }
					/>
					<ToggleControl
						label={ __( 'Display Author', 'theme-blocks'  ) }
						checked={ displayAuthor }
						onChange={ onToggleDisplayAuthor }
					/>
					<ToggleControl
						label={ __( 'Display Thumbnail', 'theme-blocks'  ) }
						checked={ displayThumbnail }
						onChange={ onToggleDisplayThumbnail }
					/>
				</PanelBody>

				{ /* ── Style Settings ── */ }
				<PanelBody title={ __( 'Style Settings', 'theme-blocks'  ) } initialOpen={ false }>

					{ /* Title */ }
					<h3>{ __( 'Title Style', 'theme-blocks'  ) }</h3>
					<ColorControl
						label={ __( 'Title Color', 'theme-blocks'  ) }
						value={ titleColor }
						onChange={ ( value ) => setAttributes( { titleColor: value } ) }
						placeholder="#333333"
					/>
					<RangeControl
						label={ __( 'Title Font Size', 'theme-blocks'  ) }
						value={ titleFontSize }
						onChange={ ( value ) => setAttributes( { titleFontSize: value } ) }
						min={ 12 }
						max={ 60 }
					/>
					<SelectControl
						label={ __( 'Title Font Weight', 'theme-blocks'  ) }
						value={ titleFontWeight }
						options={ FONT_WEIGHTS }
						onChange={ ( value ) => setAttributes( { titleFontWeight: value } ) }
					/>
					<SelectControl
						label={ __( 'Title Font Family', 'theme-blocks'  ) }
						value={ titleFontFamily }
						options={ GOOGLE_FONTS }
						onChange={ ( value ) => setAttributes( { titleFontFamily: value } ) }
						help={ __( 'Select a Google Font for the title', 'theme-blocks'  ) }
					/>

					{ /* Excerpt */ }
					<h3>{ __( 'Excerpt Style', 'theme-blocks'  ) }</h3>
					<ColorControl
						label={ __( 'Excerpt Color', 'theme-blocks'  ) }
						value={ excerptColor }
						onChange={ ( value ) => setAttributes( { excerptColor: value } ) }
						placeholder="#555555"
					/>
					<RangeControl
						label={ __( 'Excerpt Font Size', 'theme-blocks'  ) }
						value={ excerptFontSize }
						onChange={ ( value ) => setAttributes( { excerptFontSize: value } ) }
						min={ 12 }
						max={ 30 }
					/>
					<SelectControl
						label={ __( 'Excerpt Font Weight', 'theme-blocks'  ) }
						value={ excerptFontWeight }
						options={ FONT_WEIGHTS }
						onChange={ ( value ) => setAttributes( { excerptFontWeight: value } ) }
					/>
					<SelectControl
						label={ __( 'Excerpt Font Family', 'theme-blocks'  ) }
						value={ excerptFontFamily }
						options={ GOOGLE_FONTS }
						onChange={ ( value ) => setAttributes( { excerptFontFamily: value } ) }
						help={ __( 'Select a Google Font for the excerpt', 'theme-blocks'  ) }
					/>
					<RangeControl
						label={ __( 'Excerpt Max Characters', 'theme-blocks'  ) }
						value={ excerptMaxChars }
						onChange={ ( value ) => setAttributes( { excerptMaxChars: value } ) }
						min={ 0 }
						max={ 500 }
						help={ __( 'Set 0 to show full excerpt', 'theme-blocks'  ) }
					/>

					{ /* Meta */ }
					<h3 className="meta-style">{ __( 'Meta Style', 'theme-blocks'  ) }</h3>
					<ColorControl
						label={ __( 'Meta Color', 'theme-blocks'  ) }
						value={ metaColor }
						onChange={ ( value ) => setAttributes( { metaColor: value } ) }
						placeholder="#666666"
					/>
					<RangeControl
						label={ __( 'Meta Font Size', 'theme-blocks'  ) }
						value={ metaFontSize }
						onChange={ ( value ) => setAttributes( { metaFontSize: value } ) }
						min={ 10 }
						max={ 24 }
					/>
					<SelectControl
						label={ __( 'Meta Font Weight', 'theme-blocks'  ) }
						value={ metaFontWeight }
						options={ FONT_WEIGHTS }
						onChange={ ( value ) => setAttributes( { metaFontWeight: value } ) }
					/>
					<SelectControl
						label={ __( 'Meta Font Family', 'theme-blocks'  ) }
						value={ metaFontFamily }
						options={ GOOGLE_FONTS }
						onChange={ ( value ) => setAttributes( { metaFontFamily: value } ) }
						help={ __( 'Select a Google Font for meta info', 'theme-blocks'  ) }
					/>

					{ /* Links */ }
					<h3 className="meta-style">{ __( 'Link Style', 'theme-blocks'  ) }</h3>
					<ColorControl
						label={ __( 'Link Color', 'theme-blocks'  ) }
						value={ linkColor }
						onChange={ ( value ) => setAttributes( { linkColor: value } ) }
						placeholder="#0073aa"
					/>
					<ColorControl
						label={ __( 'Link Hover Color', 'theme-blocks'  ) }
						value={ linkHoverColor }
						onChange={ ( value ) => setAttributes( { linkHoverColor: value } ) }
						placeholder="#005177"
					/>
					<RangeControl
						label={ __( 'Link Font Size', 'theme-blocks'  ) }
						value={ linkFontSize }
						onChange={ ( value ) => setAttributes( { linkFontSize: value } ) }
						min={ 10 }
						max={ 30 }
					/>
					<SelectControl
						label={ __( 'Link Font Weight', 'theme-blocks'  ) }
						value={ linkFontWeight }
						options={ FONT_WEIGHTS }
						onChange={ ( value ) => setAttributes( { linkFontWeight: value } ) }
					/>
					<SelectControl
						label={ __( 'Link Font Family', 'theme-blocks'  ) }
						value={ linkFontFamily }
						options={ GOOGLE_FONTS }
						onChange={ ( value ) => setAttributes( { linkFontFamily: value } ) }
						help={ __( 'Select a Google Font for links', 'theme-blocks'  ) }
					/>

					{ /* Card */ }
					<h3 className="meta-style">{ __( 'Card Style', 'theme-blocks'  ) }</h3>
					<ColorControl
						label={ __( 'Card Background Color', 'theme-blocks'  ) }
						value={ cardBgColor }
						onChange={ ( value ) => setAttributes( { cardBgColor: value } ) }
						placeholder="#ffffff"
					/>
					<TextControl
						label={ __( 'Card Border', 'theme-blocks'  ) }
						value={ cardBorder }
						onChange={ ( value ) => setAttributes( { cardBorder: value } ) }
						placeholder={ __( 'e.g., 1px solid #ddd', 'theme-blocks'  ) }
						help={ __( 'CSS border property (e.g., 1px solid #ddd)', 'theme-blocks'  ) }
					/>
					<RangeControl
						label={ __( 'Card Border Radius', 'theme-blocks'  ) }
						value={ cardBorderRadius }
						onChange={ ( value ) => setAttributes( { cardBorderRadius: value } ) }
						min={ 0 }
						max={ 50 }
					/>
					<RangeControl
						label={ __( 'Card Padding', 'theme-blocks'  ) }
						value={ cardPadding }
						onChange={ ( value ) => setAttributes( { cardPadding: value } ) }
						min={ 0 }
						max={ 60 }
					/>

					{ /* Thumbnail */ }
					<h3>{ __( 'Thumbnail Style', 'theme-blocks'  ) }</h3>
					<RangeControl
						label={ __( 'Thumbnail Border Radius', 'theme-blocks'  ) }
						value={ thumbnailBorderRadius }
						onChange={ ( value ) => setAttributes( { thumbnailBorderRadius: value } ) }
						min={ 0 }
						max={ 50 }
					/>
					<RangeControl
						label={ __( 'Thumbnail Height (px)', 'theme-blocks'  ) }
						value={ thumbnailHeight }
						onChange={ ( value ) => setAttributes( { thumbnailHeight: value } ) }
						min={ 0 }
						max={ 600 }
						help={ __( 'Set 0 for auto height', 'theme-blocks'  ) }
					/>

					{ /* Layout */ }
					<h3 className="meta-style">{ __( 'Layout', 'theme-blocks'  ) }</h3>
					<RangeControl
						label={ __( 'Gap Between Cards', 'theme-blocks'  ) }
						value={ gap }
						onChange={ ( value ) => setAttributes( { gap: value } ) }
						min={ 0 }
						max={ 100 }
					/>
				</PanelBody>

			</InspectorControls>

			<div { ...blockProps }>
				<style>
					{`
						.wp-block-tblock-post-block .theme-blocks-post-read-more {
							color: ${ linkColor || '#0073aa' };
							font-size: ${ linkFontSize || 14 }px;
							font-weight: ${ linkFontWeight || '600' };
							font-family: ${ linkFontFamily || 'inherit' };
						}
						.wp-block-tblock-post-block .theme-blocks-post-read-more:hover,
						.wp-block-tblock-post-block .theme-blocks-post-title a:hover {
							color: ${ linkHoverColor || '#005177' } !important;
						}
					`}
				</style>

				{ null === posts && (
					<div className="theme-blocks-loading">
						<Spinner />
						<p>{ __( 'Loading posts…', 'theme-blocks'  ) }</p>
					</div>
				) }

				{ null !== posts && posts.length === 0 && (
					<div className="theme-blocks-no-posts">
						<p>{ __( 'No posts found.', 'theme-blocks'  ) }</p>
					</div>
				) }

				{ null !== posts && posts.length > 0 && (
					<ul
						className={ `theme-blocks-posts-grid columns-${ columns }` }
						style={ { gap: `${ gap }px` } }
					>
						{ posts.map( ( post ) => {
							const imageUrl = displayThumbnail
								? getFeaturedImageUrl( post, thumbnailSize )
								: null;

							return (
								<li
									key={ post.id }
									className="theme-blocks-post-item"
									style={ {
										backgroundColor: cardBgColor,
										border:          cardBorder,
										borderRadius:    `${ cardBorderRadius }px`,
									} }
								>
									{ imageUrl && (
										<div className="theme-blocks-post-thumbnail">
											<a href={ post.link }>
												<img
													src={ imageUrl }
													alt={ post._embedded?.[ 'wp:featuredmedia' ]?.[ 0 ]?.alt_text || post.title.rendered }
													style={ {
														borderRadius: `${ thumbnailBorderRadius }px`,
														height:       thumbnailHeight > 0 ? `${ thumbnailHeight }px` : 'auto',
													} }
												/>
											</a>
										</div>
									) }

									<div
										className="theme-blocks-post-content"
										style={ { padding: `${ cardPadding }px` } }
									>
										{ ( displayDate || displayAuthor ) && (
											<div
												className="theme-blocks-post-meta"
												style={ {
													color:      metaColor,
													fontSize:   `${ metaFontSize }px`,
													fontWeight: metaFontWeight,
													fontFamily: metaFontFamily || 'inherit',
												} }
											>
												{ displayDate && (
													<span className="theme-blocks-post-date">
														{ new Date( post.date ).toLocaleDateString() }
													</span>
												) }
												{ displayAuthor && (
													<span className="theme-blocks-post-author">
														{ __( 'By ', 'theme-blocks'  ) }
														{ post._embedded?.author?.[0]?.name || __( 'Unknown', 'theme-blocks'  ) }
													</span>
												) }
											</div>
										) }

										{ displayTitle && (
											<h3
												className="theme-blocks-post-title"
												style={ {
													color:      titleColor,
													fontSize:   `${ titleFontSize }px`,
													fontWeight: titleFontWeight,
													fontFamily: titleFontFamily || 'inherit',
												} }
											>
												<a
													href={ post.link }
													dangerouslySetInnerHTML={ { __html: post.title.rendered } }
												/>
											</h3>
										) }

										{ displayExcerpt && ( () => {
											const rawHtml   = post.excerpt.rendered;
											const plainText = rawHtml.replace( /<[^>]+>/g, '' );
											const content   = ( excerptMaxChars > 0 && plainText.length > excerptMaxChars )
												? plainText.substring( 0, excerptMaxChars ) + '…'
												: rawHtml;
											const useHtml   = ! ( excerptMaxChars > 0 && plainText.length > excerptMaxChars );

											return (
												<div
													className="theme-blocks-post-excerpt"
													{ ...( useHtml
														? { dangerouslySetInnerHTML: { __html: content } }
														: { children: content }
													) }
													style={ {
														color:      excerptColor,
														fontSize:   `${ excerptFontSize }px`,
														fontWeight: excerptFontWeight,
														fontFamily: excerptFontFamily || 'inherit',
													} }
												/>
											);
										} )() }

										<a
											href={ post.link }
											className="theme-blocks-post-read-more"
										>
											{ __( 'Read More →', 'theme-blocks'  ) }
										</a>
									</div>
								</li>
							);
						} ) }
					</ul>
				) }
			</div>
		</>
	);
}