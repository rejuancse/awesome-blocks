<?php
/**
 * Post Block Renderer
 *
 * @package ThemeBlocks
 */

namespace ThemeBlocks;

defined( 'ABSPATH' ) || exit;

/**
 * Post Block Class
 */
class Post_Block {

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
		$theme_blocks_cache_key = 'theme_blocks_post_block_' . md5( wp_json_encode( $attributes ) );

		// Try to get from cache
		$theme_blocks_cached = get_transient( $theme_blocks_cache_key );
		if ( false !== $theme_blocks_cached ) {
			return $theme_blocks_cached;
		}

		// Generate content
		$theme_blocks_content = self::render_content( $attributes );

		// Cache for 1 hour
		set_transient( $theme_blocks_cache_key, $theme_blocks_content, HOUR_IN_SECONDS );

		return $theme_blocks_content;
	}

	/**
	 * Render Post Block Content
	 *
	 * @param array $attributes Block attributes.
	 * @return string HTML output.
	 */
	private static function render_content( $attributes ) {
		// Get attributes
		$theme_blocks_posts_to_show     = isset( $attributes['postsToShow'] ) ? intval( $attributes['postsToShow'] ) : 3;
		$theme_blocks_order             = isset( $attributes['order'] ) ? sanitize_text_field( $attributes['order'] ) : 'desc';
		$theme_blocks_order_by          = isset( $attributes['orderBy'] ) ? sanitize_text_field( $attributes['orderBy'] ) : 'date';
		$theme_blocks_columns           = isset( $attributes['columns'] ) ? intval( $attributes['columns'] ) : 3;
		$theme_blocks_display_title     = isset( $attributes['displayTitle'] ) ? (bool) $attributes['displayTitle'] : true;
		$theme_blocks_display_excerpt   = isset( $attributes['displayExcerpt'] ) ? (bool) $attributes['displayExcerpt'] : true;
		$theme_blocks_display_date      = isset( $attributes['displayDate'] ) ? (bool) $attributes['displayDate'] : true;
		$theme_blocks_display_author    = isset( $attributes['displayAuthor'] ) ? (bool) $attributes['displayAuthor'] : false;
		$theme_blocks_display_thumbnail = isset( $attributes['displayThumbnail'] ) ? (bool) $attributes['displayThumbnail'] : true;
		$theme_blocks_thumbnail_size    = isset( $attributes['thumbnailSize'] ) ? sanitize_text_field( $attributes['thumbnailSize'] ) : 'medium';
		$theme_blocks_categories        = isset( $attributes['categories'] ) ? $attributes['categories'] : array();

		// Style attributes
		$theme_blocks_title_color          = isset( $attributes['titleColor'] ) ? sanitize_text_field( $attributes['titleColor'] ) : '#333333';
		$theme_blocks_title_font_size      = isset( $attributes['titleFontSize'] ) ? intval( $attributes['titleFontSize'] ) : 22;
		$theme_blocks_title_font_weight    = isset( $attributes['titleFontWeight'] ) ? sanitize_text_field( $attributes['titleFontWeight'] ) : '600';
		$theme_blocks_title_font_family    = isset( $attributes['titleFontFamily'] ) ? sanitize_text_field( $attributes['titleFontFamily'] ) : '';

		$theme_blocks_excerpt_color        = isset( $attributes['excerptColor'] ) ? sanitize_text_field( $attributes['excerptColor'] ) : '#555555';
		$theme_blocks_excerpt_font_size    = isset( $attributes['excerptFontSize'] ) ? intval( $attributes['excerptFontSize'] ) : 15;
		$theme_blocks_excerpt_font_weight  = isset( $attributes['excerptFontWeight'] ) ? sanitize_text_field( $attributes['excerptFontWeight'] ) : '400';
		$theme_blocks_excerpt_font_family  = isset( $attributes['excerptFontFamily'] ) ? sanitize_text_field( $attributes['excerptFontFamily'] ) : '';
		$theme_blocks_excerpt_max_chars    = isset( $attributes['excerptMaxChars'] ) ? intval( $attributes['excerptMaxChars'] ) : 0;

		$theme_blocks_meta_color           = isset( $attributes['metaColor'] ) ? sanitize_text_field( $attributes['metaColor'] ) : '#666666';
		$theme_blocks_meta_font_size       = isset( $attributes['metaFontSize'] ) ? intval( $attributes['metaFontSize'] ) : 14;
		$theme_blocks_meta_font_weight     = isset( $attributes['metaFontWeight'] ) ? sanitize_text_field( $attributes['metaFontWeight'] ) : '400';
		$theme_blocks_meta_font_family     = isset( $attributes['metaFontFamily'] ) ? sanitize_text_field( $attributes['metaFontFamily'] ) : '';

		$theme_blocks_link_color           = isset( $attributes['linkColor'] ) ? sanitize_text_field( $attributes['linkColor'] ) : '#0073aa';
		$theme_blocks_link_hover_color     = isset( $attributes['linkHoverColor'] ) ? sanitize_text_field( $attributes['linkHoverColor'] ) : '#005177';
		$theme_blocks_link_font_size       = isset( $attributes['linkFontSize'] ) ? intval( $attributes['linkFontSize'] ) : 14;
		$theme_blocks_link_font_weight     = isset( $attributes['linkFontWeight'] ) ? sanitize_text_field( $attributes['linkFontWeight'] ) : '600';
		$theme_blocks_link_font_family     = isset( $attributes['linkFontFamily'] ) ? sanitize_text_field( $attributes['linkFontFamily'] ) : '';

		$theme_blocks_card_bg_color        = isset( $attributes['cardBgColor'] ) ? sanitize_text_field( $attributes['cardBgColor'] ) : '#ffffff';
		$theme_blocks_card_border          = isset( $attributes['cardBorder'] ) ? sanitize_text_field( $attributes['cardBorder'] ) : 'none';
		$theme_blocks_card_border_radius   = isset( $attributes['cardBorderRadius'] ) ? intval( $attributes['cardBorderRadius'] ) : 8;
		$theme_blocks_card_padding         = isset( $attributes['cardPadding'] ) ? intval( $attributes['cardPadding'] ) : 20;

		$theme_blocks_thumbnail_border_radius = isset( $attributes['thumbnailBorderRadius'] ) ? intval( $attributes['thumbnailBorderRadius'] ) : 0;
		$theme_blocks_thumbnail_height        = isset( $attributes['thumbnailHeight'] ) ? intval( $attributes['thumbnailHeight'] ) : 0;

		$theme_blocks_gap                  = isset( $attributes['gap'] ) ? intval( $attributes['gap'] ) : 30;

		// Generate unique ID for this block instance
		$theme_blocks_block_unique_id = 'theme-blocks-post-block-' . uniqid();

		// Enqueue Google Fonts if a custom font is selected
		$theme_blocks_google_fonts_url = '';
		$theme_blocks_enqueued_fonts = array();

		if ( ! empty( $theme_blocks_title_font_family ) ) {
			// Extract font name from font-family string
			$theme_blocks_font_name = str_replace( "'", '', explode( ',', $theme_blocks_title_font_family )[0] );
			$theme_blocks_font_handle = 'theme-blocks-google-font-' . sanitize_title( $theme_blocks_font_name );
			if ( ! in_array( $theme_blocks_font_handle, $theme_blocks_enqueued_fonts ) ) {
				$theme_blocks_google_fonts_url = 'https://fonts.googleapis.com/css2?family=' . str_replace( ' ', '+', $theme_blocks_font_name ) . '&display=swap';
				wp_enqueue_style( $theme_blocks_font_handle, $theme_blocks_google_fonts_url, array(), THEMEBLOCKS_VERSION);
				$theme_blocks_enqueued_fonts[] = $theme_blocks_font_handle;
			}
		}

		if ( ! empty( $theme_blocks_excerpt_font_family ) ) {
			$theme_blocks_font_name = str_replace( "'", '', explode( ',', $theme_blocks_excerpt_font_family )[0] );
			$theme_blocks_font_handle = 'theme-blocks-google-font-' . sanitize_title( $theme_blocks_font_name );
			if ( ! in_array( $theme_blocks_font_handle, $theme_blocks_enqueued_fonts ) ) {
				$theme_blocks_google_fonts_url = 'https://fonts.googleapis.com/css2?family=' . str_replace( ' ', '+', $theme_blocks_font_name ) . '&display=swap';
				wp_enqueue_style( $theme_blocks_font_handle, $theme_blocks_google_fonts_url, array(), THEMEBLOCKS_VERSION);
				$theme_blocks_enqueued_fonts[] = $theme_blocks_font_handle;
			}
		}

		if ( ! empty( $theme_blocks_meta_font_family ) ) {
			$theme_blocks_font_name = str_replace( "'", '', explode( ',', $theme_blocks_meta_font_family )[0] );
			$theme_blocks_font_handle = 'theme-blocks-google-font-' . sanitize_title( $theme_blocks_font_name );
			if ( ! in_array( $theme_blocks_font_handle, $theme_blocks_enqueued_fonts ) ) {
				$theme_blocks_google_fonts_url = 'https://fonts.googleapis.com/css2?family=' . str_replace( ' ', '+', $theme_blocks_font_name ) . '&display=swap';
				wp_enqueue_style( $theme_blocks_font_handle, $theme_blocks_google_fonts_url, array(), THEMEBLOCKS_VERSION);
				$theme_blocks_enqueued_fonts[] = $theme_blocks_font_handle;
			}
		}

		if ( ! empty( $theme_blocks_link_font_family ) ) {
			$theme_blocks_font_name = str_replace( "'", '', explode( ',', $theme_blocks_link_font_family )[0] );
			$theme_blocks_font_handle = 'theme-blocks-google-font-' . sanitize_title( $theme_blocks_font_name );
			if ( ! in_array( $theme_blocks_font_handle, $theme_blocks_enqueued_fonts ) ) {
				$theme_blocks_google_fonts_url = 'https://fonts.googleapis.com/css2?family=' . str_replace( ' ', '+', $theme_blocks_font_name ) . '&display=swap';
				wp_enqueue_style( $theme_blocks_font_handle, $theme_blocks_google_fonts_url, array(), THEMEBLOCKS_VERSION);
				$theme_blocks_enqueued_fonts[] = $theme_blocks_font_handle;
			}
		}

		// Query arguments
		$theme_blocks_args = array(
			'post_type'      => 'post',
			'post_status'    => 'publish',
			'posts_per_page' => $theme_blocks_posts_to_show,
			'order'          => $theme_blocks_order,
			'orderby'        => $theme_blocks_order_by,
			'ignore_sticky_posts' => 1,
		);

		// Filter by categories
		if ( ! empty( $theme_blocks_categories ) && is_array( $theme_blocks_categories ) ) {
			$theme_blocks_args['category__in'] = $theme_blocks_categories;
		}

		$theme_blocks_query = new \WP_Query( $theme_blocks_args );

		if ( ! $theme_blocks_query->have_posts() ) {
			return '<p>' . esc_html__( 'No posts found.', 'theme-blocks'  ) . '</p>';
		}

		// Start output
		ob_start();

		$theme_blocks_custom_css = "
			#{$theme_blocks_block_unique_id} {
				--theme-blocks-link-hover-color: {$theme_blocks_link_hover_color};
			}
		";

		echo '<style>' . esc_html( $theme_blocks_custom_css ) . '</style>';
		echo '<div class="wp-block-tblock-post-block" id="' . esc_attr( $theme_blocks_block_unique_id ) . '">';
		echo '<ul class="theme-blocks-posts-grid columns-' . esc_attr( $theme_blocks_columns ) . '" style="gap: ' . esc_attr( $theme_blocks_gap ) . 'px;">';

		while ( $theme_blocks_query->have_posts() ) {
			$theme_blocks_query->the_post();

			// Build card styles
			$theme_blocks_card_style = '';
			if ( ! empty( $theme_blocks_card_bg_color ) ) {
				$theme_blocks_card_style .= 'background-color:' . $theme_blocks_card_bg_color . ';';
			}
			if ( ! empty( $theme_blocks_card_border ) && $theme_blocks_card_border !== 'none' ) {
				$theme_blocks_card_style .= 'border:' . $theme_blocks_card_border . ';';
			}
			if ( $theme_blocks_card_border_radius > 0 ) {
				$theme_blocks_card_style .= 'border-radius:' . $theme_blocks_card_border_radius . 'px;';
			}

			echo '<li class="theme-blocks-post-item" style="' . esc_attr( $theme_blocks_card_style ) . '">';

			// Display thumbnail
			if ( $theme_blocks_display_thumbnail && has_post_thumbnail() ) {
				$theme_blocks_thumb_style = '';
				if ( $theme_blocks_thumbnail_border_radius > 0 ) {
					$theme_blocks_thumb_style .= 'border-radius:' . $theme_blocks_thumbnail_border_radius . 'px;';
				}
				if ( $theme_blocks_thumbnail_height > 0 ) {
					$theme_blocks_thumb_style .= 'height:' . $theme_blocks_thumbnail_height . 'px;';
				}

				$theme_blocks_image_id = get_post_thumbnail_id();
				$theme_blocks_image_src = wp_get_attachment_image_src( $theme_blocks_image_id, $theme_blocks_thumbnail_size );
				$theme_blocks_image_url = $theme_blocks_image_src ? $theme_blocks_image_src[0] : '';
				$theme_blocks_image_alt = get_post_meta( $theme_blocks_image_id, '_wp_attachment_image_alt', true );

				if ( $theme_blocks_image_url ) {
					echo '<div class="theme-blocks-post-thumbnail">';
					echo '<a href="' . esc_url( get_permalink() ) . '">';
					echo '<img src="' . esc_url( $theme_blocks_image_url ) . '" alt="' . esc_attr( $theme_blocks_image_alt ) . '" style="' . esc_attr( $theme_blocks_thumb_style ) . '" />';
					echo '</a>';
					echo '</div>';
				}
			}

			$theme_blocks_content_style = '';
			if ( $theme_blocks_card_padding > 0 ) {
				$theme_blocks_content_style .= 'padding:' . $theme_blocks_card_padding . 'px;';
			}

			echo '<div class="theme-blocks-post-content" style="' . esc_attr( $theme_blocks_content_style ) . '">';

			// Display meta
			if ( $theme_blocks_display_date || $theme_blocks_display_author ) {
				$theme_blocks_meta_style = '';
				if ( ! empty( $theme_blocks_meta_color ) ) {
					$theme_blocks_meta_style .= 'color:' . $theme_blocks_meta_color . ';';
				}
				if ( $theme_blocks_meta_font_size > 0 ) {
					$theme_blocks_meta_style .= 'font-size:' . $theme_blocks_meta_font_size . 'px;';
				}
				if ( ! empty( $theme_blocks_meta_font_weight ) ) {
					$theme_blocks_meta_style .= 'font-weight:' . $theme_blocks_meta_font_weight . ';';
				}
				if ( ! empty( $theme_blocks_meta_font_family ) ) {
					$theme_blocks_meta_style .= 'font-family:' . $theme_blocks_meta_font_family . ';';
				}

				echo '<div class="theme-blocks-post-meta" style="' . esc_attr( $theme_blocks_meta_style ) . '">';

				if ( $theme_blocks_display_date ) {
					echo '<span class="theme-blocks-post-date">';
					echo esc_html( get_the_date() );
					echo '</span>';
				}

				if ( $theme_blocks_display_author ) {
					echo '<span class="theme-blocks-post-author">';
					echo esc_html__( 'By ', 'theme-blocks'  ) . esc_html( get_the_author() );
					echo '</span>';
				}

				echo '</div>';
			}

			// Display title
			if ( $theme_blocks_display_title ) {
				$theme_blocks_title_style = '';
				if ( ! empty( $theme_blocks_title_color ) ) {
					$theme_blocks_title_style .= 'color:' . $theme_blocks_title_color . ';';
				}
				if ( $theme_blocks_title_font_size > 0 ) {
					$theme_blocks_title_style .= 'font-size:' . $theme_blocks_title_font_size . 'px;';
				}
				if ( ! empty( $theme_blocks_title_font_weight ) ) {
					$theme_blocks_title_style .= 'font-weight:' . $theme_blocks_title_font_weight . ';';
				}
				if ( ! empty( $theme_blocks_title_font_family ) ) {
					$theme_blocks_title_style .= 'font-family:' . $theme_blocks_title_font_family . ';';
				}

				echo '<h3 class="theme-blocks-post-title" style="' . esc_attr( $theme_blocks_title_style ) . '">';
				echo '<a href="' . esc_url( get_permalink() ) . '" style="' . esc_attr( $theme_blocks_title_style ) . '">';
				echo esc_html( get_the_title() );
				echo '</a>';
				echo '</h3>';
			}

			// Display excerpt
			if ( $theme_blocks_display_excerpt ) {
				$theme_blocks_excerpt_style = '';
				if ( ! empty( $theme_blocks_excerpt_color ) ) {
					$theme_blocks_excerpt_style .= 'color:' . $theme_blocks_excerpt_color . ';';
				}
				if ( $theme_blocks_excerpt_font_size > 0 ) {
					$theme_blocks_excerpt_style .= 'font-size:' . $theme_blocks_excerpt_font_size . 'px;';
				}
				if ( ! empty( $theme_blocks_excerpt_font_weight ) ) {
					$theme_blocks_excerpt_style .= 'font-weight:' . $theme_blocks_excerpt_font_weight . ';';
				}
				if ( ! empty( $theme_blocks_excerpt_font_family ) ) {
					$theme_blocks_excerpt_style .= 'font-family:' . $theme_blocks_excerpt_font_family . ';';
				}

				echo '<div class="theme-blocks-post-excerpt" style="' . esc_attr( $theme_blocks_excerpt_style ) . '">';

				// Get excerpt content
				$theme_blocks_excerpt_content = get_the_excerpt();

				// Apply character limit if set
				if ( $theme_blocks_excerpt_max_chars > 0 ) {
					$theme_blocks_plain_text = wp_strip_all_tags( $theme_blocks_excerpt_content );
					if ( strlen( $theme_blocks_plain_text ) > $theme_blocks_excerpt_max_chars ) {
						$theme_blocks_excerpt_content = substr( $theme_blocks_plain_text, 0, $theme_blocks_excerpt_max_chars ) . '…';
					}
				}

				echo wp_kses_post( $theme_blocks_excerpt_content );
				echo '</div>';
			}

			// Read more link
			$theme_blocks_link_style = '';
			if ( ! empty( $theme_blocks_link_color ) ) {
				$theme_blocks_link_style .= 'color:' . $theme_blocks_link_color . ';';
			}
			if ( $theme_blocks_link_font_size > 0 ) {
				$theme_blocks_link_style .= 'font-size:' . $theme_blocks_link_font_size . 'px;';
			}
			if ( ! empty( $theme_blocks_link_font_weight ) ) {
				$theme_blocks_link_style .= 'font-weight:' . $theme_blocks_link_font_weight . ';';
			}
			if ( ! empty( $theme_blocks_link_font_family ) ) {
				$theme_blocks_link_style .= 'font-family:' . $theme_blocks_link_font_family . ';';
			}

			echo '<a href="' . esc_url( get_permalink() ) . '" class="theme-blocks-post-read-more" style="' . esc_attr( $theme_blocks_link_style ) . '">';
			echo esc_html__( 'Read More →', 'theme-blocks'  );
			echo '</a>';

			echo '</div>'; // .theme-blocks-post-content
			echo '</li>'; // .theme-blocks-post-item
		}

		echo '</ul>';
		echo '</div>';

		wp_reset_postdata();

		return ob_get_clean();
	}
}
