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
            'awesomeblock',
            'Awesome Block',
            'manage_options',
            'wp-awesome-blocks',
            'dashicons-admin-multisite', 
            null 
        );

        
        
        add_submenu_page(
            'wp-awesome-blocks',
            __( 'Settings', 'awesome-blocks' ),
            __( 'Settings', 'awesome-blocks' ),
            'manage_options',
            'awesome-block-settings',
            array( $this, 'awesome_block_menu_page' )
        );
    }


    /**
     * Display a custom menu page
     */
    public function awesome_block_menu_page(){
        // Settings Tab With slug and Display name
    }


    /**
     * Add menu settings action
     */
    public function save_menu_settings() {
        
        
    }

}