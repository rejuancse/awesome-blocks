<?php
/**
 * Count Down Block Renderer
 *
 * @package ZepBlocks
 */

namespace ZepBlocks;

defined( 'ABSPATH' ) || exit;

/**
 * Count Down Class
 */
class Count_Down {

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
	 * Render Count Down Block
	 *
	 * @param array $attributes Block attributes.
	 * @return string HTML output.
	 */
	public static function render( $attributes ) {
		// Get attributes
		$zepblocks_title           = isset( $attributes['title'] ) ? sanitize_text_field( $attributes['title'] ) : 'Special Offer Ends In:';
		$zepblocks_target_date     = isset( $attributes['targetDate'] ) ? sanitize_text_field( $attributes['targetDate'] ) : '';
		$zepblocks_expired_message = isset( $attributes['expiredMessage'] ) ? sanitize_text_field( $attributes['expiredMessage'] ) : 'This offer has expired!';
		$zepblocks_show_title      = isset( $attributes['showTitle'] ) ? (bool) $attributes['showTitle'] : true;
		$zepblocks_card_alignment  = isset( $attributes['cardAlignment'] ) ? sanitize_text_field( $attributes['cardAlignment'] ) : 'center';

		// Style attributes
		$zepblocks_box_bg_color     = isset( $attributes['boxBgColor'] ) ? self::sanitize_css_color( $attributes['boxBgColor'] ) : '#667eea';
		$zepblocks_text_color       = isset( $attributes['textColor'] ) ? self::sanitize_css_color( $attributes['textColor'] ) : '#141414';
		$zepblocks_label_color      = isset( $attributes['labelColor'] ) ? self::sanitize_css_color( $attributes['labelColor'] ) : '#e0e7ff';
		$zepblocks_expired_bg_color = isset( $attributes['expiredBgColor'] ) ? self::sanitize_css_color( $attributes['expiredBgColor'] ) : '#ef4444';

		// Generate unique ID for this block instance
		$zepblocks_block_unique_id = 'zepblocks-countdown-' . uniqid();

		// Check if expired
		$is_expired = false;
		if ( ! empty( $zepblocks_target_date ) ) {
			$target_timestamp = strtotime( $zepblocks_target_date );
			$current_timestamp = current_time( 'timestamp' );
			$is_expired = $current_timestamp >= $target_timestamp;
		}

		// Start output
		ob_start();

		echo '<div class="wp-block-zepblock-count-down" id="' . esc_attr( $zepblocks_block_unique_id ) . '">';

		// Build card styles
		$zepblocks_card_style = '';
		$zepblocks_card_style .= 'background:#ffffff;';
		$zepblocks_card_style .= 'border-radius:16px;';
		$zepblocks_card_style .= 'padding:40px 30px;';
		$zepblocks_card_style .= 'box-shadow:0 4px 20px rgba(0,0,0,0.08);';

		echo '<div class="cd-wrap cd-align-' . esc_attr( $zepblocks_card_alignment ) . '">';
		echo '<div class="cd-card" style="' . esc_attr( $zepblocks_card_style ) . '">';

		// Display title
		if ( $zepblocks_show_title && ! empty( $zepblocks_title ) ) {
			$title_style = '';
			$title_style .= 'font-size:28px;';
			$title_style .= 'font-weight:700;';
			$title_style .= 'margin-bottom:30px;';
			$title_style .= 'color:' . $zepblocks_text_color . ';';
			$title_style .= 'text-align:' . esc_attr( $zepblocks_card_alignment ) . ';';

			echo '<div class="cd-title" style="' . esc_attr( $title_style ) . '">';
			echo esc_html( $zepblocks_title );
			echo '</div>';
		}

		// Display expired message or countdown
		if ( $is_expired ) {
			$expired_style = '';
			$expired_style .= 'display:flex;';
			$expired_style .= 'align-items:center;';
			$expired_style .= 'justify-content:center;';
			$expired_style .= 'gap:15px;';
			$expired_style .= 'padding:30px 40px;';
			$expired_style .= 'border-radius:12px;';
			$expired_style .= 'background:' . $zepblocks_expired_bg_color . ';';
			$expired_style .= 'box-shadow:0 4px 15px rgba(239,68,68,0.3);';

			echo '<div class="cd-expired" style="' . esc_attr( $expired_style ) . '">';
			echo '<div class="cd-expired-icon">⚠️</div>';
			echo '<div class="cd-expired-message" style="font-size:24px;font-weight:700;color:#ffffff;line-height:1.3;">';
			echo esc_html( $zepblocks_expired_message );
			echo '</div>';
			echo '</div>';
		} else {
			// Countdown
			$countdown_style = '';
			$countdown_style .= 'display:flex;';
			$countdown_style .= 'align-items:center;';
			$countdown_style .= 'justify-content:center;';
			$countdown_style .= 'gap:15px;';
			$countdown_style .= 'flex-wrap:wrap;';

			if ( 'left' === $zepblocks_card_alignment ) {
				$countdown_style .= 'justify-content:flex-start;';
			} elseif ( 'right' === $zepblocks_card_alignment ) {
				$countdown_style .= 'justify-content:flex-end;';
			} else {
				$countdown_style .= 'justify-content:center;';
			}

			echo '<div class="cd-countdown" style="' . esc_attr( $countdown_style ) . '">';

			// Days
			echo self::render_time_box( 'days', $zepblocks_box_bg_color, $zepblocks_text_color, $zepblocks_label_color, __( 'Days', 'zepblocks' ) );

			// Separator
			echo '<div class="cd-separator" style="font-size:48px;font-weight:300;color:' . esc_attr( $zepblocks_text_color ) . ';line-height:1;margin:0 5px;">:</div>';

			// Hours
			echo self::render_time_box( 'hours', $zepblocks_box_bg_color, $zepblocks_text_color, $zepblocks_label_color, __( 'Hours', 'zepblocks' ) );

			// Separator
			echo '<div class="cd-separator" style="font-size:48px;font-weight:300;color:' . esc_attr( $zepblocks_text_color ) . ';line-height:1;margin:0 5px;">:</div>';

			// Minutes
			echo self::render_time_box( 'minutes', $zepblocks_box_bg_color, $zepblocks_text_color, $zepblocks_label_color, __( 'Minutes', 'zepblocks' ) );

			// Separator
			echo '<div class="cd-separator" style="font-size:48px;font-weight:300;color:' . esc_attr( $zepblocks_text_color ) . ';line-height:1;margin:0 5px;">:</div>';

			// Seconds
			echo self::render_time_box( 'seconds', $zepblocks_box_bg_color, $zepblocks_text_color, $zepblocks_label_color, __( 'Seconds', 'zepblocks' ) );

			echo '</div>'; // .cd-countdown
		}

		echo '</div>'; // .cd-card
		echo '</div>'; // .cd-wrap
		echo '</div>'; // .wp-block-zepblock-count-down

		// Enqueue JavaScript for countdown functionality
		wp_enqueue_script(
			'zepblocks-countdown-frontend',
			ZEPBLOCKS_URL . 'assets/build/count-down/view.js',
			array(),
			ZEPBLOCKS_VERSION,
			true
		);

		// Pass data to JavaScript
		$localized_data = array(
			'targetDate' => $zepblocks_target_date,
			'blockId' => $zepblocks_block_unique_id,
		);
		wp_add_inline_script( 'zepblocks-countdown-frontend', 'const zepblocksCountdownData = ' . wp_json_encode( $localized_data ) . ';', 'before' );

		return ob_get_clean();
	}

	/**
	 * Render time box for countdown
	 *
	 * @param string $type Time unit type.
	 * @param string $bg_color Background color.
	 * @param string $text_color Text color.
	 * @param string $label_color Label color.
	 * @param string $label Label text.
	 * @return string HTML output.
	 */
	private static function render_time_box( $type, $bg_color, $text_color, $label_color, $label ) {
		$box_style = '';
		$box_style .= 'display:flex;';
		$box_style .= 'flex-direction:column;';
		$box_style .= 'align-items:center;';
		$box_style .= 'justify-content:center;';
		$box_style .= 'min-width:90px;';
		$box_style .= 'padding:20px 15px;';
		$box_style .= 'border-radius:12px;';
		$box_style .= 'background:' . $bg_color . ';';
		$box_style .= 'box-shadow:0 4px 15px rgba(102,126,234,0.3);';

		$html = '<div class="cd-box" style="' . esc_attr( $box_style ) . '">';
		$html .= '<div class="cd-number" data-type="' . esc_attr( $type ) . '" style="font-size:42px;font-weight:700;line-height:1;margin-bottom:8px;color:' . esc_attr( $text_color ) . ';font-variant-numeric:tabular-nums;">00</div>';
		$html .= '<div class="cd-label" style="font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:1px;color:' . esc_attr( $label_color ) . ';text-align:center;">';
		$html .= esc_html( $label );
		$html .= '</div>';
		$html .= '</div>';

		return $html;
	}
}
