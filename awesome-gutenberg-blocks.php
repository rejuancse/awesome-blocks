<?php
/*
* Plugin Name:       Awesome Gutenberg Blocks
* Plugin URI:        https://demo.rejuandev.live/awesome-gutenberg-blocks
* Description:       The Ultimate Fundraising and Backer Plugin for WordPress.
* Version:           1.0.0
* Author:            Rejuan Ahamed
* Author URI:        https://rejuandev.live
* Text Domain:       awesome-gutenberg-blocks
* Requires at least: 4.5
* Tested up to:      5.4
* License:           GPL-2.0+
* License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
* Domain Path:       /languages
*/

defined( 'ABSPATH' ) || exit;

/**
* Support for Multi Network Site
*/
if( !function_exists('is_plugin_active_for_network') ){
    require_once(ABSPATH . '/wp-admin/includes/plugin.php');
}

/**
* @Type
* @Version
* @Directory URL
* @Directory Path
* @Plugin Base Name
*/ 
define('AWEGB_FILE', __FILE__);
define('AWEGB_VERSION', '1.0.0');
define('AWEGB_DIR_URL', plugin_dir_url( AWEGB_FILE ));
define('AWEGB_DIR_PATH', plugin_dir_path( AWEGB_FILE ));
define('AWEGB_BASENAME', plugin_basename( AWEGB_FILE ));
/**
* Load Text Domain Language
*/
add_action('init', 'wpcf_language_load');
function wpcf_language_load(){
    load_plugin_textdomain('awesome-gutenberg-blocks', false, basename(dirname( AWEGB_FILE )).'/languages/');
}

if (!class_exists( 'AwesomeBlock' )) {
    require_once AWEGB_DIR_PATH . 'includes/AwesomeBlock.php';
    new \AWEGB\AwesomeBlock();
}

