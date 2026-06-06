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
	TextControl,
} from '@wordpress/components';

/**
 * Default attribute values.
 *
 * @type {Object}
 */
const DEFAULTS = {
	breakingNewsTitle: 'Breaking News',
	postNumber: 5,
	postCat: 'allpost',
	postOrderBy: 'DESC',
	animationSpeed: 30,
	titleColor: '#ffffff',
	titleBgColor: '#ff0000',
	contentBgColor: '#f5f5f5',
	linkColor: '#333333',
	linkHoverColor: '#0073aa',
	fontSize: 16,
	padding: 15,
	borderRadius: 0,
};

/**
 * Edit component for the Breaking News Ticker block.
 *
 * @param {Object}   props
 * @param {Object}   props.attributes    Block attributes.
 * @param {Function} props.setAttributes Attribute updater.
 * @return {JSX.Element}
 */
export default function Edit( { attributes, setAttributes } ) {
	const {
		breakingNewsTitle = DEFAULTS.breakingNewsTitle,
		postNumber = DEFAULTS.postNumber,
		postCat = DEFAULTS.postCat,
		postOrderBy = DEFAULTS.postOrderBy,
		animationSpeed = DEFAULTS.animationSpeed,
		titleColor = DEFAULTS.titleColor,
		titleBgColor = DEFAULTS.titleBgColor,
		contentBgColor = DEFAULTS.contentBgColor,
		linkColor = DEFAULTS.linkColor,
		linkHoverColor = DEFAULTS.linkHoverColor,
		fontSize = DEFAULTS.fontSize,
		padding = DEFAULTS.padding,
		borderRadius = DEFAULTS.borderRadius,
	} = attributes;

	// Fetch categories
	const categories = useSelect( ( select ) => {
		return select( 'core' ).getEntityRecords( 'taxonomy', 'category', { per_page: -1 } );
	}, [] );

	// Fetch posts for preview
	const { posts, hasPosts } = useSelect( ( select ) => {
		const query = {
			post_status: 'publish',
			per_page: postNumber,
			order: postOrderBy,
			orderby: 'date',
			_embed: true,
		};

		// If specific category is selected, find the category ID
		if ( postCat !== 'allpost' && postCat && categories && categories.length > 0 ) {
			const selectedCategory = categories.find( ( cat ) => cat.slug === postCat );
			if ( selectedCategory ) {
				query.categories = [ selectedCategory.id ];
			}
		}

		const postsList = select( 'core' ).getEntityRecords( 'postType', 'post', query );

		// Debug logging
		console.log( 'Breaking News Debug:', {
			query,
			postCat,
			categories: categories?.length,
			postsList,
			hasPosts: postsList && postsList.length > 0,
		} );

		return {
			posts: postsList || [],
			hasPosts: postsList && postsList.length > 0,
		};
	}, [ postNumber, postCat, postOrderBy, categories ] );

	const blockProps = useBlockProps();

	return (
		<div { ...blockProps }>
			<InspectorControls>
				<PanelBody title={ __( 'General Settings', 'zepblocks' ) } initialOpen={ true }>
					<TextControl
						label={ __( 'Breaking News Title', 'zepblocks' ) }
						value={ breakingNewsTitle }
						onChange={ ( value ) => setAttributes( { breakingNewsTitle: value } ) }
						help={ __( 'Leave empty to hide the title section', 'zepblocks' ) }
					/>

					<RangeControl
						label={ __( 'Number of Posts', 'zepblocks' ) }
						value={ postNumber }
						onChange={ ( value ) => setAttributes( { postNumber: value } ) }
						min={ 1 }
						max={ 20 }
					/>

					{ categories && categories.length > 0 && (
						<SelectControl
							label={ __( 'Category', 'zepblocks' ) }
							value={ postCat }
							options={ [
								{ label: __( 'All Posts', 'zepblocks' ), value: 'allpost' },
								...categories.map( ( cat ) => ( {
									label: cat.name,
									value: cat.slug,
								} ) ),
							] }
							onChange={ ( value ) => setAttributes( { postCat: value } ) }
						/>
					) }

					<SelectControl
						label={ __( 'Order', 'zepblocks' ) }
						value={ postOrderBy }
						options={ [
							{ label: __( 'Descending (Newest First)', 'zepblocks' ), value: 'DESC' },
							{ label: __( 'Ascending (Oldest First)', 'zepblocks' ), value: 'ASC' },
						] }
						onChange={ ( value ) => setAttributes( { postOrderBy: value } ) }
					/>

					<RangeControl
						label={ __( 'Animation Speed (seconds)', 'zepblocks' ) }
						value={ animationSpeed }
						onChange={ ( value ) => setAttributes( { animationSpeed: value } ) }
						min={ 10 }
						max={ 120 }
						help={ __( 'Higher values make the ticker slower', 'zepblocks' ) }
					/>
				</PanelBody>

				<PanelBody title={ __( 'Style Settings', 'zepblocks' ) }>
					<div style={ { marginBottom: '15px' } }>
						<label style={ { display: 'block', marginBottom: '5px', fontWeight: '500' } }>
							{ __( 'Title Color', 'zepblocks' ) }
						</label>
						<input
							type="color"
							value={ titleColor }
							onChange={ ( e ) => setAttributes( { titleColor: e.target.value } ) }
							style={ { width: '100%', height: '40px', border: '1px solid #ddd', borderRadius: '4px', cursor: 'pointer' } }
						/>
					</div>

					<div style={ { marginBottom: '15px' } }>
						<label style={ { display: 'block', marginBottom: '5px', fontWeight: '500' } }>
							{ __( 'Title Background Color', 'zepblocks' ) }
						</label>
						<input
							type="color"
							value={ titleBgColor }
							onChange={ ( e ) => setAttributes( { titleBgColor: e.target.value } ) }
							style={ { width: '100%', height: '40px', border: '1px solid #ddd', borderRadius: '4px', cursor: 'pointer' } }
						/>
					</div>

					<div style={ { marginBottom: '15px' } }>
						<label style={ { display: 'block', marginBottom: '5px', fontWeight: '500' } }>
							{ __( 'Content Background Color', 'zepblocks' ) }
						</label>
						<input
							type="color"
							value={ contentBgColor }
							onChange={ ( e ) => setAttributes( { contentBgColor: e.target.value } ) }
							style={ { width: '100%', height: '40px', border: '1px solid #ddd', borderRadius: '4px', cursor: 'pointer' } }
						/>
					</div>

					<div style={ { marginBottom: '15px' } }>
						<label style={ { display: 'block', marginBottom: '5px', fontWeight: '500' } }>
							{ __( 'Link Color', 'zepblocks' ) }
						</label>
						<input
							type="color"
							value={ linkColor }
							onChange={ ( e ) => setAttributes( { linkColor: e.target.value } ) }
							style={ { width: '100%', height: '40px', border: '1px solid #ddd', borderRadius: '4px', cursor: 'pointer' } }
						/>
					</div>

					<div style={ { marginBottom: '15px' } }>
						<label style={ { display: 'block', marginBottom: '5px', fontWeight: '500' } }>
							{ __( 'Link Hover Color', 'zepblocks' ) }
						</label>
						<input
							type="color"
							value={ linkHoverColor }
							onChange={ ( e ) => setAttributes( { linkHoverColor: e.target.value } ) }
							style={ { width: '100%', height: '40px', border: '1px solid #ddd', borderRadius: '4px', cursor: 'pointer' } }
						/>
					</div>

					<RangeControl
						label={ __( 'Font Size (px)', 'zepblocks' ) }
						value={ fontSize }
						onChange={ ( value ) => setAttributes( { fontSize: value } ) }
						min={ 12 }
						max={ 32 }
					/>

					<RangeControl
						label={ __( 'Padding (px)', 'zepblocks' ) }
						value={ padding }
						onChange={ ( value ) => setAttributes( { padding: value } ) }
						min={ 0 }
						max={ 50 }
					/>

					<RangeControl
						label={ __( 'Border Radius (px)', 'zepblocks' ) }
						value={ borderRadius }
						onChange={ ( value ) => setAttributes( { borderRadius: value } ) }
						min={ 0 }
						max={ 50 }
					/>
				</PanelBody>
			</InspectorControls>

			{/* Editor Preview */}
			<div
				className="breaking-news-ticker"
				style={ {
					display: 'flex',
					alignItems: 'center',
					backgroundColor: contentBgColor,
					borderRadius: `${ borderRadius }px`,
					overflow: 'hidden',
					border: '1px solid #e0e0e0',
					boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
				} }
			>
				{ breakingNewsTitle && (
					<div
						className="ticker-heading"
						style={ {
							display: 'flex',
							alignItems: 'center',
							backgroundColor: titleBgColor,
							color: titleColor,
							padding: `${ padding }px 20px`,
							fontWeight: 'bold',
							fontSize: '14px',
							textTransform: 'uppercase',
							whiteSpace: 'nowrap',
							position: 'relative',
							zIndex: '10',
						} }
					>
						{ breakingNewsTitle }
						<span
							style={ {
								position: 'absolute',
								right: '-10px',
								top: '50%',
								transform: 'translateY(-50%)',
								width: '0',
								height: '0',
								borderTop: '10px solid transparent',
								borderBottom: '10px solid transparent',
								borderLeft: `10px solid ${ titleBgColor }`,
							} }
						/>
					</div>
				) }

				<div
					className="ticker-container"
					style={ {
						flex: '1',
						overflow: 'hidden',
						position: 'relative',
						padding: `${ padding - 5 }px 0`,
					} }
				>
					{/* Gradient fade effects */}
					<div
						style={ {
							position: 'absolute',
							left: '0',
							top: '0',
							bottom: '0',
							width: '50px',
							background: `linear-gradient(to right, ${ contentBgColor }, transparent)`,
							zIndex: '5',
							pointerEvents: 'none',
						} }
					/>
					<div
						style={ {
							position: 'absolute',
							right: '0',
							top: '0',
							bottom: '0',
							width: '50px',
							background: `linear-gradient(to left, ${ contentBgColor }, transparent)`,
							zIndex: '5',
							pointerEvents: 'none',
						} }
					/>

					<div
						className="ticker-content"
						style={ {
							display: 'flex',
							animation: `ticker-scroll ${ animationSpeed }s linear infinite`,
							whiteSpace: 'nowrap',
						} }
						onMouseEnter={ ( e ) => {
							e.target.style.animationPlayState = 'paused';
						} }
						onMouseLeave={ ( e ) => {
							e.target.style.animationPlayState = 'running';
						} }
					>
						{ hasPosts ? (
							posts.map( ( post ) => (
								<div
									key={ post.id }
									className="ticker-item"
									style={ {
										display: 'flex',
										alignItems: 'center',
										padding: '0 20px',
										whiteSpace: 'nowrap',
									} }
								>
									<span
										style={ {
											width: '8px',
											height: '8px',
											backgroundColor: titleBgColor,
											borderRadius: '50%',
											marginRight: '10px',
											flexShrink: '0',
										} }
									/>
									<a
										href={ post.link }
										style={ {
											color: linkColor,
											fontSize: `${ fontSize }px`,
											textDecoration: 'none',
											transition: 'color 0.2s ease',
										} }
										onMouseEnter={ ( e ) => {
											e.target.style.color = linkHoverColor;
											e.target.style.textDecoration = 'underline';
										} }
										onMouseLeave={ ( e ) => {
											e.target.style.color = linkColor;
											e.target.style.textDecoration = 'none';
										} }
									>
										{ post.title.rendered }
									</a>
								</div>
							) )
						) : (
							<div
								style={ {
									padding: '0 20px',
									color: '#999',
									fontSize: `${ fontSize }px`,
								} }
							>
								{ __( 'No posts found', 'zepblocks' ) }
							</div>
						) }
					</div>
				</div>
			</div>

			<style>
				{`
					@keyframes ticker-scroll {
						0% {
							transform: translateX(100%);
						}
						100% {
							transform: translateX(-100%);
						}
					}

					/* Pause animation on hover */
					.ticker-content:hover {
						animation-play-state: paused;
					}
				`}
			</style>
		</div>
	);
}
