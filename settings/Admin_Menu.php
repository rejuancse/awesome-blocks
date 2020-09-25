<?php
namespace AWEGB\settings;

defined( 'ABSPATH' ) || exit;

class Admin_Menu {

    public function __construct() {
        add_action('admin_menu',   array($this, 'register_menu_page' ));
        add_action('admin_init',   array($this, 'save_menu_settings' ));
    }

    /**
     * AwesomeBlock Menu Option Page
     */
    public function register_menu_page(){
        add_menu_page( 
            'AwesomeBlock',
            'AwesomeBlock',
            'manage_options',
            'awesome-gutenberg-blocks',
            'dashicons-admin-multisite', 
            null 
        );

        
        
        add_submenu_page(
            'awesome-gutenberg-blocks',
            __( 'Settings', 'awesome-gutenberg-blocks' ),
            __( 'Settings', 'awesome-gutenberg-blocks' ),
            'manage_options',
            'wpcf-settings',
            array( $this, 'wpcf_menu_page' )
        );
    }


    /**
     * Display a custom menu page
     */
    public function wpcf_menu_page(){
        // Settings Tab With slug and Display name
    }


    /**
     * Add menu settings action
     */
    public function save_menu_settings() {
        
        
    }

}