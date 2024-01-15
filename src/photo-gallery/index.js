const { __ } = wp.i18n;
import { registerBlockType } from '@wordpress/blocks';

import './style.scss';

/**
 * Internal dependencies
 */
import Edit from './edit';
import save from './save';
import metadata from './block.json';

registerBlockType( metadata.name, {
	attributes: { //Attributes
		images : { type: 'array'},
		columns: { type: 'string', default: '3' },
		padding: { type: 'string', default: '15px' },
		gallery_style: { type: 'string', default: 'style1' },
	},

	/**
	 * @see ./edit.js
	 */
	edit: Edit,

	/**
	 * @see ./save.js
	 */
	save,
} );
