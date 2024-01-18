<?php
/**
 * Plugin Name:       Awesome Blocks
 * Description:       Example block scaffolded with Create Block tool.
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            Rejuan Ahamed
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       awesome-blocks
 *
 * @package           create-block
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function awesome_blocks_awesome_blocks_block_init() {
	$blocks = array(
		'photo-gallery',
		'card-block'
	);

	foreach ($blocks as $block) {
		register_block_type( __DIR__ . "/build/{$block}" );
	}
}
add_action( 'init', 'awesome_blocks_awesome_blocks_block_init' );
