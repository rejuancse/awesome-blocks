<?php
/**
 * Plugin Name:       Awesome Blocks
 * Description:       Collection of custom Gutenberg blocks.
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

require_once __DIR__ . '/vendor/autoload.php';

/**
 * The main plugin class
 */
final class Awesome_Block {

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
     * @return \Awesome_Block
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
        define( 'AWESOME_BLOCK_VERSION', self::version );
        define( 'AWESOME_BLOCK_PLUGIN_PATH', plugin_dir_path( __FILE__ ) );
    }

    /**
     * Initialize the plugin
     *
     * @return void
     */
    public function init_plugin() {
        new Awesome_Block\Awesome_Block_i18n();
    }
}

/**
 * Initialize the main plugin
 */
function awesome_block_list() {
    return Awesome_Block::init();
}

// Kick-off the plugin
awesome_block_list();
