<?php

namespace ZepBlocks;

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
        // Only enqueue if zepblock slider block is present
        wp_enqueue_style(
            'common-css',
            ZEPBLOCKS_ASSETS . '/css/common.css',
            array(),
            ZEPBLOCKS_VERSION
        );

        if (has_block('zepblock/zepblock-slider') || is_admin()) {
            // Enqueue Slick Slider CSS
            wp_enqueue_style(
                'slick-slider-css',
                ZEPBLOCKS_ASSETS . '/css/slick.css',
                array(),
                ZEPBLOCKS_VERSION
            );

            wp_enqueue_style(
                'slick-slider-css',
                ZEPBLOCKS_ASSETS . '/css/slick-theme.css',
                array(),
                ZEPBLOCKS_VERSION
            );

            // Enqueue jQuery and Slick Slider JS
            wp_enqueue_script('jquery');
            wp_enqueue_script(
                'slick-slider-js',
                ZEPBLOCKS_ASSETS . '/js/slick.min.js',
                array('jquery'),
                ZEPBLOCKS_VERSION,
                true
            );
        }
    }
}
