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

		echo '<div class="wp-block-awesome-post-block">';
		echo '<ul class="ab-posts-grid columns-' . esc_attr( $columns ) . '">';

		while ( $query->have_posts() ) {
			$query->the_post();

			echo '<li class="ab-post-item">';

			// Display thumbnail
			if ( $display_thumbnail && has_post_thumbnail() ) {
				echo '<div class="ab-post-thumbnail">';
				echo '<a href="' . esc_url( get_permalink() ) . '">';
				the_post_thumbnail( $thumbnail_size );
				echo '</a>';
				echo '</div>';
			}

			echo '<div class="ab-post-content">';

			// Display meta
			if ( $display_date || $display_author ) {
				echo '<div class="ab-post-meta">';

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
				echo '<h3 class="ab-post-title">';
				echo '<a href="' . esc_url( get_permalink() ) . '">';
				echo esc_html( get_the_title() );
				echo '</a>';
				echo '</h3>';
			}

			// Display excerpt
			if ( $display_excerpt ) {
				echo '<div class="ab-post-excerpt">';
				echo wp_kses_post( get_the_excerpt() );
				echo '</div>';
			}

			// Read more link
			echo '<a href="' . esc_url( get_permalink() ) . '" class="ab-post-read-more">';
			echo esc_html__( 'Read More', 'awesome-blocks' );
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
