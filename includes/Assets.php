<?php

namespace ThemeBlocks;

defined( 'ABSPATH' ) || exit;

/**
 * The admin class
 */
class Assets {

    /**
     * Initialize the class
     */
    function __construct() {
        add_action('wp_enqueue_scripts', array($this, 'register_admin_assets'));
        add_action('enqueue_block_assets', array($this, 'register_admin_assets'));
    }

    /**
     * Register admin assets
     */
    function register_admin_assets() {
        // Only enqueue if tblock slider block is present
        wp_enqueue_style(
            'common-css',
            THEMEBLOCKS_ASSETS . '/css/common.css',
            array(),
            THEMEBLOCKS_VERSION
        );

        if (has_block('tblock/tblock-slider') || is_admin()) {
            // Enqueue Slick Slider CSS
            wp_enqueue_style(
                'slick-slider-css',
                THEMEBLOCKS_ASSETS . '/css/slick.css',
                array(),
                THEMEBLOCKS_VERSION
            );

            wp_enqueue_style(
                'slick-slider-theme-css',
                THEMEBLOCKS_ASSETS . '/css/slick-theme.css',
                array(),
                THEMEBLOCKS_VERSION
            );

            // Enqueue jQuery and Slick Slider JS
            wp_enqueue_script('jquery');
            wp_enqueue_script(
                'slick-slider-js',
                THEMEBLOCKS_ASSETS . '/js/slick.min.js',
                array('jquery'),
                THEMEBLOCKS_VERSION,
                true
            );
        }
    }
}
