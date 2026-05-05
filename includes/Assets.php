<?php

namespace Awesome_Block;

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
        // Only enqueue if awesome slider block is present
        wp_enqueue_style(
            'common-css',
            AWESOME_BLOCK_ASSETS . '/css/common.css',
            array(),
            AWESOME_BLOCK_VERSION
        );

        if (has_block('awesome/awesome-slider') || is_admin()) {
            // Enqueue Slick Slider CSS
            wp_enqueue_style(
                'slick-slider-css',
                AWESOME_BLOCK_ASSETS . '/css/slick.css',
                array(),
                AWESOME_BLOCK_VERSION
            );

            wp_enqueue_style(
                'slick-slider-theme-css',
                AWESOME_BLOCK_ASSETS . '/css/slick-theme.css',
                array(),
                AWESOME_BLOCK_VERSION
            );

            // Enqueue jQuery and Slick Slider JS
            wp_enqueue_script('jquery');
            wp_enqueue_script(
                'slick-slider-js',
                AWESOME_BLOCK_ASSETS . '/js/slick.min.js',
                array('jquery'),
                AWESOME_BLOCK_VERSION,
                true
            );
        }
    }
}
