<?php
/**
 * WooCommerce Product List Block Renderer
 *
 * @package ThemeBlocks
 */

namespace ThemeBlocks;

defined( 'ABSPATH' ) || exit;

/**
 * WooCommerce Product List Block Class
 */
class Woo_Product_List {

	/**
	 * Render callback for WooCommerce Product List block
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
		$cache_key = 'theme_blocks_woo_product_list_' . md5( wp_json_encode( $attributes ) );

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
	 * Render WooCommerce Product List content
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
				'<h3>' . esc_html__( 'WooCommerce Required', 'theme-blocks' ) . '</h3>' .
				'<p>' . esc_html__( 'Please activate the WooCommerce plugin to use this block.', 'theme-blocks' ) . '</p>' .
				'</div>' .
				'</div>';
		}

		// Parse attributes
		$columns             = isset( $attributes['columns'] ) ? intval( $attributes['columns'] ) : 3;
		$products_per_page   = isset( $attributes['productsPerPage'] ) ? intval( $attributes['productsPerPage'] ) : 6;
		$order_by            = isset( $attributes['orderBy'] ) ? sanitize_text_field( $attributes['orderBy'] ) : 'date';
		$order               = isset( $attributes['order'] ) ? sanitize_text_field( $attributes['order'] ) : 'DESC';
		$selected_categories = isset( $attributes['selectedCategories'] ) ? array_map( 'intval', $attributes['selectedCategories'] ) : array();
		$show_category       = isset( $attributes['showCategory'] ) ? (bool) $attributes['showCategory'] : true;
		$show_rating         = isset( $attributes['showRating'] ) ? (bool) $attributes['showRating'] : true;
		$show_price          = isset( $attributes['showPrice'] ) ? (bool) $attributes['showPrice'] : true;
		$show_add_to_cart    = isset( $attributes['showAddToCart'] ) ? (bool) $attributes['showAddToCart'] : true;
		$show_badges         = isset( $attributes['showBadges'] ) ? (bool) $attributes['showBadges'] : true;
		$badge_position      = isset( $attributes['badgePosition'] ) ? sanitize_text_field( $attributes['badgePosition'] ) : 'top-left';

		// Build query args
		$query_args = array(
			'post_type'      => 'product',
			'posts_per_page' => $products_per_page,
			'orderby'        => $order_by,
			'order'          => $order,
			'post_status'    => 'publish',
		);

		// Filter by selected categories.
		if ( ! empty( $selected_categories ) ) {
			$tax_query = array(
				array(
					'taxonomy' => 'product_cat',
					'field'    => 'term_id',
					'terms'    => $selected_categories,
				),
			);
			$query_args['tax_query'] = $tax_query; // phpcs:ignore WordPress.DB.SlowDBQuery.slow_db_query_tax_query -- Necessary for category filtering, performance mitigated by transient caching.
		}

		// Handle special order by cases.
		if ( 'price' === $order_by ) {
			$query_args['orderby']  = 'meta_value_num';
			$query_args['meta_key'] = '_price'; // phpcs:ignore WordPress.DB.SlowDBQuery.slow_db_query_meta_key -- Necessary for price sorting, performance mitigated by transient caching.
		} elseif ( 'popularity' === $order_by ) {
			$query_args['orderby']  = 'meta_value_num';
			$query_args['meta_key'] = 'total_sales'; // phpcs:ignore WordPress.DB.SlowDBQuery.slow_db_query_meta_key -- Necessary for popularity sorting, performance mitigated by transient caching.
		} elseif ( 'rating' === $order_by ) {
			$query_args['orderby']  = 'meta_value_num';
			$query_args['meta_key'] = '_wc_average_rating'; // phpcs:ignore WordPress.DB.SlowDBQuery.slow_db_query_meta_key -- Necessary for rating sorting, performance mitigated by transient caching.
		}

		$products = new \WP_Query( $query_args );

		if ( ! $products->have_posts() ) {
			return '<div class="wpl-no-products">' . esc_html__( 'No products found.', 'theme-blocks' ) . '</div>';
		}

		$column_class = 12 / $columns;
		$badge_class  = 'theme-blocks-badge-' . $badge_position;

		ob_start();

		?>
		<div class="theme-blocks-products-list">
			<div class="theme-blocks-row">
				<?php
				while ( $products->have_posts() ) :
					$products->the_post();
					global $product;

					if ( ! $product ) {
						continue;
					}

					$product_id        = $product->get_id();
					$product_title     = get_the_title();
					$product_link      = get_permalink();
					$product_image     = wp_get_attachment_image_url( $product->get_image_id(), 'woocommerce_thumbnail' );
					$product_image_alt = get_post_meta( $product->get_image_id(), '_wp_attachment_image_alt', true );

					if ( ! $product_image ) {
						$product_image = wc_placeholder_img_src();
					}

					// Get product categories
					$product_categories = get_the_terms( $product_id, 'product_cat' );
					$category_output    = '';
					if ( $show_category && $product_categories && ! is_wp_error( $product_categories ) ) {
						$categories     = array_slice( $product_categories, 0, 2 );
						$category_links = array();
						foreach ( $categories as $category ) {
							$category_links[] = '<a href="' . esc_url( get_term_link( $category ) ) . '" rel="tag">' . esc_html( $category->name ) . '</a>';
						}
						$category_output = implode( ' ', $category_links );
					}

					// Rating
					$rating_output = '';
					if ( $show_rating && $product->get_average_rating() > 0 ) {
						$rating       = $product->get_average_rating();
						$rating_count = $product->get_rating_count();
						$width        = ( $rating / 5 ) * 100;

						/* translators: %s: Rating value */
						$rating_title = sprintf( __( 'Rated %s out of 5', 'theme-blocks' ), $rating );

						$rating_output = '
							<div class="theme-blocks-product-rating">
								<div class="star-rating" title="' . esc_attr( $rating_title ) . '">
									<span style="width:' . esc_attr( $width ) . '%">
										<strong class="rating">' . esc_html( $rating ) . '</strong>
										' . esc_html__( 'out of', 'theme-blocks' ) . ' <span>5</span>
									</span>
								</div>
								<div class="theme-blocks-review-count">(' . esc_html( $rating_count ) . ')</div>
							</div>
						';
					}

					// Price
					$price_output = '';
					if ( $show_price ) {
						$price_output = '<div class="theme-blocks-product-price">' . $product->get_price_html() . '</div>';
					}

					// Add to cart
					$add_to_cart_output = '';
					if ( $show_add_to_cart ) {
						$add_to_cart_url    = esc_url( $product->add_to_cart_url() );
						$add_to_cart_text   = esc_html( $product->add_to_cart_text() );
						$add_to_cart_output = '<a href="' . $add_to_cart_url . '" class="theme-blocks-add-to-cart button" data-product_id="' . esc_attr( $product_id ) . '">' . $add_to_cart_text . '</a>';
					}

					// Badges (Sale/New)
					$badges_output = '';
					if ( $show_badges ) {
						$badges = array();
						if ( $product->is_on_sale() ) {
							$regular_price = $product->get_regular_price();
							$sale_price    = $product->get_sale_price();
							if ( $regular_price && $sale_price ) {
								$percentage = round( ( ( $regular_price - $sale_price ) / $regular_price ) * 100 );
								$badges[]   = '<span class="theme-blocks-discount-badge">-' . $percentage . '%</span>';
							}
						}
						if ( ! empty( $badges ) ) {
							$badges_output = '<div class="theme-blocks-product-badges ' . esc_attr( $badge_class ) . '">' . implode( '', $badges ) . '</div>';
						}
					}
					?>
					<div class="theme-blocks-col-<?php echo esc_attr( $column_class ); ?>">
						<div class="theme-blocks-product-card">
							<div class="theme-blocks-product-image-wrapper">
								<a href="<?php echo esc_url( $product_link ); ?>" class="theme-blocks-product-image">
									<img
										src="<?php echo esc_url( $product_image ); ?>"
										alt="<?php echo esc_attr( $product_image_alt ?: $product_title ); ?>"
										class="img-fluid wp-post-image"
									/>
								</a>
								<?php echo wp_kses_post( $badges_output ); ?>
							</div>

							<div class="theme-blocks-product-details">
								<?php if ( $category_output ) : ?>
									<div class="theme-blocks-product-category">
										<?php echo wp_kses_post( $category_output ); ?>
									</div>
								<?php endif; ?>

								<h3 class="theme-blocks-product-title">
									<a href="<?php echo esc_url( $product_link ); ?>">
										<?php echo esc_html( $product_title ); ?>
									</a>
								</h3>

								<?php echo wp_kses_post( $rating_output ); ?>
								<?php echo wp_kses_post( $price_output ); ?>
								<?php echo wp_kses_post( $add_to_cart_output ); ?>
							</div>
						</div>
					</div>
					<?php
				endwhile;
				wp_reset_postdata();
				?>
			</div>
		</div>
		<?php
		return ob_get_clean();
	}
}
