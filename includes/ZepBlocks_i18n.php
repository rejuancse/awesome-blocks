<?php

namespace ZepBlocks;

defined( 'ABSPATH' ) || exit;

/**
 * Support language
 *
 * @since    1.0.0
 */
class ZepBlocks_i18n {

	/**
	 * Call language method
	 *
	 * @since	1.0.0
	 * @access	public
	 * @param	none
	 * @return	void
	 */
	public function __construct() {
		add_action( 'plugins_loaded', array( $this, 'load_plugin_textdomain' ) );
	}

	/**
	 * Load language file from directory
	 *
	 * @since	1.0.0
	 * @access	public
	 * @param	none
	 * @return	void
	 */
	public function load_plugin_textdomain() {
		load_plugin_textdomain( 'zepblock-block', false, dirname( plugin_basename( __FILE__ ) ) . '/languages' );
	}
}
