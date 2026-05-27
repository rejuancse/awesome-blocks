<?php
/**
 * Post Block Renderer
 *
 * @package ZepBlocks
 */

namespace ZepBlocks;

defined( 'ABSPATH' ) || exit;

/**
 * Post Block Class
 */
class Post_Block {

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
	 * Render Post Block
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
		$zepblocks_cache_key = 'zepblocks_post_block_' . md5( wp_json_encode( $attributes ) );

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
	 * Render Post Block Content
	 *
	 * @param array $attributes Block attributes.
	 * @return string HTML output.
	 */
	private static function render_content( $attributes ) {
		// Get attributes
		$zepblocks_posts_to_show     = isset( $attributes['postsToShow'] ) ? intval( $attributes['postsToShow'] ) : 3;
		$zepblocks_order             = isset( $attributes['order'] ) ? sanitize_text_field( $attributes['order'] ) : 'desc';
		$zepblocks_order_by          = isset( $attributes['orderBy'] ) ? sanitize_text_field( $attributes['orderBy'] ) : 'date';
		$zepblocks_columns           = isset( $attributes['columns'] ) ? intval( $attributes['columns'] ) : 3;
		$zepblocks_display_title     = isset( $attributes['displayTitle'] ) ? (bool) $attributes['displayTitle'] : true;
		$zepblocks_display_excerpt   = isset( $attributes['displayExcerpt'] ) ? (bool) $attributes['displayExcerpt'] : true;
		$zepblocks_display_date      = isset( $attributes['displayDate'] ) ? (bool) $attributes['displayDate'] : true;
		$zepblocks_display_author    = isset( $attributes['displayAuthor'] ) ? (bool) $attributes['displayAuthor'] : false;
		$zepblocks_display_thumbnail = isset( $attributes['displayThumbnail'] ) ? (bool) $attributes['displayThumbnail'] : true;
		$zepblocks_thumbnail_size    = isset( $attributes['thumbnailSize'] ) ? sanitize_text_field( $attributes['thumbnailSize'] ) : 'medium';
		$zepblocks_categories        = isset( $attributes['categories'] ) ? $attributes['categories'] : array();

		// Style attributes
		$zepblocks_title_color          = isset( $attributes['titleColor'] ) ? self::sanitize_css_color( $attributes['titleColor'] ) : '#333333';
		$zepblocks_title_font_size      = isset( $attributes['titleFontSize'] ) ? intval( $attributes['titleFontSize'] ) : 22;
		$zepblocks_title_font_weight    = isset( $attributes['titleFontWeight'] ) ? sanitize_text_field( $attributes['titleFontWeight'] ) : '600';
		$zepblocks_title_font_family    = isset( $attributes['titleFontFamily'] ) ? sanitize_text_field( $attributes['titleFontFamily'] ) : '';

		$zepblocks_excerpt_color        = isset( $attributes['excerptColor'] ) ? self::sanitize_css_color( $attributes['excerptColor'] ) : '#555555';
		$zepblocks_excerpt_font_size    = isset( $attributes['excerptFontSize'] ) ? intval( $attributes['excerptFontSize'] ) : 15;
		$zepblocks_excerpt_font_weight  = isset( $attributes['excerptFontWeight'] ) ? sanitize_text_field( $attributes['excerptFontWeight'] ) : '400';
		$zepblocks_excerpt_font_family  = isset( $attributes['excerptFontFamily'] ) ? sanitize_text_field( $attributes['excerptFontFamily'] ) : '';
		$zepblocks_excerpt_max_chars    = isset( $attributes['excerptMaxChars'] ) ? intval( $attributes['excerptMaxChars'] ) : 0;

		$zepblocks_meta_color           = isset( $attributes['metaColor'] ) ? self::sanitize_css_color( $attributes['metaColor'] ) : '#666666';
		$zepblocks_meta_font_size       = isset( $attributes['metaFontSize'] ) ? intval( $attributes['metaFontSize'] ) : 14;
		$zepblocks_meta_font_weight     = isset( $attributes['metaFontWeight'] ) ? sanitize_text_field( $attributes['metaFontWeight'] ) : '400';
		$zepblocks_meta_font_family     = isset( $attributes['metaFontFamily'] ) ? sanitize_text_field( $attributes['metaFontFamily'] ) : '';

		$zepblocks_link_color           = isset( $attributes['linkColor'] ) ? self::sanitize_css_color( $attributes['linkColor'] ) : '#0073aa';
		$zepblocks_link_hover_color     = isset( $attributes['linkHoverColor'] ) ? self::sanitize_css_color( $attributes['linkHoverColor'] ) : '#005177';
		$zepblocks_link_font_size       = isset( $attributes['linkFontSize'] ) ? intval( $attributes['linkFontSize'] ) : 14;
		$zepblocks_link_font_weight     = isset( $attributes['linkFontWeight'] ) ? sanitize_text_field( $attributes['linkFontWeight'] ) : '600';
		$zepblocks_link_font_family     = isset( $attributes['linkFontFamily'] ) ? sanitize_text_field( $attributes['linkFontFamily'] ) : '';

		$zepblocks_card_bg_color        = isset( $attributes['cardBgColor'] ) ? self::sanitize_css_color( $attributes['cardBgColor'] ) : '#ffffff';
		$zepblocks_card_border          = isset( $attributes['cardBorder'] ) ? sanitize_text_field( $attributes['cardBorder'] ) : 'none';
		$zepblocks_card_border_radius   = isset( $attributes['cardBorderRadius'] ) ? intval( $attributes['cardBorderRadius'] ) : 8;
		$zepblocks_card_padding         = isset( $attributes['cardPadding'] ) ? intval( $attributes['cardPadding'] ) : 20;

		$zepblocks_thumbnail_border_radius = isset( $attributes['thumbnailBorderRadius'] ) ? intval( $attributes['thumbnailBorderRadius'] ) : 0;
		$zepblocks_thumbnail_height        = isset( $attributes['thumbnailHeight'] ) ? intval( $attributes['thumbnailHeight'] ) : 0;

		$zepblocks_gap                  = isset( $attributes['gap'] ) ? intval( $attributes['gap'] ) : 30;

		// Generate unique ID for this block instance
		$zepblocks_block_unique_id = 'zepblocks-post-block-' . uniqid();

		// Enqueue Google Fonts if a custom font is selected
		$zepblocks_google_fonts_url = '';
		$zepblocks_enqueued_fonts = array();

		if ( ! empty( $zepblocks_title_font_family ) ) {
			// Extract font name from font-family string
			$zepblocks_font_name = str_replace( "'", '', explode( ',', $zepblocks_title_font_family )[0] );
			$zepblocks_font_handle = 'zepblocks-google-font-' . sanitize_title( $zepblocks_font_name );
			if ( ! in_array( $zepblocks_font_handle, $zepblocks_enqueued_fonts ) ) {
				$zepblocks_google_fonts_url = 'https://fonts.googleapis.com/css2?family=' . str_replace( ' ', '+', $zepblocks_font_name ) . '&display=swap';
				wp_enqueue_style( $zepblocks_font_handle, $zepblocks_google_fonts_url, array(), ZEPBLOCKS_VERSION);
				$zepblocks_enqueued_fonts[] = $zepblocks_font_handle;
			}
		}

		if ( ! empty( $zepblocks_excerpt_font_family ) ) {
			$zepblocks_font_name = str_replace( "'", '', explode( ',', $zepblocks_excerpt_font_family )[0] );
			$zepblocks_font_handle = 'zepblocks-google-font-' . sanitize_title( $zepblocks_font_name );
			if ( ! in_array( $zepblocks_font_handle, $zepblocks_enqueued_fonts ) ) {
				$zepblocks_google_fonts_url = 'https://fonts.googleapis.com/css2?family=' . str_replace( ' ', '+', $zepblocks_font_name ) . '&display=swap';
				wp_enqueue_style( $zepblocks_font_handle, $zepblocks_google_fonts_url, array(), ZEPBLOCKS_VERSION);
				$zepblocks_enqueued_fonts[] = $zepblocks_font_handle;
			}
		}

		if ( ! empty( $zepblocks_meta_font_family ) ) {
			$zepblocks_font_name = str_replace( "'", '', explode( ',', $zepblocks_meta_font_family )[0] );
			$zepblocks_font_handle = 'zepblocks-google-font-' . sanitize_title( $zepblocks_font_name );
			if ( ! in_array( $zepblocks_font_handle, $zepblocks_enqueued_fonts ) ) {
				$zepblocks_google_fonts_url = 'https://fonts.googleapis.com/css2?family=' . str_replace( ' ', '+', $zepblocks_font_name ) . '&display=swap';
				wp_enqueue_style( $zepblocks_font_handle, $zepblocks_google_fonts_url, array(), ZEPBLOCKS_VERSION);
				$zepblocks_enqueued_fonts[] = $zepblocks_font_handle;
			}
		}

		if ( ! empty( $zepblocks_link_font_family ) ) {
			$zepblocks_font_name = str_replace( "'", '', explode( ',', $zepblocks_link_font_family )[0] );
			$zepblocks_font_handle = 'zepblocks-google-font-' . sanitize_title( $zepblocks_font_name );
			if ( ! in_array( $zepblocks_font_handle, $zepblocks_enqueued_fonts ) ) {
				$zepblocks_google_fonts_url = 'https://fonts.googleapis.com/css2?family=' . str_replace( ' ', '+', $zepblocks_font_name ) . '&display=swap';
				wp_enqueue_style( $zepblocks_font_handle, $zepblocks_google_fonts_url, array(), ZEPBLOCKS_VERSION);
				$zepblocks_enqueued_fonts[] = $zepblocks_font_handle;
			}
		}

		// Query arguments
		$zepblocks_args = array(
			'post_type'      => 'post',
			'post_status'    => 'publish',
			'posts_per_page' => $zepblocks_posts_to_show,
			'order'          => $zepblocks_order,
			'orderby'        => $zepblocks_order_by,
			'ignore_sticky_posts' => 1,
		);

		// Filter by categories
		if ( ! empty( $zepblocks_categories ) && is_array( $zepblocks_categories ) ) {
			$zepblocks_args['category__in'] = $zepblocks_categories;
		}

		$zepblocks_query = new \WP_Query( $zepblocks_args );

		if ( ! $zepblocks_query->have_posts() ) {
			return '<p>' . esc_html__( 'No posts found.', 'zepblocks'  ) . '</p>';
		}

		// Start output
		ob_start();

		// Register inline styles using wp_add_inline_style
		// Properly escape the CSS selector and property values
		$zepblocks_safe_id = self::esc_css( $zepblocks_block_unique_id );
		$zepblocks_safe_hover_color = self::esc_css( $zepblocks_link_hover_color );
		$zepblocks_custom_css = sprintf(
			'#{%s} { --zepblocks-link-hover-color: %s; }',
			$zepblocks_safe_id,
			$zepblocks_safe_hover_color
		);

		// Enqueue inline styles
		wp_register_style( 'zepblocks-post-block-dynamic', false, array(), ZEPBLOCKS_VERSION );
		wp_enqueue_style( 'zepblocks-post-block-dynamic' );
		wp_add_inline_style( 'zepblocks-post-block-dynamic', $zepblocks_custom_css );

		echo '<div class="wp-block-zepblock-post-block" id="' . esc_attr( $zepblocks_block_unique_id ) . '">';
		echo '<ul class="zepblocks-posts-grid columns-' . esc_attr( $zepblocks_columns ) . '" style="gap: ' . intval( $zepblocks_gap ) . 'px;">';

		while ( $zepblocks_query->have_posts() ) {
			$zepblocks_query->the_post();

			// Build card styles with proper CSS escaping
			$zepblocks_card_style = '';
			if ( ! empty( $zepblocks_card_bg_color ) ) {
				$zepblocks_card_style .= 'background-color:' . $zepblocks_card_bg_color . ';';
			}
			if ( ! empty( $zepblocks_card_border ) && $zepblocks_card_border !== 'none' ) {
				$zepblocks_card_style .= 'border:' . self::esc_css( $zepblocks_card_border ) . ';';
			}
			if ( $zepblocks_card_border_radius > 0 ) {
				$zepblocks_card_style .= 'border-radius:' . intval( $zepblocks_card_border_radius ) . 'px;';
			}

			echo '<li class="zepblocks-post-item" style="' . esc_attr( $zepblocks_card_style ) . '">';

			// Display thumbnail
			if ( $zepblocks_display_thumbnail && has_post_thumbnail() ) {
				$zepblocks_thumb_style = '';
				if ( $zepblocks_thumbnail_border_radius > 0 ) {
					$zepblocks_thumb_style .= 'border-radius:' . intval( $zepblocks_thumbnail_border_radius ) . 'px;';
				}
				if ( $zepblocks_thumbnail_height > 0 ) {
					$zepblocks_thumb_style .= 'height:' . intval( $zepblocks_thumbnail_height ) . 'px;';
				}

				$zepblocks_image_id = get_post_thumbnail_id();
				$zepblocks_image_src = wp_get_attachment_image_src( $zepblocks_image_id, $zepblocks_thumbnail_size );
				$zepblocks_image_url = $zepblocks_image_src ? $zepblocks_image_src[0] : '';
				$zepblocks_image_alt = get_post_meta( $zepblocks_image_id, '_wp_attachment_image_alt', true );

				if ( $zepblocks_image_url ) {
					echo '<div class="zepblocks-post-thumbnail">';
					echo '<a href="' . esc_url( get_permalink() ) . '">';
					echo '<img src="' . esc_url( $zepblocks_image_url ) . '" alt="' . esc_attr( $zepblocks_image_alt ) . '" style="' . esc_attr( $zepblocks_thumb_style ) . '" />';
					echo '</a>';
					echo '</div>';
				}
			}

			$zepblocks_content_style = '';
			if ( $zepblocks_card_padding > 0 ) {
				$zepblocks_content_style .= 'padding:' . intval( $zepblocks_card_padding ) . 'px;';
			}

			echo '<div class="zepblocks-post-content" style="' . esc_attr( $zepblocks_content_style ) . '">';

			// Display meta
			if ( $zepblocks_display_date || $zepblocks_display_author ) {
				$zepblocks_meta_style = '';
				if ( ! empty( $zepblocks_meta_color ) ) {
					$zepblocks_meta_style .= 'color:' . $zepblocks_meta_color . ';';
				}
				if ( $zepblocks_meta_font_size > 0 ) {
					$zepblocks_meta_style .= 'font-size:' . intval( $zepblocks_meta_font_size ) . 'px;';
				}
				if ( ! empty( $zepblocks_meta_font_weight ) ) {
					$zepblocks_meta_style .= 'font-weight:' . self::esc_css( $zepblocks_meta_font_weight ) . ';';
				}
				if ( ! empty( $zepblocks_meta_font_family ) ) {
					$zepblocks_meta_style .= 'font-family:' . self::esc_css( $zepblocks_meta_font_family ) . ';';
				}

				echo '<div class="zepblocks-post-meta" style="' . esc_attr( $zepblocks_meta_style ) . '">';

				if ( $zepblocks_display_date ) {
					echo '<span class="zepblocks-post-date">';
					echo esc_html( get_the_date() );
					echo '</span>';
				}

				if ( $zepblocks_display_author ) {
					echo '<span class="zepblocks-post-author">';
					echo esc_html__( 'By ', 'zepblocks'  ) . esc_html( get_the_author() );
					echo '</span>';
				}

				echo '</div>';
			}

			// Display title
			if ( $zepblocks_display_title ) {
				$zepblocks_title_style = '';
				if ( ! empty( $zepblocks_title_color ) ) {
					$zepblocks_title_style .= 'color:' . $zepblocks_title_color . ';';
				}
				if ( $zepblocks_title_font_size > 0 ) {
					$zepblocks_title_style .= 'font-size:' . intval( $zepblocks_title_font_size ) . 'px;';
				}
				if ( ! empty( $zepblocks_title_font_weight ) ) {
					$zepblocks_title_style .= 'font-weight:' . self::esc_css( $zepblocks_title_font_weight ) . ';';
				}
				if ( ! empty( $zepblocks_title_font_family ) ) {
					$zepblocks_title_style .= 'font-family:' . self::esc_css( $zepblocks_title_font_family ) . ';';
				}

				echo '<h3 class="zepblocks-post-title" style="' . esc_attr( $zepblocks_title_style ) . '">';
				echo '<a href="' . esc_url( get_permalink() ) . '" style="' . esc_attr( $zepblocks_title_style ) . '">';
				echo esc_html( get_the_title() );
				echo '</a>';
				echo '</h3>';
			}

			// Display excerpt
			if ( $zepblocks_display_excerpt ) {
				$zepblocks_excerpt_style = '';
				if ( ! empty( $zepblocks_excerpt_color ) ) {
					$zepblocks_excerpt_style .= 'color:' . $zepblocks_excerpt_color . ';';
				}
				if ( $zepblocks_excerpt_font_size > 0 ) {
					$zepblocks_excerpt_style .= 'font-size:' . intval( $zepblocks_excerpt_font_size ) . 'px;';
				}
				if ( ! empty( $zepblocks_excerpt_font_weight ) ) {
					$zepblocks_excerpt_style .= 'font-weight:' . self::esc_css( $zepblocks_excerpt_font_weight ) . ';';
				}
				if ( ! empty( $zepblocks_excerpt_font_family ) ) {
					$zepblocks_excerpt_style .= 'font-family:' . self::esc_css( $zepblocks_excerpt_font_family ) . ';';
				}

				echo '<div class="zepblocks-post-excerpt" style="' . esc_attr( $zepblocks_excerpt_style ) . '">';

				// Get excerpt content
				$zepblocks_excerpt_content = get_the_excerpt();

				// Apply character limit if set
				if ( $zepblocks_excerpt_max_chars > 0 ) {
					$zepblocks_plain_text = wp_strip_all_tags( $zepblocks_excerpt_content );
					if ( strlen( $zepblocks_plain_text ) > $zepblocks_excerpt_max_chars ) {
						$zepblocks_excerpt_content = substr( $zepblocks_plain_text, 0, $zepblocks_excerpt_max_chars ) . '…';
					}
				}

				echo wp_kses_post( $zepblocks_excerpt_content );
				echo '</div>';
			}

			// Read more link
			$zepblocks_link_style = '';
			if ( ! empty( $zepblocks_link_color ) ) {
				$zepblocks_link_style .= 'color:' . $zepblocks_link_color . ';';
			}
			if ( $zepblocks_link_font_size > 0 ) {
				$zepblocks_link_style .= 'font-size:' . intval( $zepblocks_link_font_size ) . 'px;';
			}
			if ( ! empty( $zepblocks_link_font_weight ) ) {
				$zepblocks_link_style .= 'font-weight:' . self::esc_css( $zepblocks_link_font_weight ) . ';';
			}
			if ( ! empty( $zepblocks_link_font_family ) ) {
				$zepblocks_link_style .= 'font-family:' . self::esc_css( $zepblocks_link_font_family ) . ';';
			}

			echo '<a href="' . esc_url( get_permalink() ) . '" class="zepblocks-post-read-more" style="' . esc_attr( $zepblocks_link_style ) . '">';
			echo esc_html__( 'Read More →', 'zepblocks'  );
			echo '</a>';

			echo '</div>'; // .zepblocks-post-content
			echo '</li>'; // .zepblocks-post-item
		}

		echo '</ul>';
		echo '</div>';

		wp_reset_postdata();

		return ob_get_clean();
	}
}
