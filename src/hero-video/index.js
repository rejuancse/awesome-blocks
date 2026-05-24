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
 * Styles - WordPress webpack will process these
 */
import './style.scss';
import './editor.scss';

/**
 * Register Block
 */
registerBlockType( metadata.name, {
    ...metadata,
    title: __('TBlock Hero Video', 'theme-blocks' ),
    description: __('Display a hero video with overlay content', 'theme-blocks' ),
    edit,
    save,
});
