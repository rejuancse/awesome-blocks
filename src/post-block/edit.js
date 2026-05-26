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
 * Edit component for the Zepblock Posts block.
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
		{ label: __( 'All Categories', 'zepblocks'  ), value: '' },
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
				<PanelBody title={ __( 'Settings', 'zepblocks'  ) }>
					<SelectControl
						label={ __( 'Posts to Show', 'zepblocks'  ) }
						value={ postsToShow }
						options={ [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ].map( ( n ) => ( { label: String( n ), value: n } ) ) }
						onChange={ ( value ) => setAttributes( { postsToShow: value } ) }
					/>

					<SelectControl
						label={ __( 'Category', 'zepblocks'  ) }
						value={ ( Array.isArray( categories ) ? categories[ 0 ] : '' ) || '' }
						options={ categoryOptions }
						onChange={ onChangeCategory }
						help={ __( 'Select a category to filter posts', 'zepblocks'  ) }
					/>

					<SelectControl
						label={ __( 'Order By', 'zepblocks'  ) }
						value={ orderBy }
						options={ [
							{ label: __( 'Date',     'zepblocks'  ), value: 'date'     },
							{ label: __( 'Title',    'zepblocks'  ), value: 'title'    },
							{ label: __( 'Modified', 'zepblocks'  ), value: 'modified' },
							{ label: __( 'Author',   'zepblocks'  ), value: 'author'   },
							{ label: __( 'Random',   'zepblocks'  ), value: 'rand'     },
						] }
						onChange={ ( value ) => setAttributes( { orderBy: value } ) }
					/>

					<SelectControl
						label={ __( 'Order', 'zepblocks'  ) }
						value={ order }
						options={ [
							{ label: __( 'Descending', 'zepblocks'  ), value: 'desc' },
							{ label: __( 'Ascending',  'zepblocks'  ), value: 'asc'  },
						] }
						onChange={ ( value ) => setAttributes( { order: value } ) }
					/>

					<RangeControl
						label={ __( 'Columns', 'zepblocks'  ) }
						value={ columns }
						onChange={ ( value ) => setAttributes( { columns: value } ) }
						min={ 1 }
						max={ 6 }
					/>

					<SelectControl
						label={ __( 'Thumbnail Size', 'zepblocks'  ) }
						value={ thumbnailSize }
						options={ [
							{ label: __( 'Thumbnail',    'zepblocks'  ), value: 'thumbnail'    },
							{ label: __( 'Medium',       'zepblocks'  ), value: 'medium'       },
							{ label: __( 'Medium Large', 'zepblocks'  ), value: 'medium_large' },
							{ label: __( 'Large',        'zepblocks'  ), value: 'large'        },
							{ label: __( 'Full',         'zepblocks'  ), value: 'full'         },
						] }
						onChange={ ( value ) => setAttributes( { thumbnailSize: value } ) }
					/>
				</PanelBody>

				{ /* ── Display Options ── */ }
				<PanelBody title={ __( 'Display Options', 'zepblocks'  ) } initialOpen={ false }>
					<ToggleControl
						label={ __( 'Display Title', 'zepblocks'  ) }
						checked={ displayTitle }
						onChange={ onToggleDisplayTitle }
					/>
					<ToggleControl
						label={ __( 'Display Excerpt', 'zepblocks'  ) }
						checked={ displayExcerpt }
						onChange={ onToggleDisplayExcerpt }
					/>
					<ToggleControl
						label={ __( 'Display Date', 'zepblocks'  ) }
						checked={ displayDate }
						onChange={ onToggleDisplayDate }
					/>
					<ToggleControl
						label={ __( 'Display Author', 'zepblocks'  ) }
						checked={ displayAuthor }
						onChange={ onToggleDisplayAuthor }
					/>
					<ToggleControl
						label={ __( 'Display Thumbnail', 'zepblocks'  ) }
						checked={ displayThumbnail }
						onChange={ onToggleDisplayThumbnail }
					/>
				</PanelBody>

				{ /* ── Style Settings ── */ }
				<PanelBody title={ __( 'Style Settings', 'zepblocks'  ) } initialOpen={ false }>

					{ /* Title */ }
					<h3>{ __( 'Title Style', 'zepblocks'  ) }</h3>
					<ColorControl
						label={ __( 'Title Color', 'zepblocks'  ) }
						value={ titleColor }
						onChange={ ( value ) => setAttributes( { titleColor: value } ) }
						placeholder="#333333"
					/>
					<RangeControl
						label={ __( 'Title Font Size', 'zepblocks'  ) }
						value={ titleFontSize }
						onChange={ ( value ) => setAttributes( { titleFontSize: value } ) }
						min={ 12 }
						max={ 60 }
					/>
					<SelectControl
						label={ __( 'Title Font Weight', 'zepblocks'  ) }
						value={ titleFontWeight }
						options={ FONT_WEIGHTS }
						onChange={ ( value ) => setAttributes( { titleFontWeight: value } ) }
					/>
					<SelectControl
						label={ __( 'Title Font Family', 'zepblocks'  ) }
						value={ titleFontFamily }
						options={ GOOGLE_FONTS }
						onChange={ ( value ) => setAttributes( { titleFontFamily: value } ) }
						help={ __( 'Select a Google Font for the title', 'zepblocks'  ) }
					/>

					{ /* Excerpt */ }
					<h3>{ __( 'Excerpt Style', 'zepblocks'  ) }</h3>
					<ColorControl
						label={ __( 'Excerpt Color', 'zepblocks'  ) }
						value={ excerptColor }
						onChange={ ( value ) => setAttributes( { excerptColor: value } ) }
						placeholder="#555555"
					/>
					<RangeControl
						label={ __( 'Excerpt Font Size', 'zepblocks'  ) }
						value={ excerptFontSize }
						onChange={ ( value ) => setAttributes( { excerptFontSize: value } ) }
						min={ 12 }
						max={ 30 }
					/>
					<SelectControl
						label={ __( 'Excerpt Font Weight', 'zepblocks'  ) }
						value={ excerptFontWeight }
						options={ FONT_WEIGHTS }
						onChange={ ( value ) => setAttributes( { excerptFontWeight: value } ) }
					/>
					<SelectControl
						label={ __( 'Excerpt Font Family', 'zepblocks'  ) }
						value={ excerptFontFamily }
						options={ GOOGLE_FONTS }
						onChange={ ( value ) => setAttributes( { excerptFontFamily: value } ) }
						help={ __( 'Select a Google Font for the excerpt', 'zepblocks'  ) }
					/>
					<RangeControl
						label={ __( 'Excerpt Max Characters', 'zepblocks'  ) }
						value={ excerptMaxChars }
						onChange={ ( value ) => setAttributes( { excerptMaxChars: value } ) }
						min={ 0 }
						max={ 500 }
						help={ __( 'Set 0 to show full excerpt', 'zepblocks'  ) }
					/>

					{ /* Meta */ }
					<h3 className="meta-style">{ __( 'Meta Style', 'zepblocks'  ) }</h3>
					<ColorControl
						label={ __( 'Meta Color', 'zepblocks'  ) }
						value={ metaColor }
						onChange={ ( value ) => setAttributes( { metaColor: value } ) }
						placeholder="#666666"
					/>
					<RangeControl
						label={ __( 'Meta Font Size', 'zepblocks'  ) }
						value={ metaFontSize }
						onChange={ ( value ) => setAttributes( { metaFontSize: value } ) }
						min={ 10 }
						max={ 24 }
					/>
					<SelectControl
						label={ __( 'Meta Font Weight', 'zepblocks'  ) }
						value={ metaFontWeight }
						options={ FONT_WEIGHTS }
						onChange={ ( value ) => setAttributes( { metaFontWeight: value } ) }
					/>
					<SelectControl
						label={ __( 'Meta Font Family', 'zepblocks'  ) }
						value={ metaFontFamily }
						options={ GOOGLE_FONTS }
						onChange={ ( value ) => setAttributes( { metaFontFamily: value } ) }
						help={ __( 'Select a Google Font for meta info', 'zepblocks'  ) }
					/>

					{ /* Links */ }
					<h3 className="meta-style">{ __( 'Link Style', 'zepblocks'  ) }</h3>
					<ColorControl
						label={ __( 'Link Color', 'zepblocks'  ) }
						value={ linkColor }
						onChange={ ( value ) => setAttributes( { linkColor: value } ) }
						placeholder="#0073aa"
					/>
					<ColorControl
						label={ __( 'Link Hover Color', 'zepblocks'  ) }
						value={ linkHoverColor }
						onChange={ ( value ) => setAttributes( { linkHoverColor: value } ) }
						placeholder="#005177"
					/>
					<RangeControl
						label={ __( 'Link Font Size', 'zepblocks'  ) }
						value={ linkFontSize }
						onChange={ ( value ) => setAttributes( { linkFontSize: value } ) }
						min={ 10 }
						max={ 30 }
					/>
					<SelectControl
						label={ __( 'Link Font Weight', 'zepblocks'  ) }
						value={ linkFontWeight }
						options={ FONT_WEIGHTS }
						onChange={ ( value ) => setAttributes( { linkFontWeight: value } ) }
					/>
					<SelectControl
						label={ __( 'Link Font Family', 'zepblocks'  ) }
						value={ linkFontFamily }
						options={ GOOGLE_FONTS }
						onChange={ ( value ) => setAttributes( { linkFontFamily: value } ) }
						help={ __( 'Select a Google Font for links', 'zepblocks'  ) }
					/>

					{ /* Card */ }
					<h3 className="meta-style">{ __( 'Card Style', 'zepblocks'  ) }</h3>
					<ColorControl
						label={ __( 'Card Background Color', 'zepblocks'  ) }
						value={ cardBgColor }
						onChange={ ( value ) => setAttributes( { cardBgColor: value } ) }
						placeholder="#ffffff"
					/>
					<TextControl
						label={ __( 'Card Border', 'zepblocks'  ) }
						value={ cardBorder }
						onChange={ ( value ) => setAttributes( { cardBorder: value } ) }
						placeholder={ __( 'e.g., 1px solid #ddd', 'zepblocks'  ) }
						help={ __( 'CSS border property (e.g., 1px solid #ddd)', 'zepblocks'  ) }
					/>
					<RangeControl
						label={ __( 'Card Border Radius', 'zepblocks'  ) }
						value={ cardBorderRadius }
						onChange={ ( value ) => setAttributes( { cardBorderRadius: value } ) }
						min={ 0 }
						max={ 50 }
					/>
					<RangeControl
						label={ __( 'Card Padding', 'zepblocks'  ) }
						value={ cardPadding }
						onChange={ ( value ) => setAttributes( { cardPadding: value } ) }
						min={ 0 }
						max={ 60 }
					/>

					{ /* Thumbnail */ }
					<h3>{ __( 'Thumbnail Style', 'zepblocks'  ) }</h3>
					<RangeControl
						label={ __( 'Thumbnail Border Radius', 'zepblocks'  ) }
						value={ thumbnailBorderRadius }
						onChange={ ( value ) => setAttributes( { thumbnailBorderRadius: value } ) }
						min={ 0 }
						max={ 50 }
					/>
					<RangeControl
						label={ __( 'Thumbnail Height (px)', 'zepblocks'  ) }
						value={ thumbnailHeight }
						onChange={ ( value ) => setAttributes( { thumbnailHeight: value } ) }
						min={ 0 }
						max={ 600 }
						help={ __( 'Set 0 for auto height', 'zepblocks'  ) }
					/>

					{ /* Layout */ }
					<h3 className="meta-style">{ __( 'Layout', 'zepblocks'  ) }</h3>
					<RangeControl
						label={ __( 'Gap Between Cards', 'zepblocks'  ) }
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
						.wp-block-zepblock-post-block .zepblocks-post-read-more {
							color: ${ linkColor || '#0073aa' };
							font-size: ${ linkFontSize || 14 }px;
							font-weight: ${ linkFontWeight || '600' };
							font-family: ${ linkFontFamily || 'inherit' };
						}
						.wp-block-zepblock-post-block .zepblocks-post-read-more:hover,
						.wp-block-zepblock-post-block .zepblocks-post-title a:hover {
							color: ${ linkHoverColor || '#005177' } !important;
						}
					`}
				</style>

				{ null === posts && (
					<div className="zepblocks-loading">
						<Spinner />
						<p>{ __( 'Loading posts…', 'zepblocks'  ) }</p>
					</div>
				) }

				{ null !== posts && posts.length === 0 && (
					<div className="zepblocks-no-posts">
						<p>{ __( 'No posts found.', 'zepblocks'  ) }</p>
					</div>
				) }

				{ null !== posts && posts.length > 0 && (
					<ul
						className={ `zepblocks-posts-grid columns-${ columns }` }
						style={ { gap: `${ gap }px` } }
					>
						{ posts.map( ( post ) => {
							const imageUrl = displayThumbnail
								? getFeaturedImageUrl( post, thumbnailSize )
								: null;

							return (
								<li
									key={ post.id }
									className="zepblocks-post-item"
									style={ {
										backgroundColor: cardBgColor,
										border:          cardBorder,
										borderRadius:    `${ cardBorderRadius }px`,
									} }
								>
									{ imageUrl && (
										<div className="zepblocks-post-thumbnail">
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
										className="zepblocks-post-content"
										style={ { padding: `${ cardPadding }px` } }
									>
										{ ( displayDate || displayAuthor ) && (
											<div
												className="zepblocks-post-meta"
												style={ {
													color:      metaColor,
													fontSize:   `${ metaFontSize }px`,
													fontWeight: metaFontWeight,
													fontFamily: metaFontFamily || 'inherit',
												} }
											>
												{ displayDate && (
													<span className="zepblocks-post-date">
														{ new Date( post.date ).toLocaleDateString() }
													</span>
												) }
												{ displayAuthor && (
													<span className="zepblocks-post-author">
														{ __( 'By ', 'zepblocks'  ) }
														{ post._embedded?.author?.[0]?.name || __( 'Unknown', 'zepblocks'  ) }
													</span>
												) }
											</div>
										) }

										{ displayTitle && (
											<h3
												className="zepblocks-post-title"
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
													className="zepblocks-post-excerpt"
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
											className="zepblocks-post-read-more"
										>
											{ __( 'Read More →', 'zepblocks'  ) }
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