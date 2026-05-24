<?php
/**
 * WooCommerce Category Grid Block Renderer
 *
 * @package ThemeBlocks
 */

namespace ThemeBlocks;

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
		$cache_key = 'theme_blocks_woo_category_grid_' . md5( wp_json_encode( $attributes ) );

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
			return '<div class="theme-blocks-woo-notice">' .
				'<div class="theme-blocks-woo-notice-icon">🛒</div>' .
				'<div class="theme-blocks-woo-notice-content">' .
				'<h3>' . esc_html__( 'WooCommerce Required', 'theme-blocks'  ) . '</h3>' .
				'<p>' . esc_html__( 'Please activate the WooCommerce plugin to use this block.', 'theme-blocks'  ) . '</p>' .
				'</div>' .
				'</div>';
		}

		// Parse attributes
		$theme_blocks_columns              = isset( $attributes['columns'] ) ? intval( $attributes['columns'] ) : 3;
		$theme_blocks_categories_per_page  = isset( $attributes['categoriesPerPage'] ) ? intval( $attributes['categoriesPerPage'] ) : 9;
		$theme_blocks_order_by             = isset( $attributes['orderBy'] ) ? sanitize_text_field( $attributes['orderBy'] ) : 'name';
		$theme_blocks_order                = isset( $attributes['order'] ) ? sanitize_text_field( $attributes['order'] ) : 'ASC';
		$theme_blocks_hide_empty           = isset( $attributes['hideEmpty'] ) ? (bool) $attributes['hideEmpty'] : true;
		$theme_blocks_show_image           = isset( $attributes['showImage'] ) ? (bool) $attributes['showImage'] : true;
		$theme_blocks_show_count           = isset( $attributes['showCount'] ) ? (bool) $attributes['showCount'] : true;
		$theme_blocks_image_size           = isset( $attributes['imageSize'] ) ? sanitize_text_field( $attributes['imageSize'] ) : 'medium';
		$theme_blocks_exclude_categories   = isset( $attributes['excludeCategories'] ) ? array_map( 'intval', $attributes['excludeCategories'] ) : array();

		// Build category query args
		$theme_blocks_tax_args = array(
			'taxonomy'     => 'product_cat',
			'orderby'      => $theme_blocks_order_by,
			'order'        => $theme_blocks_order,
			'hide_empty'   => $theme_blocks_hide_empty,
			'number'       => $theme_blocks_categories_per_page,
		);

		// Get all categories
		$theme_blocks_all_categories = get_terms( $theme_blocks_tax_args );

		// Filter out excluded categories to avoid performance issues with exclude parameter
		if ( empty( $theme_blocks_all_categories ) || is_wp_error( $theme_blocks_all_categories ) ) {
			return '<div class="wpl-no-categories">' . esc_html__( 'No categories found.', 'theme-blocks'  ) . '</div>';
		}

		// Filter out excluded categories
		$theme_blocks_categories = array();
		if ( ! empty( $theme_blocks_exclude_categories ) ) {
			foreach ( $theme_blocks_all_categories as $theme_blocks_category ) {
				if ( ! in_array( $theme_blocks_category->term_id, $theme_blocks_exclude_categories, true ) ) {
					$theme_blocks_categories[] = $theme_blocks_category;
				}
			}
		} else {
			$theme_blocks_categories = $theme_blocks_all_categories;
		}

		if ( empty( $theme_blocks_categories ) || is_wp_error( $theme_blocks_categories ) ) {
			return '<div class="wpl-no-categories">' . esc_html__( 'No categories found.', 'theme-blocks'  ) . '</div>';
		}

		$theme_blocks_column_class = 12 / $theme_blocks_columns;

		ob_start();
		?>
		<div class="theme-blocks-product-category">
			<div class="theme-blocks-row cats">
				<?php foreach ( $theme_blocks_categories as $theme_blocks_category ) :
					$theme_blocks_term_id       = $theme_blocks_category->term_id;
					$theme_blocks_term_link     = get_term_link( $theme_blocks_category );
					$theme_blocks_category_name = $theme_blocks_category->name;
					$theme_blocks_product_count = $theme_blocks_category->count;

					// Get category thumbnail
					$theme_blocks_thumbnail_id = get_term_meta( $theme_blocks_term_id, 'thumbnail_id', true );
					$theme_blocks_image_url    = '';

					if ( $theme_blocks_show_image && $theme_blocks_thumbnail_id ) {
						$theme_blocks_image_url = wp_get_attachment_image_url( $theme_blocks_thumbnail_id, $theme_blocks_image_size );
					}

					// Placeholder SVG (no image)
					if ( $theme_blocks_show_image && empty( $theme_blocks_image_url ) ) {
						$theme_blocks_image_url = 'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'300\' height=\'300\' viewBox=\'0 0 300 300\'%3E%3Crect width=\'300\' height=\'300\' fill=\'%23f0f0f0\'/%3E%3Ctext x=\'50%25\' y=\'50%25\' dominant-baseline=\'middle\' text-anchor=\'middle\' font-family=\'sans-serif\' font-size=\'14\' fill=\'%23999\'%3ENo Image%3C/text%3E%3C/svg%3E';
					}
					?>
					<div class="theme-blocks-col-<?php echo esc_attr( $theme_blocks_column_class ); ?>">
						<div class="item">
							<a href="<?php echo esc_url( $theme_blocks_term_link ); ?>">
								<div class="iconbox">
									<?php if ( $theme_blocks_show_image && $theme_blocks_image_url ) : ?>
										<div class="icon">
											<img
												class="category-thumbnail"
												src="<?php echo esc_url( $theme_blocks_image_url ); ?>"
												alt="<?php echo esc_attr( $theme_blocks_category_name ); ?>"
											/>
										</div>
									<?php endif; ?>

									<div class="details">
										<h5 class="title"><?php echo esc_html( $theme_blocks_category_name ); ?></h5>
										<?php if ( $theme_blocks_show_count && $theme_blocks_product_count > 0 ) : ?>
											<p>
												<?php echo esc_html( $theme_blocks_product_count ); ?>
												<?php
													echo esc_html(
														$theme_blocks_product_count === 1
															? __( 'product', 'theme-blocks'  )
															: __( 'products', 'theme-blocks'  )
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
