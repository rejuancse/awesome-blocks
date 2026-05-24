<?php
/**
 * Fragment Cache Helper Class
 *
 * @package ThemeBlocks
 */

namespace ThemeBlocks;

defined( 'ABSPATH' ) || exit;

/**
 * Fragment Cache Helper Class
 */
class Fragment_Cache {

	const PREFIX     = 'theme_blocks_fragment_';
	const EXPIRATION = 3600; // 1 Hour

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
	 * @param string $prefix Optional prefix to clear specific caches.
	 * @return void
	 */
	public static function clear( $prefix = '' ) {
		global $wpdb;

		$like         = '_transient_' . self::PREFIX . sanitize_key( $prefix ) . '%';
		$like_timeout = '_transient_timeout_' . self::PREFIX . sanitize_key( $prefix ) . '%';

		// phpcs:ignore WordPress.DB.DirectDatabaseQuery.DirectQuery, WordPress.DB.DirectDatabaseQuery.NoCaching -- Direct query required to bulk-delete transients by prefix; no suitable WP API exists for this operation.
		$wpdb->query(
			$wpdb->prepare( "DELETE FROM {$wpdb->options} WHERE option_name LIKE %s", $like )
		);

		// phpcs:ignore WordPress.DB.DirectDatabaseQuery.DirectQuery, WordPress.DB.DirectDatabaseQuery.NoCaching -- Direct query required to bulk-delete transient timeouts by prefix; no suitable WP API exists for this operation.
		$wpdb->query(
			$wpdb->prepare( "DELETE FROM {$wpdb->options} WHERE option_name LIKE %s", $like_timeout )
		);
	}

	/**
	 * Hook into WordPress actions to auto-clear cache
	 *
	 * @return void
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
