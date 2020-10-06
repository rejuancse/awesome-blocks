const { __ } = wp.i18n
const { apiFetch } = wp;
const { withSelect } = wp.data
const { withState } = wp.compose;
const { registerBlockType } = wp.blocks; 
const { InspectorControls, MediaUpload } = wp.editor
const { Component, Fragment } = wp.element;
const { dateI18n, format, __experimentalGetSettings } = wp.date;
const { PanelBody, Button, Spinner, SelectControl, RangeControl, ColorPalette, TextControl } = wp.components;


//  Import CSS.
import './editor.scss';
import './style.scss'

registerBlockType( 'awesome-blocks/awesomevideopopup', {
	title: __( 'Video Popup' ),
	icon: 'format-video',
	category: 'awesome-blocks',
	attributes: { //Attributes
		images : { type: 'array'},
		columns: { type: 'string', default: '3' }, 
		padding: { type: 'string', default: '15px' }, 
		gallery_style: { type: 'string', default: 'style1' }, 
	},

 
	edit({ attributes, className, setAttributes }) {

        //Destructuring the images array attribute
		const {images = [], columns, padding, gallery_style} = attributes;

		// Gallery Padding 
        const GalleryContentControl = withState( {
            padding: padding,
        } )( ( { padding, setState } ) => ( 
            <TextControl
                label="Padding"
                value={ padding }
                onChange={(value) => { setAttributes({ padding: value }) }}
            />
        ) );

        //JSX to return
        return (
            <div>
				<InspectorControls key="inspector">
                    <PanelBody title={__('Video Popup')}>
						<GalleryContentControl />
                    </PanelBody>
                </InspectorControls>

                <br/>
                <MediaUpload
					onSelect={(media) => {setAttributes({images: [...images, ...media]});}}
					type="image"
					multiple={true}
					value={images}
					render={({open}) => (
						<Button className="select-images-button is-button is-default is-large" onClick={open}>
							Add images
						</Button>
					)}
				/>
            </div>
        );
	},
	
	save({attributes}) {
		//Destructuring the images array attribute
		const { images = [], columns, padding } = attributes;
	
		// Displays the images
		const displayImages = (images) => {
			return (
				images.map( (image,index) => {

					const paddingStyle = {
						padding: padding
					}

					
						return (
							<div className={`col-${columns} gallery-item`} style={paddingStyle}>
								<a href={image.url} className="cloud-zoom">
									<img
										className='gallery-item'
										key={images.id}
										src={image.url}
										data-slide-no={index}
										data-caption={image.caption[0]}
										alt={image.alt}
									/>
								</a>
							</div>
						)
					
					
					
					
				})
			)
		}
	
		//JSX to return
		return (
			<div  data-total-slides={images.length}>{ displayImages(images) }</div>	
		);

	},
	
} );
