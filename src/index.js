/**
 * WordPress Dependencies
 */
import { registerBlockType } from '@wordpress/blocks';

/**
 * Internal Dependencies
 */
import * as postBlock from './post-block';

/**
 * Register Blocks
 */
export default function registerBlocks() {
    registerBlockType('awesome/post-block', postBlock);
}
