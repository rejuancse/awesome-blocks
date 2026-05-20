/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Google Fonts options list.
 *
 * This constant can be reused across different blocks.
 *
 * @type {Array.<{label: string, value: string}>}
 */
export const GOOGLE_FONTS = [
	{ label: __( 'Default', 'awesome-blocks' ), value: '' },
	{ label: 'Roboto',       value: "'Roboto', sans-serif" },
	{ label: 'Open Sans',    value: "'Open Sans', sans-serif" },
	{ label: 'Lato',         value: "'Lato', sans-serif" },
	{ label: 'Montserrat',   value: "'Montserrat', sans-serif" },
	{ label: 'Oswald',       value: "'Oswald', sans-serif" },
	{ label: 'Raleway',      value: "'Raleway', sans-serif" },
	{ label: 'Poppins',      value: "'Poppins', sans-serif" },
	{ label: 'Roboto Slab',  value: "'Roboto Slab', serif" },
	{ label: 'Merriweather', value: "'Merriweather', serif" },
	{ label: 'Playfair Display', value: "'Playfair Display', serif" },
	{ label: 'Lora',         value: "'Lora', serif" },
	{ label: 'Source Sans Pro', value: "'Source Sans Pro', sans-serif" },
	{ label: 'Nunito',       value: "'Nunito', sans-serif" },
	{ label: 'Ubuntu',       value: "'Ubuntu', sans-serif" },
	{ label: 'PT Sans',      value: "'PT Sans', sans-serif" },
	{ label: 'Work Sans',    value: "'Work Sans', sans-serif" },
	{ label: 'Rubik',        value: "'Rubik', sans-serif" },
	{ label: 'Noto Sans',    value: "'Noto Sans', sans-serif" },
];

/**
 * Font weight options.
 *
 * @type {Array.<{label: string, value: string}>}
 */
export const FONT_WEIGHTS = [
	{ label: 'Normal',    value: '400' },
	{ label: 'Medium',    value: '500' },
	{ label: 'Semi Bold', value: '600' },
	{ label: 'Bold',      value: '700' },
];

/**
 * Loads a Google Font dynamically into the document <head>.
 *
 * @param {string} fontFamily CSS font-family string, e.g. "'Roboto', sans-serif".
 * @return {void}
 */
export function loadGoogleFont( fontFamily ) {
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
