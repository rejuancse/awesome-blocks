<?php
/**
 * Post Block Renderer
 *
 * @package Awesome_Block
 */

namespace Awesome_Block;

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
		$cache_key = 'ab_post_block_' . md5( wp_json_encode( $attributes ) );

		// Try to get from cache
		$cached = get_transient( $cache_key );
		if ( false !== $cached ) {
			return $cached;
		}

		// Generate content
		$content = self::render_content( $attributes );

		// Cache for 1 hour
		set_transient( $cache_key, $content, HOUR_IN_SECONDS );

		return $content;
	}

	/**
	 * Render Post Block Content
	 *
	 * @param array $attributes Block attributes.
	 * @return string HTML output.
	 */
	private static function render_content( $attributes ) {
		// Get attributes
		$posts_to_show     = isset( $attributes['postsToShow'] ) ? intval( $attributes['postsToShow'] ) : 3;
		$order             = isset( $attributes['order'] ) ? sanitize_text_field( $attributes['order'] ) : 'desc';
		$order_by          = isset( $attributes['orderBy'] ) ? sanitize_text_field( $attributes['orderBy'] ) : 'date';
		$columns           = isset( $attributes['columns'] ) ? intval( $attributes['columns'] ) : 3;
		$display_title     = isset( $attributes['displayTitle'] ) ? (bool) $attributes['displayTitle'] : true;
		$display_excerpt   = isset( $attributes['displayExcerpt'] ) ? (bool) $attributes['displayExcerpt'] : true;
		$display_date      = isset( $attributes['displayDate'] ) ? (bool) $attributes['displayDate'] : true;
		$display_author    = isset( $attributes['displayAuthor'] ) ? (bool) $attributes['displayAuthor'] : false;
		$display_thumbnail = isset( $attributes['displayThumbnail'] ) ? (bool) $attributes['displayThumbnail'] : true;
		$thumbnail_size    = isset( $attributes['thumbnailSize'] ) ? sanitize_text_field( $attributes['thumbnailSize'] ) : 'medium';
		$categories        = isset( $attributes['categories'] ) ? $attributes['categories'] : array();

		// Style attributes
		$title_color          = isset( $attributes['titleColor'] ) ? sanitize_text_field( $attributes['titleColor'] ) : '#333333';
		$title_font_size      = isset( $attributes['titleFontSize'] ) ? intval( $attributes['titleFontSize'] ) : 22;
		$title_font_weight    = isset( $attributes['titleFontWeight'] ) ? sanitize_text_field( $attributes['titleFontWeight'] ) : '600';
		$title_font_family    = isset( $attributes['titleFontFamily'] ) ? sanitize_text_field( $attributes['titleFontFamily'] ) : '';

		$excerpt_color        = isset( $attributes['excerptColor'] ) ? sanitize_text_field( $attributes['excerptColor'] ) : '#555555';
		$excerpt_font_size    = isset( $attributes['excerptFontSize'] ) ? intval( $attributes['excerptFontSize'] ) : 15;

		$meta_color           = isset( $attributes['metaColor'] ) ? sanitize_text_field( $attributes['metaColor'] ) : '#666666';
		$meta_font_size       = isset( $attributes['metaFontSize'] ) ? intval( $attributes['metaFontSize'] ) : 14;

		$link_color           = isset( $attributes['linkColor'] ) ? sanitize_text_field( $attributes['linkColor'] ) : '#0073aa';
		$link_hover_color     = isset( $attributes['linkHoverColor'] ) ? sanitize_text_field( $attributes['linkHoverColor'] ) : '#005177';

		$card_bg_color        = isset( $attributes['cardBgColor'] ) ? sanitize_text_field( $attributes['cardBgColor'] ) : '#ffffff';
		$card_border          = isset( $attributes['cardBorder'] ) ? sanitize_text_field( $attributes['cardBorder'] ) : 'none';
		$card_border_radius   = isset( $attributes['cardBorderRadius'] ) ? intval( $attributes['cardBorderRadius'] ) : 8;
		$card_padding         = isset( $attributes['cardPadding'] ) ? intval( $attributes['cardPadding'] ) : 20;

		$thumbnail_border_radius = isset( $attributes['thumbnailBorderRadius'] ) ? intval( $attributes['thumbnailBorderRadius'] ) : 0;
		$thumbnail_height        = isset( $attributes['thumbnailHeight'] ) ? intval( $attributes['thumbnailHeight'] ) : 0;

		$gap                  = isset( $attributes['gap'] ) ? intval( $attributes['gap'] ) : 30;

		// Generate unique ID for this block instance
		$block_unique_id = 'ab-post-block-' . uniqid();

		// Enqueue Google Fonts if a custom font is selected
		$google_fonts_url = '';
		if ( ! empty( $title_font_family ) ) {
			// Extract font name from font-family string
			$font_name = str_replace( "'", '', explode( ',', $title_font_family )[0] );
			$google_fonts_url = 'https://fonts.googleapis.com/css2?family=' . str_replace( ' ', '+', $font_name ) . '&display=swap';

			// Enqueue the font
			wp_enqueue_style( 'ab-google-font-' . sanitize_title( $font_name ), $google_fonts_url, array(), null );
		}

		// Query arguments
		$args = array(
			'post_type'      => 'post',
			'post_status'    => 'publish',
			'posts_per_page' => $posts_to_show,
			'order'          => $order,
			'orderby'        => $order_by,
			'ignore_sticky_posts' => 1,
		);

		// Filter by categories
		if ( ! empty( $categories ) && is_array( $categories ) ) {
			$args['category__in'] = $categories;
		}

		$query = new \WP_Query( $args );

		if ( ! $query->have_posts() ) {
			return '<p>' . esc_html__( 'No posts found.', 'awesome-blocks' ) . '</p>';
		}

		// Start output
		ob_start();

		$custom_css = "
			#{$block_unique_id} {
				--ab-link-hover-color: {$link_hover_color};
			}
		";

		echo '<style>' . esc_html( $custom_css ) . '</style>';
		echo '<div class="wp-block-awesome-post-block" id="' . esc_attr( $block_unique_id ) . '">';
		echo '<ul class="ab-posts-grid columns-' . esc_attr( $columns ) . '" style="gap: ' . esc_attr( $gap ) . 'px;">';

		while ( $query->have_posts() ) {
			$query->the_post();

			// Build card styles
			$card_style = '';
			if ( ! empty( $card_bg_color ) ) {
				$card_style .= 'background-color:' . $card_bg_color . ';';
			}
			if ( ! empty( $card_border ) && $card_border !== 'none' ) {
				$card_style .= 'border:' . $card_border . ';';
			}
			if ( $card_border_radius > 0 ) {
				$card_style .= 'border-radius:' . $card_border_radius . 'px;';
			}

			echo '<li class="ab-post-item" style="' . esc_attr( $card_style ) . '">';

			// Display thumbnail
			if ( $display_thumbnail && has_post_thumbnail() ) {
				$thumb_style = '';
				if ( $thumbnail_border_radius > 0 ) {
					$thumb_style .= 'border-radius:' . $thumbnail_border_radius . 'px;';
				}
				if ( $thumbnail_height > 0 ) {
					$thumb_style .= 'height:' . $thumbnail_height . 'px;';
				}

				$image_id = get_post_thumbnail_id();
				$image_src = wp_get_attachment_image_src( $image_id, $thumbnail_size );
				$image_url = $image_src ? $image_src[0] : '';
				$image_alt = get_post_meta( $image_id, '_wp_attachment_image_alt', true );

				if ( $image_url ) {
					echo '<div class="ab-post-thumbnail">';
					echo '<a href="' . esc_url( get_permalink() ) . '">';
					echo '<img src="' . esc_url( $image_url ) . '" alt="' . esc_attr( $image_alt ) . '" style="' . esc_attr( $thumb_style ) . '" />';
					echo '</a>';
					echo '</div>';
				}
			}

			$content_style = '';
			if ( $card_padding > 0 ) {
				$content_style .= 'padding:' . $card_padding . 'px;';
			}

			echo '<div class="ab-post-content" style="' . esc_attr( $content_style ) . '">';

			// Display meta
			if ( $display_date || $display_author ) {
				$meta_style = '';
				if ( ! empty( $meta_color ) ) {
					$meta_style .= 'color:' . $meta_color . ';';
				}
				if ( $meta_font_size > 0 ) {
					$meta_style .= 'font-size:' . $meta_font_size . 'px;';
				}

				echo '<div class="ab-post-meta" style="' . esc_attr( $meta_style ) . '">';

				if ( $display_date ) {
					echo '<span class="ab-post-date">';
					echo esc_html( get_the_date() );
					echo '</span>';
				}

				if ( $display_author ) {
					echo '<span class="ab-post-author">';
					echo esc_html__( 'By ', 'awesome-blocks' ) . esc_html( get_the_author() );
					echo '</span>';
				}

				echo '</div>';
			}

			// Display title
			if ( $display_title ) {
				$title_style = '';
				if ( ! empty( $title_color ) ) {
					$title_style .= 'color:' . $title_color . ';';
				}
				if ( $title_font_size > 0 ) {
					$title_style .= 'font-size:' . $title_font_size . 'px;';
				}
				if ( ! empty( $title_font_weight ) ) {
					$title_style .= 'font-weight:' . $title_font_weight . ';';
				}
				if ( ! empty( $title_font_family ) ) {
					$title_style .= 'font-family:' . $title_font_family . ';';
				}

				echo '<h3 class="ab-post-title" style="' . esc_attr( $title_style ) . '">';
				echo '<a href="' . esc_url( get_permalink() ) . '" style="' . esc_attr( $title_style ) . '">';
				echo esc_html( get_the_title() );
				echo '</a>';
				echo '</h3>';
			}

			// Display excerpt
			if ( $display_excerpt ) {
				$excerpt_style = '';
				if ( ! empty( $excerpt_color ) ) {
					$excerpt_style .= 'color:' . $excerpt_color . ';';
				}
				if ( $excerpt_font_size > 0 ) {
					$excerpt_style .= 'font-size:' . $excerpt_font_size . 'px;';
				}

				echo '<div class="ab-post-excerpt" style="' . esc_attr( $excerpt_style ) . '">';
				echo wp_kses_post( get_the_excerpt() );
				echo '</div>';
			}

			// Read more link
			$link_style = '';
			if ( ! empty( $link_color ) ) {
				$link_style .= 'color:' . $link_color . ';';
			}

			echo '<a href="' . esc_url( get_permalink() ) . '" class="ab-post-read-more" style="' . esc_attr( $link_style ) . '">';
			echo esc_html__( 'Read More →', 'awesome-blocks' );
			echo '</a>';

			echo '</div>'; // .ab-post-content
			echo '</li>'; // .ab-post-item
		}

		echo '</ul>';
		echo '</div>';

		wp_reset_postdata();

		return ob_get_clean();
	}
}
