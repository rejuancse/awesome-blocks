<?php
/**
 * Server-side rendering for TBlock Hero Video Block
 *
 * @package ThemeBlocks
 */
defined( 'ABSPATH' ) || exit;

call_user_func(
	function ( $attributes ) {
		// Extract attributes with defaults
		$video_url              = $attributes['videoUrl'] ?? '';
		$poster_url             = $attributes['posterUrl'] ?? '';
		$title                  = $attributes['title'] ?? 'A Beachfront Luxury Vacation Rental Awaits';
		$description            = $attributes['description'] ?? 'Nestled along the resplendent beaches of Santa Teresa sits Casa Teresa and Casa Teresa Grande, both Costa Rica beachfront villas offering the ultimate luxury vacation rental experience.';
		$button_text            = $attributes['buttonText'] ?? 'Learn More';
		$button_url             = $attributes['buttonUrl'] ?? '#';
		$title_color            = $attributes['titleColor'] ?? '#ffffff';
		$title_font_size        = $attributes['titleFontSize'] ?? 48;
		$title_font_weight      = $attributes['titleFontWeight'] ?? '700';
		$title_font_family      = $attributes['titleFontFamily'] ?? '';
		$description_color      = $attributes['descriptionColor'] ?? '#ffffff';
		$description_font_size  = $attributes['descriptionFontSize'] ?? 18;
		$description_font_weight = $attributes['descriptionFontWeight'] ?? '400';
		$description_font_family = $attributes['descriptionFontFamily'] ?? '';
		$button_bg_color        = $attributes['buttonBgColor'] ?? '#ffffff';
		$button_text_color      = $attributes['buttonTextColor'] ?? '#333333';
		$button_hover_bg_color  = $attributes['buttonHoverBgColor'] ?? '#f0f0f0';
		$button_hover_text_color = $attributes['buttonHoverTextColor'] ?? '#333333';
		$button_font_size       = $attributes['buttonFontSize'] ?? 16;
		$button_font_weight     = $attributes['buttonFontWeight'] ?? '600';
		$button_font_family     = $attributes['buttonFontFamily'] ?? '';
		$overlay_color          = $attributes['overlayColor'] ?? '#000000';
		$overlay_opacity        = $attributes['overlayOpacity'] ?? 40;
		$video_height           = $attributes['videoHeight'] ?? 600;
		$content_align          = $attributes['contentAlign'] ?? 'center';
		$padding                = $attributes['padding'] ?? 80;
		$border_radius          = $attributes['borderRadius'] ?? 0;
		$muted                  = $attributes['muted'] ?? true;
		$autoplay               = $attributes['autoplay'] ?? true;
		$loop                   = $attributes['loop'] ?? true;

		// Convert overlay color and opacity to rgba
		$overlay_opacity_decimal = $overlay_opacity / 100;
		if ( strpos( $overlay_color, '#' ) === 0 ) {
			$hex = str_replace( '#', '', $overlay_color );
			$r   = hexdec( substr( $hex, 0, 2 ) );
			$g   = hexdec( substr( $hex, 2, 2 ) );
			$b   = hexdec( substr( $hex, 4, 2 ) );
			$overlay_color_rgba = "rgba({$r}, {$g}, {$b}, {$overlay_opacity_decimal})";
		} else {
			// If already rgb/rgba, replace opacity
			$overlay_color_rgba = preg_replace( '/[\d.]+\)$/', "{$overlay_opacity_decimal})", $overlay_color );
		}

		// Build inline styles
		$wrapper_style = '';
		if ( $border_radius > 0 ) {
			$wrapper_style = sprintf( 'border-radius: %dpx; overflow: hidden;', $border_radius );
		}

		$content_style = sprintf(
			'text-align: %s; padding: %dpx; min-height: %dpx;',
			esc_attr( $content_align ),
			intval( $padding ),
			intval( $video_height )
		);

		$title_style = sprintf(
			'color: %s; font-size: %dpx; font-weight: %s; font-family: %s; margin: 0 0 20px; line-height: 1.2;',
			esc_attr( $title_color ),
			intval( $title_font_size ),
			esc_attr( $title_font_weight ),
			$title_font_family ? esc_attr( $title_font_family ) : 'inherit'
		);

		$description_style = sprintf(
			'color: %s; font-size: %dpx; font-weight: %s; font-family: %s; margin: 0 0 30px; line-height: 1.6;',
			esc_attr( $description_color ),
			intval( $description_font_size ),
			esc_attr( $description_font_weight ),
			$description_font_family ? esc_attr( $description_font_family ) : 'inherit'
		);

		$button_style = sprintf(
			'background-color: %s; color: %s; font-size: %dpx; font-weight: %s; font-family: %s; display: inline-block; padding: 12px 30px; text-decoration: none; border-radius: 4px; transition: all 0.3s ease;',
			esc_attr( $button_bg_color ),
			esc_attr( $button_text_color ),
			intval( $button_font_size ),
			esc_attr( $button_font_weight ),
			$button_font_family ? esc_attr( $button_font_family ) : 'inherit'
		);

		// Generate unique ID for CSS variables
		$unique_id = 'theme-blocks-hero-' . uniqid();

		// Build CSS variables
		$css_vars = sprintf(
			'--theme-blocks-button-hover-bg-color: %s; --theme-blocks-button-hover-text-color: %s;',
			esc_attr( $button_hover_bg_color ),
			esc_attr( $button_hover_text_color )
		);
		?>

		<div class="villa-hero-video" style="<?php echo esc_attr( $wrapper_style ); ?>" data-id="<?php echo esc_attr( $unique_id ); ?>">
			<style>
				#<?php echo esc_attr( $unique_id ); ?> { <?php echo $css_vars; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- CSS vars are already escaped above. ?> }
			</style>

			<div class="hero-video">
				<?php if ( ! empty( $video_url ) ) : ?>
					<video class="video-bg"
						   <?php echo ! empty( $poster_url ) ? sprintf( 'poster="%s"', esc_url( $poster_url ) ) : ''; ?>
						   <?php echo $muted ? 'muted' : ''; ?>
						   <?php echo $autoplay ? 'autoplay' : ''; ?>
						   <?php echo $loop ? 'loop' : ''; ?>
						   playsinline>
						<source src="<?php echo esc_url( $video_url ); ?>" type="video/mp4">
					</video>
					<div class="video-overlay" style="background-color: <?php echo esc_attr( $overlay_color_rgba ); ?>;"></div>
				<?php endif; ?>
			</div>

			<div class="content-info" style="<?php echo esc_attr( $content_style ); ?>">
				<?php if ( ! empty( $title ) ) : ?>
					<h2 style="<?php echo esc_attr( $title_style ); ?>">
						<?php echo esc_html( $title ); ?>
					</h2>
				<?php endif; ?>

				<?php if ( ! empty( $description ) ) : ?>
					<p style="<?php echo esc_attr( $description_style ); ?>">
						<?php echo esc_html( $description ); ?>
					</p>
				<?php endif; ?>

				<?php if ( ! empty( $button_text ) ) : ?>
					<a href="<?php echo esc_url( $button_url ); ?>" class="hero-video-button" style="<?php echo esc_attr( $button_style ); ?>">
						<?php echo esc_html( $button_text ); ?>
					</a>
				<?php endif; ?>
			</div>
		</div>

		<?php
	},
	isset( $attributes ) && is_array( $attributes ) ? $attributes : array()
);
