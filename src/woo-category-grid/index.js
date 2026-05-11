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
    title: __('WooCommerce Category Grid', 'awesome-blocks'),
    description: __('Display WooCommerce product categories in a beautiful grid layout', 'awesome-blocks'),
    edit,
    save: () => null, // Dynamic block, rendered via PHP
});
