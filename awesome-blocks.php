<?php
/**
 * Plugin Name:       Awesome Blocks
 * Description:       The ultimate Gutenberg block plugin you'll ever require.
 * Version:           1.0.1
 * Requires at least: 5.6
 * Requires PHP:      7.4
 * Author:            Rejuan Ahamed
 * License:           GPLv2 or later
 * License URI:       https://www.gnu.org/licenses/gpl.html
 * Text Domain:       awesome-blocks
 * Domain Path:       /languages
 *
 * @package awesomeblocks
 */

defined( 'ABSPATH' ) || exit;

/**
 * Include and instantiate Block classes
 */
require_once __DIR__ . '/inc/class-block-x.php';
require_once __DIR__ . '/inc/class-block-y.php';
require_once __DIR__ . '/inc/class-block-w.php';
require_once __DIR__ . '/inc/class-block-z.php';

use ABlocks\Inc\BlockX;
use ABlocks\Inc\BlockY;
use ABlocks\Inc\BlockW;
use ABlocks\Inc\BlockZ;

new BlockX();
new BlockY();
new BlockW();
new BlockZ();
