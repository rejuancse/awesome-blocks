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
	BaseControl,
	TextControl,
} from '@wordpress/components';

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
 * Google Fonts options list.
 *
 * @type {Array.<{label: string, value: string}>}
 */
const GOOGLE_FONTS = [
	{ label: __( 'Default', 'awesome-blocks' ),      value: '' },
	{ label: 'Roboto',                               value: "'Roboto', sans-serif" },
	{ label: 'Open Sans',                            value: "'Open Sans', sans-serif" },
	{ label: 'Lato',                                 value: "'Lato', sans-serif" },
	{ label: 'Montserrat',                           value: "'Montserrat', sans-serif" },
	{ label: 'Oswald',                               value: "'Oswald', sans-serif" },
	{ label: 'Raleway',                              value: "'Raleway', sans-serif" },
	{ label: 'Poppins',                              value: "'Poppins', sans-serif" },
	{ label: 'Roboto Slab',                          value: "'Roboto Slab', serif" },
	{ label: 'Merriweather',                         value: "'Merriweather', serif" },
	{ label: 'Playfair Display',                     value: "'Playfair Display', serif" },
	{ label: 'Lora',                                 value: "'Lora', serif" },
	{ label: 'Source Sans Pro',                      value: "'Source Sans Pro', sans-serif" },
	{ label: 'Nunito',                               value: "'Nunito', sans-serif" },
	{ label: 'Ubuntu',                               value: "'Ubuntu', sans-serif" },
	{ label: 'PT Sans',                              value: "'PT Sans', sans-serif" },
	{ label: 'Work Sans',                            value: "'Work Sans', sans-serif" },
	{ label: 'Rubik',                                value: "'Rubik', sans-serif" },
	{ label: 'Noto Sans',                            value: "'Noto Sans', sans-serif" },
];

/**
 * Loads a Google Font dynamically into the document <head>.
 *
 * @param {string} fontFamily CSS font-family string, e.g. "'Roboto', sans-serif".
 * @return {void}
 */
function loadGoogleFont( fontFamily ) {
	if ( ! fontFamily ) {
		return;
	}

	const fontName = fontFamily.split( ',' )[ 0 ].replace( /'/g, '' ).trim();
	const linkId   = `google-font-${ fontName.replace( /\s+/g, '-' ).toLowerCase() }`;

	if ( document.getElementById( linkId ) ) {
		return;
	}

	const link  = document.createElement( 'link' );
	link.id     = linkId;
	link.rel    = 'stylesheet';
	link.href   = `https://fonts.googleapis.com/css2?family=${ fontName.replace( /\s+/g, '+' ) }&display=swap`;

	document.head.appendChild( link );
}

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
 * Inline color picker + hex text input pair.
 *
 * @param {Object}   props
 * @param {string}   props.label     Visible label.
 * @param {string}   props.value     Current hex color value.
 * @param {Function} props.onChange  Called with the new hex string.
 * @param {string}   props.placeholder Placeholder text for the text input.
 * @return {JSX.Element}
 */
function ColorControl( { label, value, onChange, placeholder } ) {
	return (
		<BaseControl label={ label }>
			<div className="ab-color-input-wrapper">
				<input
					type="color"
					value={ value }
					onChange={ ( event ) => onChange( event.target.value ) }
					className="ab-color-input"
				/>
				<input
					type="text"
					value={ value }
					onChange={ ( event ) => onChange( event.target.value ) }
					className="ab-color-text-input"
					placeholder={ placeholder }
				/>
			</div>
		</BaseControl>
	);
}

/**
 * Edit component for the Awesome Posts block.
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
		{ label: __( 'All Categories', 'awesome-blocks' ), value: '' },
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
				<PanelBody title={ __( 'Settings', 'awesome-blocks' ) }>
					<SelectControl
						label={ __( 'Posts to Show', 'awesome-blocks' ) }
						value={ postsToShow }
						options={ [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ].map( ( n ) => ( { label: String( n ), value: n } ) ) }
						onChange={ ( value ) => setAttributes( { postsToShow: value } ) }
					/>

					<SelectControl
						label={ __( 'Category', 'awesome-blocks' ) }
						value={ ( Array.isArray( categories ) ? categories[ 0 ] : '' ) || '' }
						options={ categoryOptions }
						onChange={ onChangeCategory }
						help={ __( 'Select a category to filter posts', 'awesome-blocks' ) }
					/>

					<SelectControl
						label={ __( 'Order By', 'awesome-blocks' ) }
						value={ orderBy }
						options={ [
							{ label: __( 'Date',     'awesome-blocks' ), value: 'date'     },
							{ label: __( 'Title',    'awesome-blocks' ), value: 'title'    },
							{ label: __( 'Modified', 'awesome-blocks' ), value: 'modified' },
							{ label: __( 'Author',   'awesome-blocks' ), value: 'author'   },
							{ label: __( 'Random',   'awesome-blocks' ), value: 'rand'     },
						] }
						onChange={ ( value ) => setAttributes( { orderBy: value } ) }
					/>

					<SelectControl
						label={ __( 'Order', 'awesome-blocks' ) }
						value={ order }
						options={ [
							{ label: __( 'Descending', 'awesome-blocks' ), value: 'desc' },
							{ label: __( 'Ascending',  'awesome-blocks' ), value: 'asc'  },
						] }
						onChange={ ( value ) => setAttributes( { order: value } ) }
					/>

					<RangeControl
						label={ __( 'Columns', 'awesome-blocks' ) }
						value={ columns }
						onChange={ ( value ) => setAttributes( { columns: value } ) }
						min={ 1 }
						max={ 6 }
					/>

					<SelectControl
						label={ __( 'Thumbnail Size', 'awesome-blocks' ) }
						value={ thumbnailSize }
						options={ [
							{ label: __( 'Thumbnail',    'awesome-blocks' ), value: 'thumbnail'    },
							{ label: __( 'Medium',       'awesome-blocks' ), value: 'medium'       },
							{ label: __( 'Medium Large', 'awesome-blocks' ), value: 'medium_large' },
							{ label: __( 'Large',        'awesome-blocks' ), value: 'large'        },
							{ label: __( 'Full',         'awesome-blocks' ), value: 'full'         },
						] }
						onChange={ ( value ) => setAttributes( { thumbnailSize: value } ) }
					/>
				</PanelBody>

				{ /* ── Display Options ── */ }
				<PanelBody title={ __( 'Display Options', 'awesome-blocks' ) } initialOpen={ false }>
					<ToggleControl
						label={ __( 'Display Title', 'awesome-blocks' ) }
						checked={ displayTitle }
						onChange={ onToggleDisplayTitle }
					/>
					<ToggleControl
						label={ __( 'Display Excerpt', 'awesome-blocks' ) }
						checked={ displayExcerpt }
						onChange={ onToggleDisplayExcerpt }
					/>
					<ToggleControl
						label={ __( 'Display Date', 'awesome-blocks' ) }
						checked={ displayDate }
						onChange={ onToggleDisplayDate }
					/>
					<ToggleControl
						label={ __( 'Display Author', 'awesome-blocks' ) }
						checked={ displayAuthor }
						onChange={ onToggleDisplayAuthor }
					/>
					<ToggleControl
						label={ __( 'Display Thumbnail', 'awesome-blocks' ) }
						checked={ displayThumbnail }
						onChange={ onToggleDisplayThumbnail }
					/>
				</PanelBody>

				{ /* ── Style Settings ── */ }
				<PanelBody title={ __( 'Style Settings', 'awesome-blocks' ) } initialOpen={ false }>

					{ /* Title */ }
					<h3>{ __( 'Title Style', 'awesome-blocks' ) }</h3>
					<ColorControl
						label={ __( 'Title Color', 'awesome-blocks' ) }
						value={ titleColor }
						onChange={ ( value ) => setAttributes( { titleColor: value } ) }
						placeholder="#333333"
					/>
					<RangeControl
						label={ __( 'Title Font Size', 'awesome-blocks' ) }
						value={ titleFontSize }
						onChange={ ( value ) => setAttributes( { titleFontSize: value } ) }
						min={ 12 }
						max={ 60 }
					/>
					<SelectControl
						label={ __( 'Title Font Weight', 'awesome-blocks' ) }
						value={ titleFontWeight }
						options={ [
							{ label: __( 'Normal',    'awesome-blocks' ), value: '400' },
							{ label: __( 'Medium',    'awesome-blocks' ), value: '500' },
							{ label: __( 'Semi Bold', 'awesome-blocks' ), value: '600' },
							{ label: __( 'Bold',      'awesome-blocks' ), value: '700' },
						] }
						onChange={ ( value ) => setAttributes( { titleFontWeight: value } ) }
					/>
					<SelectControl
						label={ __( 'Title Font Family', 'awesome-blocks' ) }
						value={ titleFontFamily }
						options={ GOOGLE_FONTS }
						onChange={ ( value ) => setAttributes( { titleFontFamily: value } ) }
						help={ __( 'Select a Google Font for the title', 'awesome-blocks' ) }
					/>

					{ /* Excerpt */ }
					<h3>{ __( 'Excerpt Style', 'awesome-blocks' ) }</h3>
					<ColorControl
						label={ __( 'Excerpt Color', 'awesome-blocks' ) }
						value={ excerptColor }
						onChange={ ( value ) => setAttributes( { excerptColor: value } ) }
						placeholder="#555555"
					/>
					<RangeControl
						label={ __( 'Excerpt Font Size', 'awesome-blocks' ) }
						value={ excerptFontSize }
						onChange={ ( value ) => setAttributes( { excerptFontSize: value } ) }
						min={ 12 }
						max={ 30 }
					/>
					<SelectControl
						label={ __( 'Excerpt Font Weight', 'awesome-blocks' ) }
						value={ excerptFontWeight }
						options={ [
							{ label: __( 'Normal',    'awesome-blocks' ), value: '400' },
							{ label: __( 'Medium',    'awesome-blocks' ), value: '500' },
							{ label: __( 'Semi Bold', 'awesome-blocks' ), value: '600' },
							{ label: __( 'Bold',      'awesome-blocks' ), value: '700' },
						] }
						onChange={ ( value ) => setAttributes( { excerptFontWeight: value } ) }
					/>
					<SelectControl
						label={ __( 'Excerpt Font Family', 'awesome-blocks' ) }
						value={ excerptFontFamily }
						options={ GOOGLE_FONTS }
						onChange={ ( value ) => setAttributes( { excerptFontFamily: value } ) }
						help={ __( 'Select a Google Font for the excerpt', 'awesome-blocks' ) }
					/>
					<RangeControl
						label={ __( 'Excerpt Max Characters', 'awesome-blocks' ) }
						value={ excerptMaxChars }
						onChange={ ( value ) => setAttributes( { excerptMaxChars: value } ) }
						min={ 0 }
						max={ 500 }
						help={ __( 'Set 0 to show full excerpt', 'awesome-blocks' ) }
					/>

					{ /* Meta */ }
					<h3 className="meta-style">{ __( 'Meta Style', 'awesome-blocks' ) }</h3>
					<ColorControl
						label={ __( 'Meta Color', 'awesome-blocks' ) }
						value={ metaColor }
						onChange={ ( value ) => setAttributes( { metaColor: value } ) }
						placeholder="#666666"
					/>
					<RangeControl
						label={ __( 'Meta Font Size', 'awesome-blocks' ) }
						value={ metaFontSize }
						onChange={ ( value ) => setAttributes( { metaFontSize: value } ) }
						min={ 10 }
						max={ 24 }
					/>
					<SelectControl
						label={ __( 'Meta Font Weight', 'awesome-blocks' ) }
						value={ metaFontWeight }
						options={ [
							{ label: __( 'Normal',    'awesome-blocks' ), value: '400' },
							{ label: __( 'Medium',    'awesome-blocks' ), value: '500' },
							{ label: __( 'Semi Bold', 'awesome-blocks' ), value: '600' },
							{ label: __( 'Bold',      'awesome-blocks' ), value: '700' },
						] }
						onChange={ ( value ) => setAttributes( { metaFontWeight: value } ) }
					/>
					<SelectControl
						label={ __( 'Meta Font Family', 'awesome-blocks' ) }
						value={ metaFontFamily }
						options={ GOOGLE_FONTS }
						onChange={ ( value ) => setAttributes( { metaFontFamily: value } ) }
						help={ __( 'Select a Google Font for meta info', 'awesome-blocks' ) }
					/>

					{ /* Links */ }
					<h3 className="meta-style">{ __( 'Link Style', 'awesome-blocks' ) }</h3>
					<ColorControl
						label={ __( 'Link Color', 'awesome-blocks' ) }
						value={ linkColor }
						onChange={ ( value ) => setAttributes( { linkColor: value } ) }
						placeholder="#0073aa"
					/>
					<ColorControl
						label={ __( 'Link Hover Color', 'awesome-blocks' ) }
						value={ linkHoverColor }
						onChange={ ( value ) => setAttributes( { linkHoverColor: value } ) }
						placeholder="#005177"
					/>
					<RangeControl
						label={ __( 'Link Font Size', 'awesome-blocks' ) }
						value={ linkFontSize }
						onChange={ ( value ) => setAttributes( { linkFontSize: value } ) }
						min={ 10 }
						max={ 30 }
					/>
					<SelectControl
						label={ __( 'Link Font Weight', 'awesome-blocks' ) }
						value={ linkFontWeight }
						options={ [
							{ label: __( 'Normal',    'awesome-blocks' ), value: '400' },
							{ label: __( 'Medium',    'awesome-blocks' ), value: '500' },
							{ label: __( 'Semi Bold', 'awesome-blocks' ), value: '600' },
							{ label: __( 'Bold',      'awesome-blocks' ), value: '700' },
						] }
						onChange={ ( value ) => setAttributes( { linkFontWeight: value } ) }
					/>
					<SelectControl
						label={ __( 'Link Font Family', 'awesome-blocks' ) }
						value={ linkFontFamily }
						options={ GOOGLE_FONTS }
						onChange={ ( value ) => setAttributes( { linkFontFamily: value } ) }
						help={ __( 'Select a Google Font for links', 'awesome-blocks' ) }
					/>

					{ /* Card */ }
					<h3 className="meta-style">{ __( 'Card Style', 'awesome-blocks' ) }</h3>
					<ColorControl
						label={ __( 'Card Background Color', 'awesome-blocks' ) }
						value={ cardBgColor }
						onChange={ ( value ) => setAttributes( { cardBgColor: value } ) }
						placeholder="#ffffff"
					/>
					<TextControl
						label={ __( 'Card Border', 'awesome-blocks' ) }
						value={ cardBorder }
						onChange={ ( value ) => setAttributes( { cardBorder: value } ) }
						placeholder={ __( 'e.g., 1px solid #ddd', 'awesome-blocks' ) }
						help={ __( 'CSS border property (e.g., 1px solid #ddd)', 'awesome-blocks' ) }
					/>
					<RangeControl
						label={ __( 'Card Border Radius', 'awesome-blocks' ) }
						value={ cardBorderRadius }
						onChange={ ( value ) => setAttributes( { cardBorderRadius: value } ) }
						min={ 0 }
						max={ 50 }
					/>
					<RangeControl
						label={ __( 'Card Padding', 'awesome-blocks' ) }
						value={ cardPadding }
						onChange={ ( value ) => setAttributes( { cardPadding: value } ) }
						min={ 0 }
						max={ 60 }
					/>

					{ /* Thumbnail */ }
					<h3>{ __( 'Thumbnail Style', 'awesome-blocks' ) }</h3>
					<RangeControl
						label={ __( 'Thumbnail Border Radius', 'awesome-blocks' ) }
						value={ thumbnailBorderRadius }
						onChange={ ( value ) => setAttributes( { thumbnailBorderRadius: value } ) }
						min={ 0 }
						max={ 50 }
					/>
					<RangeControl
						label={ __( 'Thumbnail Height (px)', 'awesome-blocks' ) }
						value={ thumbnailHeight }
						onChange={ ( value ) => setAttributes( { thumbnailHeight: value } ) }
						min={ 0 }
						max={ 600 }
						help={ __( 'Set 0 for auto height', 'awesome-blocks' ) }
					/>

					{ /* Layout */ }
					<h3 className="meta-style">{ __( 'Layout', 'awesome-blocks' ) }</h3>
					<RangeControl
						label={ __( 'Gap Between Cards', 'awesome-blocks' ) }
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
						.wp-block-awesome-post-block .ab-post-read-more {
							color: ${ linkColor || '#0073aa' };
							font-size: ${ linkFontSize || 14 }px;
							font-weight: ${ linkFontWeight || '600' };
							font-family: ${ linkFontFamily || 'inherit' };
						}
						.wp-block-awesome-post-block .ab-post-read-more:hover,
						.wp-block-awesome-post-block .ab-post-title a:hover {
							color: ${ linkHoverColor || '#005177' } !important;
						}
					`}
				</style>

				{ null === posts && (
					<div className="ab-loading">
						<Spinner />
						<p>{ __( 'Loading posts…', 'awesome-blocks' ) }</p>
					</div>
				) }

				{ null !== posts && posts.length === 0 && (
					<div className="ab-no-posts">
						<p>{ __( 'No posts found.', 'awesome-blocks' ) }</p>
					</div>
				) }

				{ null !== posts && posts.length > 0 && (
					<ul
						className={ `ab-posts-grid columns-${ columns }` }
						style={ { gap: `${ gap }px` } }
					>
						{ posts.map( ( post ) => {
							const imageUrl = displayThumbnail
								? getFeaturedImageUrl( post, thumbnailSize )
								: null;

							return (
								<li
									key={ post.id }
									className="ab-post-item"
									style={ {
										backgroundColor: cardBgColor,
										border:          cardBorder,
										borderRadius:    `${ cardBorderRadius }px`,
									} }
								>
									{ imageUrl && (
										<div className="ab-post-thumbnail">
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
										className="ab-post-content"
										style={ { padding: `${ cardPadding }px` } }
									>
										{ ( displayDate || displayAuthor ) && (
											<div
												className="ab-post-meta"
												style={ {
													color:      metaColor,
													fontSize:   `${ metaFontSize }px`,
													fontWeight: metaFontWeight,
													fontFamily: metaFontFamily || 'inherit',
												} }
											>
												{ displayDate && (
													<span className="ab-post-date">
														{ new Date( post.date ).toLocaleDateString() }
													</span>
												) }
												{ displayAuthor && (
													<span className="ab-post-author">
														{ __( 'By ', 'awesome-blocks' ) }
														{ post._embedded?.author?.[0]?.name || __( 'Unknown', 'awesome-blocks' ) }
													</span>
												) }
											</div>
										) }

										{ displayTitle && (
											<h3
												className="ab-post-title"
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
													className="ab-post-excerpt"
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
											className="ab-post-read-more"
										>
											{ __( 'Read More →', 'awesome-blocks' ) }
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