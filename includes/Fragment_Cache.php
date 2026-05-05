<?php
/**
 * Fragment Cache Helper Class
 *
 * @package Awesome_Blocks
 */

namespace Awesome_Block;

defined( 'ABSPATH' ) || exit;

class Fragment_Cache {

	const PREFIX      = 'ab_fragment_';
	const EXPIRATION  = 3600; // 1 Hour

	/**
	 * Get or cache fragment
	 * Uses closure callback to generate content if cache miss
	 *
	 * @param string   $key        Cache key.
	 * @param callable $callback   Callback function to generate content.
	 * @param int      $expiration Expiration time in seconds.
	 * @return mixed Cached or generated content.
	 */
	public static function remember( $key, callable $callback, $expiration = self::EXPIRATION ) {
		$cached = get_transient( self::PREFIX . $key );

		if ( false !== $cached ) {
			return $cached;
		}

		$content = $callback();
		set_transient( self::PREFIX . $key, $content, $expiration );

		return $content;
	}

	/**
	 * Cache block output with automatic key generation
	 *
	 * @param string   $block_name Block name.
	 * @param array    $attributes Block attributes.
	 * @param callable $callback   Callback to generate content.
	 * @param int      $expiration Optional custom expiration.
	 * @return string Cached or generated content.
	 */
	public static function cache_block( $block_name, array $attributes, callable $callback, $expiration = self::EXPIRATION ) {
		ksort( $attributes );

		$key = sprintf(
			'%s_%s_%s',
			sanitize_key( $block_name ),
			md5( wp_json_encode( $attributes ) ),
			md5( (int) is_user_logged_in() . get_locale() )
		);

		return self::remember( $key, $callback, $expiration );
	}

	/**
	 * Clear all fragment caches
	 *
	 * @return bool Success status.
	 */
	public static function clear( $prefix = '' ) {
		global $wpdb;

		$like = '_transient_' . self::PREFIX . sanitize_key( $prefix ) . '%';

		$wpdb->query(
			$wpdb->prepare( "DELETE FROM {$wpdb->options} WHERE option_name LIKE %s", $like )
		);
		$wpdb->query(
			$wpdb->prepare( "DELETE FROM {$wpdb->options} WHERE option_name LIKE %s", '_transient_timeout_' . self::PREFIX . sanitize_key( $prefix ) . '%' )
		);
	}

	/**
	 * Hook into WordPress actions to auto-clear cache
	 */
	public static function init_hooks() {
		// Clear post block cache when posts are updated
		add_action( 'save_post', fn( $id ) => 'publish' === get_post_status( $id ) && self::clear( 'post_block' ) );

		// Clear product cache when products are updated
		add_action( 'woocommerce_update_product', fn() => self::clear( 'woo_product_list' ) );

		// Clear all cache on theme switch
		add_action( 'switch_theme', fn() => self::clear() );
	}
}
