<?php
/**
 * WooCommerce Category Grid Block Renderer
 *
 * @package ZepBlocks
 */

namespace ZepBlocks;

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
		$cache_key = 'zepblocks_woo_category_grid_' . md5( wp_json_encode( $attributes ) );

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
			return '<div class="zepblocks-woo-notice">' .
				'<div class="zepblocks-woo-notice-icon">🛒</div>' .
				'<div class="zepblocks-woo-notice-content">' .
				'<h3>' . esc_html__( 'WooCommerce Required', 'zepblocks'  ) . '</h3>' .
				'<p>' . esc_html__( 'Please activate the WooCommerce plugin to use this block.', 'zepblocks'  ) . '</p>' .
				'</div>' .
				'</div>';
		}

		// Parse attributes
		$zepblocks_columns              = isset( $attributes['columns'] ) ? intval( $attributes['columns'] ) : 3;
		$zepblocks_categories_per_page  = isset( $attributes['categoriesPerPage'] ) ? intval( $attributes['categoriesPerPage'] ) : 9;
		$zepblocks_order_by             = isset( $attributes['orderBy'] ) ? sanitize_text_field( $attributes['orderBy'] ) : 'name';
		$zepblocks_order                = isset( $attributes['order'] ) ? sanitize_text_field( $attributes['order'] ) : 'ASC';
		$zepblocks_hide_empty           = isset( $attributes['hideEmpty'] ) ? (bool) $attributes['hideEmpty'] : true;
		$zepblocks_show_image           = isset( $attributes['showImage'] ) ? (bool) $attributes['showImage'] : true;
		$zepblocks_show_count           = isset( $attributes['showCount'] ) ? (bool) $attributes['showCount'] : true;
		$zepblocks_image_size           = isset( $attributes['imageSize'] ) ? sanitize_text_field( $attributes['imageSize'] ) : 'medium';
		$zepblocks_exclude_categories   = isset( $attributes['excludeCategories'] ) ? array_map( 'intval', $attributes['excludeCategories'] ) : array();

		// Build category query args
		$zepblocks_tax_args = array(
			'taxonomy'     => 'product_cat',
			'orderby'      => $zepblocks_order_by,
			'order'        => $zepblocks_order,
			'hide_empty'   => $zepblocks_hide_empty,
			'number'       => $zepblocks_categories_per_page,
		);

		// Get all categories
		$zepblocks_all_categories = get_terms( $zepblocks_tax_args );

		// Filter out excluded categories to avoid performance issues with exclude parameter
		if ( empty( $zepblocks_all_categories ) || is_wp_error( $zepblocks_all_categories ) ) {
			return '<div class="wpl-no-categories">' . esc_html__( 'No categories found.', 'zepblocks'  ) . '</div>';
		}

		// Filter out excluded categories
		$zepblocks_categories = array();
		if ( ! empty( $zepblocks_exclude_categories ) ) {
			foreach ( $zepblocks_all_categories as $zepblocks_category ) {
				if ( ! in_array( $zepblocks_category->term_id, $zepblocks_exclude_categories, true ) ) {
					$zepblocks_categories[] = $zepblocks_category;
				}
			}
		} else {
			$zepblocks_categories = $zepblocks_all_categories;
		}

		if ( empty( $zepblocks_categories ) || is_wp_error( $zepblocks_categories ) ) {
			return '<div class="wpl-no-categories">' . esc_html__( 'No categories found.', 'zepblocks'  ) . '</div>';
		}

		$zepblocks_column_class = 12 / $zepblocks_columns;

		ob_start();
		?>
		<div class="zepblocks-product-category">
			<div class="zepblocks-row cats">
				<?php foreach ( $zepblocks_categories as $zepblocks_category ) :
					$zepblocks_term_id       = $zepblocks_category->term_id;
					$zepblocks_term_link     = get_term_link( $zepblocks_category );
					$zepblocks_category_name = $zepblocks_category->name;
					$zepblocks_product_count = $zepblocks_category->count;

					// Get category thumbnail
					$zepblocks_thumbnail_id = get_term_meta( $zepblocks_term_id, 'thumbnail_id', true );
					$zepblocks_image_url    = '';

					if ( $zepblocks_show_image && $zepblocks_thumbnail_id ) {
						$zepblocks_image_url = wp_get_attachment_image_url( $zepblocks_thumbnail_id, $zepblocks_image_size );
					}

					// Placeholder SVG (no image)
					if ( $zepblocks_show_image && empty( $zepblocks_image_url ) ) {
						$zepblocks_image_url = 'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'300\' height=\'300\' viewBox=\'0 0 300 300\'%3E%3Crect width=\'300\' height=\'300\' fill=\'%23f0f0f0\'/%3E%3Ctext x=\'50%25\' y=\'50%25\' dominant-baseline=\'middle\' text-anchor=\'middle\' font-family=\'sans-serif\' font-size=\'14\' fill=\'%23999\'%3ENo Image%3C/text%3E%3C/svg%3E';
					}
					?>
					<div class="zepblocks-col-<?php echo esc_attr( $zepblocks_column_class ); ?>">
						<div class="item">
							<a href="<?php echo esc_url( $zepblocks_term_link ); ?>">
								<div class="iconbox">
									<?php if ( $zepblocks_show_image && $zepblocks_image_url ) : ?>
										<div class="icon">
											<img
												class="category-thumbnail"
												src="<?php echo esc_url( $zepblocks_image_url ); ?>"
												alt="<?php echo esc_attr( $zepblocks_category_name ); ?>"
											/>
										</div>
									<?php endif; ?>

									<div class="details">
										<h5 class="title"><?php echo esc_html( $zepblocks_category_name ); ?></h5>
										<?php if ( $zepblocks_show_count && $zepblocks_product_count > 0 ) : ?>
											<p>
												<?php echo esc_html( $zepblocks_product_count ); ?>
												<?php
													echo esc_html(
														$zepblocks_product_count === 1
															? __( 'product', 'zepblocks'  )
															: __( 'products', 'zepblocks'  )
													);
												?>
											</p>
										<?php endif; ?>
									</div>
								</div>
							</a>
						</div>
					</div>
				<?php endforeach; ?>
			</div>
		</div>
		<?php

		return ob_get_clean();
	}
}
