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
// import './editor.scss';
// import './style.scss'

registerBlockType( 'awesome-blocks/awesomevideopopup', {
	title: __( 'Video Popup' ),
	icon: 'format-video',
	category: 'awesome-blocks',
	attributes: { //Attributes
		url: {type: 'string', default: '#'}
	},

 
	edit({ attributes, setAttributes }) {

		const { url } = attributes;

		const VideoControl = withState( {
			className: url,
		} )( ( { className, setState } ) => ( 
			<TextControl
				label="Additional CSS Class"
				value={ className }
				onChange={ ( className ) => setState( { className } ) }
			/>
		) );

        // JSX to return
        return (
            <div>
				<InspectorControls key="inspector">
					<PanelBody title={__('Video')} initialOpen={false}>
						<VideoControl />
					</PanelBody>
                </InspectorControls>

                
                <div className={`awesome-block-videopopup`} >
					<a className="awesome-video-popup" ref="" href={ url }>
						<span className="dashicons dashicons-video-alt3"></span>
					</a>
				</div>
            </div>
        );
	},
	
	save({attributes}) {
		//Destructuring the images array attribute
		const { url } = attributes;
	
	
	
		//JSX to return
		return (
			<div>AA</div>	
		);

	},
	
} );
