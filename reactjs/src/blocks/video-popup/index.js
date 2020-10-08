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
		// images : { type: 'array'},
	},

 
	edit({ attributes, className, setAttributes }) {
        //JSX to return
        return (
            <div>
				Video Popup blocks
            </div>
        );
	},
	
	save({attributes}) {
		//Destructuring the images array attribute
		const { } = attributes;
	
		
		//JSX to return
		return (
			<div>
				Save view
			</div>	
		);

	},
	
} );
