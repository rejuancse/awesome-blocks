<?php
namespace AWEGB;

defined( 'ABSPATH' ) || exit;

final class AwesomeBlock {

	protected static $_instance = null;

	public static function instance() {
		if ( is_null( self::$_instance ) ) {
			self::$_instance = new self();
		}
		return self::$_instance;
	}

	function __construct() {
		$this->includes_core();
		do_action('wpcf_before_load');
		do_action('wpcf_after_load');
	}

	# Include Core
	public function includes_core() {
		require_once AWEGB_DIR_PATH.'settings/Admin_Menu.php';
		require_once AWEGB_DIR_PATH.'includes/Gutenberg.php';
		new settings\Admin_Menu();
		new \AWEGB\Gutenberg();
	}	

}