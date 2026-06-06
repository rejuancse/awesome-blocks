<?php
/**
 * Plugin Name:       ZepBlocks
 * Description:       ZepBlocks adds beautiful Gutenberg blocks, patterns, and templates to help you create stunning WordPress pages easily—no page builder needed.
 * Requires at least: 5.9
 * Requires PHP:      7.4
 * Version:           1.0.1
 * Author:            Rejuan Ahamed
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       zepblocks
 *
 * @package           create-block
 */

defined( 'ABSPATH' ) || exit;

require_once __DIR__ . '/vendor/autoload.php';

/**
 * The main plugin class
 */
final class ZepBlocks {

    /**
     * Plugin version
     *
     * @var string
     */
    const version = '1.0.1';

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
     * @return \ZepBlocks
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
        define( 'ZEPBLOCKS_VERSION', self::version );
        define( 'ZEPBLOCKS_FILE', __FILE__ );
        define( 'ZEPBLOCKS_PLUGIN_PATH', plugin_dir_path( __FILE__ ) );
        define( 'ZEPBLOCKS_URL', plugins_url( '', ZEPBLOCKS_FILE ) );
        define( 'ZEPBLOCKS_ASSETS', ZEPBLOCKS_URL . '/assets' );
    }

    /**
     * Initialize the plugin
     *
     * @return void
     */
    public function init_plugin() {
        new ZepBlocks\Assets();
        new ZepBlocks\Register_Blocks();
        new ZepBlocks\ZepBlocks_i18n();
        new ZepBlocks\Product_REST_API();

        // Initialize Fragment Cache hooks
        ZepBlocks\Fragment_Cache::init_hooks();
    }
}

// Kick-off the plugin
ZepBlocks::init();
