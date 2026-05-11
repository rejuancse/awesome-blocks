<?php
/**
 * WooCommerce Category Grid Block Renderer
 *
 * @package Awesome_Block
 */

namespace Awesome_Block;

defined( 'ABSPATH' ) || exit;

/**
 * WooCommerce Category Grid Block Class
 */
class Woo_Category_List {

	/**
	 * Render callback for WooCommerce Category Grid block
	 *
	 * @param array $attributes Block attributes.
	 * @return string Rendered HTML
	 */
	public static function render( $attributes ) {
		// Skip caching for admin users or during preview
		if ( current_user_can( 'edit_posts' ) || is_preview() ) {
			return self::render_content( $attributes );
		}

		// Generate cache key from block attributes
		ksort( $attributes );
		$cache_key = 'ab_woo_category_grid_' . md5( wp_json_encode( $attributes ) );

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
	 * Render WooCommerce Category Grid content
	 *
	 * @param array $attributes Block attributes.
	 * @return string Rendered HTML
	 */
	private static function render_content( $attributes ) {
		// Check if WooCommerce is active
		if ( ! class_exists( 'WooCommerce' ) ) {
			return '<div class="ab-woo-notice">' .
				'<div class="ab-woo-notice-icon">🛒</div>' .
				'<div class="ab-woo-notice-content">' .
				'<h3>' . esc_html__( 'WooCommerce Required', 'awesome-blocks' ) . '</h3>' .
				'<p>' . esc_html__( 'Please activate the WooCommerce plugin to use this block.', 'awesome-blocks' ) . '</p>' .
				'</div>' .
				'</div>';
		}

		// Parse attributes
		$columns              = isset( $attributes['columns'] ) ? intval( $attributes['columns'] ) : 3;
		$categories_per_page  = isset( $attributes['categoriesPerPage'] ) ? intval( $attributes['categoriesPerPage'] ) : 9;
		$order_by             = isset( $attributes['orderBy'] ) ? sanitize_text_field( $attributes['orderBy'] ) : 'name';
		$order                = isset( $attributes['order'] ) ? sanitize_text_field( $attributes['order'] ) : 'ASC';
		$hide_empty           = isset( $attributes['hideEmpty'] ) ? (bool) $attributes['hideEmpty'] : true;
		$show_image           = isset( $attributes['showImage'] ) ? (bool) $attributes['showImage'] : true;
		$show_count           = isset( $attributes['showCount'] ) ? (bool) $attributes['showCount'] : true;
		$image_size           = isset( $attributes['imageSize'] ) ? sanitize_text_field( $attributes['imageSize'] ) : 'medium';
		$exclude_categories   = isset( $attributes['excludeCategories'] ) ? array_map( 'intval', $attributes['excludeCategories'] ) : array();

		// Build category query args
		$tax_args = array(
			'taxonomy'     => 'product_cat',
			'orderby'      => $order_by,
			'order'        => $order,
			'hide_empty'   => $hide_empty,
			'number'       => $categories_per_page,
			'exclude'      => $exclude_categories,
		);

		// Get categories
		$categories = get_terms( $tax_args );

		if ( empty( $categories ) || is_wp_error( $categories ) ) {
			return '<div class="wpl-no-categories">' . esc_html__( 'No categories found.', 'awesome-blocks' ) . '</div>';
		}

		$column_class = 12 / $columns;

		ob_start();

		?>
		<div class="ab-category-grid">
			<div class="ab-row">
				<?php foreach ( $categories as $category ) :
					$term_id       = $category->term_id;
					$term_link     = get_term_link( $category );
					$category_name = $category->name;
					$product_count = $category->count;

					// Get category thumbnail
					$thumbnail_id = get_term_meta( $term_id, 'thumbnail_id', true );
					$image_url    = '';

					if ( $show_image && $thumbnail_id ) {
						$image_url = wp_get_attachment_image_url( $thumbnail_id, $image_size );
					}

					// Placeholder image
					if ( $show_image && empty( $image_url ) ) {
						$image_url = wc_placeholder_img_src();
					}
					?>
					<div class="ab-col-<?php echo esc_attr( $column_class ); ?>">
						<div class="ab-category-card">
							<?php if ( $show_image && $image_url ) : ?>
								<div class="ab-category-image-wrapper">
									<a href="<?php echo esc_url( $term_link ); ?>" class="ab-category-image">
										<img
											src="<?php echo esc_url( $image_url ); ?>"
											alt="<?php echo esc_attr( $category_name ); ?>"
											class="img-fluid"
										/>
									</a>
								</div>
							<?php endif; ?>

							<div class="ab-category-details">
								<h3 class="ab-category-title">
									<a href="<?php echo esc_url( $term_link ); ?>">
										<?php echo esc_html( $category_name ); ?>
									</a>
								</h3>

								<?php if ( $show_count && $product_count > 0 ) : ?>
									<div class="ab-category-count">
										<span class="ab-count-number"><?php echo esc_html( $product_count ); ?></span>
										<span class="ab-count-label">
											<?php
												echo esc_html(
													$product_count === 1
														? __( 'product', 'awesome-blocks' )
														: __( 'products', 'awesome-blocks' )
												);
											?>
										</span>
									</div>
								<?php endif; ?>
							</div>
						</div>
					</div>
				<?php endforeach; ?>
			</div>
		</div>
		<?php

		return ob_get_clean();
	}
}
