<?php
/**
 * Plugin Name:       ThemeBlocks
 * Description:       A lightweight collection of beautiful, flexible Gutenberg blocks — including sliders, galleries, timelines, and WooCommerce blocks.
 * Requires at least: 5.9
 * Requires PHP:      7.4
 * Version:           1.0.0
 * Author:            Rejuan Ahamed
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       theme-blocks
 *
 * @package           create-block
 */

defined( 'ABSPATH' ) || exit;

require_once __DIR__ . '/vendor/autoload.php';

/**
 * The main plugin class
 */
final class ThemeBlocks {

    /**
     * Plugin version
     *
     * @var string
     */
    const version = '1.0.0';

    /**
     * Class constructor
     */
    private function __construct() {
        $this->define_constants();
        add_action( 'plugins_loaded', array( $this, 'init_plugin' ) );
    }

    /**
     * Initialize a singleton instance
     *
     * @return \ThemeBlocks
     */
    public static function init() {
        static $instance = false;

        if ( ! $instance ) {
            $instance = new self();
        }

        return $instance;
    }

    /**
     * Define the required plugin constants
     *
     * @return void
     */
    public function define_constants() {
        define( 'THEMEBLOCKS_VERSION', self::version );
        define( 'THEMEBLOCKS_FILE', __FILE__ );
        define( 'THEMEBLOCKS_PLUGIN_PATH', plugin_dir_path( __FILE__ ) );
        define( 'THEMEBLOCKS_URL', plugins_url( '', THEMEBLOCKS_FILE ) );
        define( 'THEMEBLOCKS_ASSETS', THEMEBLOCKS_URL . '/assets' );
    }

    /**
     * Initialize the plugin
     *
     * @return void
     */
    public function init_plugin() {
        new ThemeBlocks\Assets();
        new ThemeBlocks\Register_Blocks();
        new ThemeBlocks\ThemeBlocks_i18n();
        new ThemeBlocks\Product_REST_API();

        // Initialize Fragment Cache hooks
        ThemeBlocks\Fragment_Cache::init_hooks();
    }
}

// Kick-off the plugin
ThemeBlocks::init();
