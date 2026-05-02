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
        $this->register_admin_assets();
    }

    /**
     * Register admin assets
     */
    function register_admin_assets() {
        add_action( 'wp_enqueue_scripts', array( $this, 'frontend_script' ) );
    }

    /**
     * Registering necessary js and css
     * @ Frontend
     */
    public function frontend_script(){
        wp_enqueue_style( 'awesome-blocks-front', AB_PLUGIN_URL .'/assets/dist/css/notify-style.css', false, AWESOME_BLOCK_VERSION );
    }
}
