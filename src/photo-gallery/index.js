/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';

/**
 * Internal Dependencies
 */
import metadata from './block.json';
import edit from './edit';
import save from './save';

/**
 * Styles
 */
import './style.scss';
import './editor.scss';

/**
 * Register Block
 */
registerBlockType( metadata.name, {
    ...metadata,
    title: __('Photo Gallery', 'zepblocks' ),
    description: __('Beautiful responsive photo gallery with lightbox popup and navigation', 'zepblocks' ),
    edit,
    save,
});
