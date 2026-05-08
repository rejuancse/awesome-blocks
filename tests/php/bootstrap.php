<?php
/**
 * PHPUnit Bootstrap File
 *
 * This file sets up the WordPress testing environment for PHPUnit tests.
 */

// Define test constants
define( 'TESTS_PLUGIN_DIR', dirname( dirname( __DIR__ ) ) );
define( 'TESTS_PLUGIN_FILE', TESTS_PLUGIN_DIR . '/awesome-blocks.php' );

// Check if we're running in a WordPress test environment
if ( ! defined( 'WP_TESTS_DIR' ) ) {
    // If WP_TESTS_DIR is not defined, we'll use a mock setup for basic testing
    define( 'WP_TESTS_DIR', false );
}

// Load Composer autoloader
require_once dirname( dirname( __DIR__ ) ) . '/vendor/autoload.php';

// If WordPress test environment is available, load it
if ( WP_TESTS_DIR && file_exists( WP_TESTS_DIR . '/includes/functions.php' ) ) {
    // Manually load the plugin being tested
    tests_add_filter( 'muplugins_loaded', function () {
        require TESTS_PLUGIN_FILE;
    } );

    // Start up the WP testing environment
    require WP_TESTS_DIR . '/includes/functions.php';

    function _load_theme() {
        // Use a default theme for testing
        $current_theme = 'default';
        add_filter( 'pre_option_template', function () use ( $current_theme ) {
            return $current_theme;
        } );
        add_filter( 'pre_option_stylesheet', function () use ( $current_theme ) {
            return $current_theme;
        } );
    }

    tests_add_filter( 'setup_theme', '_load_theme' );

    // Include the main test bootstrap
    require WP_TESTS_DIR . '/includes/bootstrap.php';
} else {
    // If no WordPress test environment, set up basic mocks
    echo "Warning: WordPress test environment not found. Running with basic setup.\n";

    // Define basic WordPress constants if not already defined
    if ( ! defined( 'ABSPATH' ) ) {
        define( 'ABSPATH', TESTS_PLUGIN_DIR . '/' );
    }

    if ( ! defined( 'WP_PLUGIN_DIR' ) ) {
        define( 'WP_PLUGIN_DIR', TESTS_PLUGIN_DIR );
    }

    // Load basic WordPress functions stubs if they don't exist
    if ( ! function_exists( 'add_action' ) ) {
        require_once __DIR__ . '/stubs/wordpress-stubs.php';
    }
}

// Activate the plugin
if ( ! defined( 'WP_TESTS_DIR' ) || ! WP_TESTS_DIR ) {
    require TESTS_PLUGIN_FILE;
}
