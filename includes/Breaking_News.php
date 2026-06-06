<?php
/**
 * Breaking News Block Renderer
 *
 * @package ZepBlocks
 */

namespace ZepBlocks;

defined( 'ABSPATH' ) || exit;

/**
 * Breaking News Class
 */
class Breaking_News {

	/**
	 * Escape CSS property value
	 *
	 * @param string $value The CSS value to escape.
	 * @return string Escaped CSS value safe for output.
	 */
	private static function esc_css( $value ) {
		// Remove whitespace, quotes, backslashes, and control characters
		return preg_replace( '/[\s\'"\\\\]/', '', $value );
	}

	/**
	 * Validate CSS color value
	 *
	 * @param string $color The color value to validate.
	 * @return string Validated color or empty string if invalid.
	 */
	private static function sanitize_css_color( $color ) {
		// Remove any unsafe characters
		$color = self::esc_css( $color );

		// Validate hex color format (#RGB or #RRGGBB)
		if ( preg_match( '/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/', $color ) ) {
			return $color;
		}

		// Allow named colors from safe list
		$safe_colors = array(
			'inherit', 'transparent', 'currentColor',
			'black', 'white', 'gray', 'silver',
			'red', 'green', 'blue', 'yellow',
			'orange', 'purple', 'pink', 'cyan'
		);

		if ( in_array( strtolower( $color ), $safe_colors, true ) ) {
			return $color;
		}

		// Validate rgb/rgba format
		if ( preg_match( '/^rgba?\(\s*(\d{1,3}%?)\s*,\s*(\d{1,3}%?)\s*,\s*(\d{1,3}%?)\s*(?:,\s*[\d.]+\s*)?\)$/', $color ) ) {
			return $color;
		}

		return '';
	}

	/**
	 * Render Breaking News Block
	 *
	 * @param array $attributes Block attributes.
	 * @return string HTML output.
	 */
	public static function render( $attributes ) {
		// Skip caching for admin users or during preview
		if ( current_user_can( 'edit_posts' ) || is_preview() ) {
			return self::render_content( $attributes );
		}

		// Generate cache key from block attributes
		ksort( $attributes );
		$zepblocks_cache_key = 'zepblocks_breaking_news_' . md5( wp_json_encode( $attributes ) );

		// Try to get from cache
		$zepblocks_cached = get_transient( $zepblocks_cache_key );
		if ( false !== $zepblocks_cached ) {
			return $zepblocks_cached;
		}

		// Generate content
		$zepblocks_content = self::render_content( $attributes );

		// Cache for 1 hour
		set_transient( $zepblocks_cache_key, $zepblocks_content, HOUR_IN_SECONDS );

		return $zepblocks_content;
	}

	/**
	 * Render Breaking News Block Content
	 *
	 * @param array $attributes Block attributes.
	 * @return string HTML output.
	 */
	private static function render_content( $attributes ) {
		// Get attributes
		$zepblocks_breaking_news_title = isset( $attributes['breakingNewsTitle'] ) ? sanitize_text_field( $attributes['breakingNewsTitle'] ) : 'Breaking News';
		$zepblocks_post_number          = isset( $attributes['postNumber'] ) ? intval( $attributes['postNumber'] ) : 5;
		$zepblocks_post_cat             = isset( $attributes['postCat'] ) ? sanitize_text_field( $attributes['postCat'] ) : 'allpost';
		$zepblocks_post_order_by        = isset( $attributes['postOrderBy'] ) ? sanitize_text_field( $attributes['postOrderBy'] ) : 'DESC';
		$zepblocks_animation_speed      = isset( $attributes['animationSpeed'] ) ? intval( $attributes['animationSpeed'] ) : 30;

		// Style attributes
		$zepblocks_title_color       = isset( $attributes['titleColor'] ) ? self::sanitize_css_color( $attributes['titleColor'] ) : '#ffffff';
		$zepblocks_title_bg_color    = isset( $attributes['titleBgColor'] ) ? self::sanitize_css_color( $attributes['titleBgColor'] ) : '#ff0000';
		$zepblocks_content_bg_color  = isset( $attributes['contentBgColor'] ) ? self::sanitize_css_color( $attributes['contentBgColor'] ) : '#f5f5f5';
		$zepblocks_link_color        = isset( $attributes['linkColor'] ) ? self::sanitize_css_color( $attributes['linkColor'] ) : '#333333';
		$zepblocks_link_hover_color  = isset( $attributes['linkHoverColor'] ) ? self::sanitize_css_color( $attributes['linkHoverColor'] ) : '#0073aa';
		$zepblocks_font_size         = isset( $attributes['fontSize'] ) ? intval( $attributes['fontSize'] ) : 16;
		$zepblocks_padding           = isset( $attributes['padding'] ) ? intval( $attributes['padding'] ) : 15;
		$zepblocks_border_radius     = isset( $attributes['borderRadius'] ) ? intval( $attributes['borderRadius'] ) : 0;

		// Generate unique ID for this block instance
		$zepblocks_block_unique_id = 'zepblocks-breaking-news-' . uniqid();

		// Query Build
		if ( 'allpost' === $zepblocks_post_cat ) {
			$zepblocks_args = array(
				'post_type'      => 'post',
				'post_status'    => 'publish',
				'posts_per_page' => $zepblocks_post_number,
				'order'          => $zepblocks_post_order_by,
			);
		} else {
			$zepblocks_args = array(
				'post_type'      => 'post',
				'post_status'    => 'publish',
				'posts_per_page' => $zepblocks_post_number,
				'order'          => $zepblocks_post_order_by,
				// phpcs:ignore WordPress.DB.SlowDBQuery.slow_db_query_tax_query
				'tax_query'      => array(
					array(
						'taxonomy' => 'category',
						'field'    => 'slug',
						'terms'    => $zepblocks_post_cat,
					),
				),
			);
		}

		$zepblocks_data = new \WP_Query( $zepblocks_args );

		// Start output
		ob_start();

		// Register inline styles using wp_add_inline_style
		$zepblocks_safe_id = self::esc_css( $zepblocks_block_unique_id );
		$zepblocks_safe_hover_color = self::esc_css( $zepblocks_link_hover_color );
		$zepblocks_safe_title_bg_color = self::esc_css( $zepblocks_title_bg_color );
		$zepblocks_safe_bg_color = self::esc_css( $zepblocks_content_bg_color );
		$zepblocks_custom_css = sprintf(
			'#{%s} { --zepblocks-breaking-news-link-hover-color: %s; --zepblocks-breaking-news-title-bg-color: %s; --zepblocks-breaking-news-bg-color: %s; }',
			$zepblocks_safe_id,
			$zepblocks_safe_hover_color,
			$zepblocks_safe_title_bg_color,
			$zepblocks_safe_bg_color
		);

		// Enqueue inline styles
		wp_register_style( 'zepblocks-breaking-news-dynamic', false, array(), ZEPBLOCKS_VERSION );
		wp_enqueue_style( 'zepblocks-breaking-news-dynamic' );
		wp_add_inline_style( 'zepblocks-breaking-news-dynamic', $zepblocks_custom_css );

		echo '<div class="wp-block-zepblock-breaking-news" id="' . esc_attr( $zepblocks_block_unique_id ) . '">';

		// Build ticker styles
		$zepblocks_ticker_style = '';
		$zepblocks_ticker_style .= 'display:flex;';
		$zepblocks_ticker_style .= 'align-items:center;';
		$zepblocks_ticker_style .= 'background-color:' . $zepblocks_content_bg_color . ';';
		if ( $zepblocks_border_radius > 0 ) {
			$zepblocks_ticker_style .= 'border-radius:' . intval( $zepblocks_border_radius ) . 'px;';
		}
		$zepblocks_ticker_style .= 'overflow:hidden;';
		$zepblocks_ticker_style .= 'border:1px solid #e0e0e0;';
		$zepblocks_ticker_style .= 'box-shadow:0 2px 8px rgba(0,0,0,0.1);';

		echo '<div class="breaking-news-ticker" style="' . esc_attr( $zepblocks_ticker_style ) . '">';

		// Display heading
		if ( ! empty( $zepblocks_breaking_news_title ) ) {
			$zepblocks_heading_style = '';
			$zepblocks_heading_style .= 'display:flex;';
			$zepblocks_heading_style .= 'align-items:center;';
			$zepblocks_heading_style .= 'background-color:' . $zepblocks_title_bg_color . ';';
			$zepblocks_heading_style .= 'color:' . $zepblocks_title_color . ';';
			$zepblocks_heading_style .= 'padding:' . intval( $zepblocks_padding ) . 'px 20px;';
			$zepblocks_heading_style .= 'font-weight:bold;';
			$zepblocks_heading_style .= 'font-size:14px;';
			$zepblocks_heading_style .= 'text-transform:uppercase;';
			$zepblocks_heading_style .= 'white-space:nowrap;';
			$zepblocks_heading_style .= 'position:relative;';
			$zepblocks_heading_style .= 'z-index:10;';

			echo '<div class="ticker-heading" style="' . esc_attr( $zepblocks_heading_style ) . '">';
			echo esc_html( $zepblocks_breaking_news_title );
			// Add arrow indicator
			echo '<span style="position:absolute;right:-10px;top:50%;transform:translateY(-50%);width:0;height:0;border-top:10px solid transparent;border-bottom:10px solid transparent;border-left:10px solid ' . esc_attr( $zepblocks_title_bg_color ) . ';"></span>';
			echo '</div>';
		}

		// Display ticker container
		$zepblocks_container_style = '';
		$zepblocks_container_style .= 'flex:1;';
		$zepblocks_container_style .= 'overflow:hidden;';
		$zepblocks_container_style .= 'position:relative;';
		$zepblocks_container_style .= 'padding:' . ( intval( $zepblocks_padding ) - 5 ) . 'px 0;';

		echo '<div class="ticker-container" style="' . esc_attr( $zepblocks_container_style ) . '">';

		// Gradient fade effects
		$gradient_color = self::esc_css( $zepblocks_content_bg_color );
		echo '<div style="position:absolute;left:0;top:0;bottom:0;width:50px;background:linear-gradient(to right, ' . esc_attr( $gradient_color ) . ', transparent);z-index:5;pointer-events:none;"></div>';
		echo '<div style="position:absolute;right:0;top:0;bottom:0;width:50px;background:linear-gradient(to left, ' . esc_attr( $gradient_color ) . ', transparent);z-index:5;pointer-events:none;"></div>';

		// Calculate animation duration
		$zepblocks_animation_duration = $zepblocks_animation_speed;

		$zepblocks_content_style = '';
		$zepblocks_content_style .= 'display:flex;';
		$zepblocks_content_style .= 'white-space:nowrap;';
		$zepblocks_content_style .= 'animation:ticker-scroll ' . intval( $zepblocks_animation_duration ) . 's linear infinite;';

		echo '<div class="ticker-content" style="' . esc_attr( $zepblocks_content_style ) . '">';

		if ( $zepblocks_data->have_posts() ) {
			while ( $zepblocks_data->have_posts() ) {
				$zepblocks_data->the_post();
				$zepblocks_permalink = get_permalink();

				echo '<div class="ticker-item" style="display:flex;align-items:center;padding:0 20px;white-space:nowrap;">';
				// Add bullet point
				echo '<span style="width:8px;height:8px;background-color:' . esc_attr( $zepblocks_title_bg_color ) . ';border-radius:50%;margin-right:10px;flex-shrink:0;"></span>';
				echo '<a href="' . esc_url( $zepblocks_permalink ) . '" style="color:' . esc_attr( $zepblocks_link_color ) . ';font-size:' . intval( $zepblocks_font_size ) . 'px;text-decoration:none;transition:color 0.2s ease;">';
				echo esc_html( get_the_title() );
				echo '</a>';
				echo '</div>';
			}
			wp_reset_postdata();
		}

		echo '</div>'; // .ticker-content
		echo '</div>'; // .ticker-container
		echo '</div>'; // .breaking-news-ticker
		echo '</div>'; // .wp-block-zepblock-breaking-news

		return ob_get_clean();
	}
}
